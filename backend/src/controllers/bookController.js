import Book from "../models/book.js";
import StockHistory from "../models/StockHistory.js";

export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {

    const books = await Book.find();

    res.status(200).json(books);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getBookById = async (req, res) => {
  try {

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const updateBook = async (req, res) => {
  try {

    const book = await Book.findById(
      req.params.id
    );

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const oldStock = book.stockQuantity;

    Object.assign(book, req.body);

    if (book.stockQuantity < 10) {
      book.lowStockAlert = true;
    } else {
      book.lowStockAlert = false;
    }

    await book.save();

    if (
      req.body.stockQuantity !== undefined &&
      req.body.stockQuantity !== oldStock
    ) {
      await StockHistory.create({
        book: book._id,
        changeType: "MANUAL_UPDATE",
        quantity:
          book.stockQuantity - oldStock,
        oldStock,
        newStock: book.stockQuantity,
        updatedBy: req.user._id,
      });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const deleteBook = async (req, res) => {
  try {

    const book = await Book.findByIdAndDelete(
      req.params.id
    );

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


export const getBookStockHistory =
  async (req, res) => {
    try {

      const history =
        await StockHistory.find({
          book: req.params.id,
        })
          .populate("updatedBy", "fullName")
          .sort({
            createdAt: -1,
          });

      res.status(200).json(history);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };