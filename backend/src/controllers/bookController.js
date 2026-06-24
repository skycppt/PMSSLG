import Book from "../models/Book.js";

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