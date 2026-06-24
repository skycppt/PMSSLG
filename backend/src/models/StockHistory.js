import mongoose from "mongoose";

const stockHistorySchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    changeType: {
      type: String,
      enum: [
        "RESTOCK",
        "SALE",
        "DAMAGE",
        "MANUAL_UPDATE",
      ],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    oldStock: {
      type: Number,
      required: true,
    },

    newStock: {
      type: Number,
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const StockHistory = mongoose.model(
  "StockHistory",
  stockHistorySchema
);

export default StockHistory;