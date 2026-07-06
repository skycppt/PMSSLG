import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
    },

    publisher: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
    },
    
    genre: {
        type: String,
        required: true,
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