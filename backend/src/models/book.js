import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    isbn: {
      type: String,
      required: true,
      unique: true,
    },

    author: {
      type: String,
      required: true,
    },

    publisher: {
      type: String,
      required: true,
    },

    publicationDate: {
      type: Date,
    },

    genre: [
      {
        type: String,
      },
    ],

    synopsis: {
      type: String,
    },

    authorBio: {
      type: String,
    },

    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },

    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    coverImageUrl: {
      type: String,
    },

    lowStockAlert: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;