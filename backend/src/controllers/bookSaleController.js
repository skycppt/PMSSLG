import BookSale from "../models/BookSale.js";
import BookSaleItem from "../models/BookSaleItem.js";
import Book from "../models/book.js";
import Member from "../models/Member.js";
import StockHistory from "../models/StockHistory.js";


// ======================================
// CREATE BOOK SALE
// ======================================

export const createBookSale = async (req, res) => {

  try {

    const {
      memberId,
      books,
      paymentMethod,
      paymentStatus,
      discount,
      remarks,
    } = req.body;

    // -----------------------------
    // Validate Member
    // -----------------------------

    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    // -----------------------------
    // Generate Invoice Number
    // -----------------------------

    const lastSale =
      await BookSale.findOne().sort({
        createdAt: -1,
      });

    let invoiceNo = "INV000001";

    if (lastSale) {

      const lastNumber = parseInt(
        lastSale.invoiceNo.replace("INV", "")
      );

      invoiceNo =
        "INV" +
        String(lastNumber + 1).padStart(6, "0");

    }

    // -----------------------------
    // Calculate Total
    // -----------------------------

    let totalAmount = 0;

    for (const item of books) {

      const book =
        await Book.findById(item.bookId);

      if (!book) {
        return res.status(404).json({
          message: `Book not found`,
        });
      }

      if (
        book.stockQuantity < item.quantity
      ) {
        return res.status(400).json({
          message: `${book.title} is out of stock`,
        });
      }

      totalAmount +=
        book.sellingPrice *
        item.quantity;

    }

    totalAmount =
      totalAmount - (discount || 0);

    // -----------------------------
    // Create Sale
    // -----------------------------

    const sale =
      await BookSale.create({

        invoiceNo,

        member: memberId,

        totalAmount,

        paymentMethod,

        paymentStatus,

        discount,

        remarks,

        soldBy: req.user._id,

      });

    // -----------------------------
    // Save Sale Items
    // -----------------------------

    for (const item of books) {

      const book =
        await Book.findById(item.bookId);

      await BookSaleItem.create({

        sale: sale._id,

        book: book._id,

        quantity: item.quantity,

        sellingPrice:
          book.sellingPrice,

        total:
          book.sellingPrice *
          item.quantity,

      });

      // -------------------------
      // Reduce Stock
      // -------------------------

      const oldStock =
        book.stockQuantity;

      book.stockQuantity -=
        item.quantity;

      book.lowStockAlert =
        book.stockQuantity < 10;

      await book.save();

      // -------------------------
      // Stock History
      // -------------------------

      await StockHistory.create({

        book: book._id,

        changeType: "SALE",

        quantity: -item.quantity,

        oldStock,

        newStock:
          book.stockQuantity,

        updatedBy: req.user._id,

      });

    }

    res.status(201).json({

      message:
        "Sale completed successfully",

      sale,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


export const getAllBookSales = async (req, res) => {

  try {

    const sales = await BookSale.find()

      .populate(
        "member",
        "memberId fullName phone"
      )

      .populate(
        "soldBy",
        "fullName"
      )

      .sort({
        createdAt: -1,
      });

    res.status(200).json(sales);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

export const getBookSaleById = async (req, res) => {

  try {

    const sale = await BookSale.findById(req.params.id)

      .populate(
        "member",
        "memberId fullName phone email address"
      )

      .populate(
        "soldBy",
        "fullName"
      );

    if (!sale) {

      return res.status(404).json({
        message: "Sale not found",
      });

    }

    const items =
      await BookSaleItem.find({

        sale: sale._id,

      })

      .populate(
        "book",
        "title author"
      );

    res.status(200).json({

      sale,

      items,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


export const cancelBookSale = async (req, res) => {

  try {

    const sale =
      await BookSale.findById(
        req.params.id
      );

    if (!sale) {

      return res.status(404).json({
        message: "Sale not found",
      });

    }

    sale.paymentStatus =
      "Cancelled";

    await sale.save();

    res.status(200).json({

      message:
        "Sale cancelled successfully",

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};