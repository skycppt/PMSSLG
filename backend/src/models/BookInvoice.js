import mongoose from "mongoose";

const bookInvoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    sale: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookSale",
      required: true,
      unique: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Paid", "Cancelled"],
      default: "Paid",
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookInvoice = mongoose.model(
  "BookInvoice",
  bookInvoiceSchema
);

export default BookInvoice;