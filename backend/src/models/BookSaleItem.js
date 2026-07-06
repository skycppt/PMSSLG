import mongoose from "mongoose";

const bookSaleItemSchema =
  new mongoose.Schema(
    {
      sale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookSale",
        required: true,
      },

      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
        min: 1,
      },

      sellingPrice: {
        type: Number,
        required: true,
      },

      total: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const BookSaleItem =
  mongoose.model(
    "BookSaleItem",
    bookSaleItemSchema
  );

export default BookSaleItem;