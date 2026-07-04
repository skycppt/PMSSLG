import BookSale from "../models/BookSale.js";
import Book from "../models/book.js";
import StockHistory from "../models/StockHistory.js";

export const createBookSale = async (req, res) => {
  try {

    const { customer, items, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Please add at least one book.",
      });
    }

    const saleItems = [];

    let totalAmount = 0;

    for (const item of items) {

      const book = await Book.findById(item.book);

      if (!book) {
        return res.status(404).json({
          message: "Book not found",
        });
      }

      if (book.stockQuantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${book.title}`,
        });
      }

      const subtotal = book.sellingPrice * item.quantity;

      totalAmount += subtotal;
              // Save old stock before updating
        const oldStock = book.stockQuantity;

        // Reduce stock
        book.stockQuantity -= item.quantity;

        // Save updated book
        await book.save();

        // Create stock history
        await StockHistory.create({
            book: book._id,
            changeType: "SALE",
            quantity: item.quantity,
            oldStock,
            newStock: book.stockQuantity,
            updatedBy: req.user._id,
        });

        // Prepare sale item
        saleItems.push({
            book: book._id,
            quantity: item.quantity,
            unitPrice: book.sellingPrice,
            subtotal,
        });
    }

    const sale = await BookSale.create({
        customer,
        soldBy: req.user._id,
        items: saleItems.map(item => ({
          book: item.book,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.subtotal,
        })),
        totalAmount,
        paymentMethod,
      });

      return res.status(201).json({
        message: "Book Sale Created Successfully",
        sale,
      });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};