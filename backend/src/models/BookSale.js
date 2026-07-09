import mongoose from "mongoose";

const bookSaleSchema = new mongoose.Schema(
  {
    invoiceNo: {
      type: String,
      required: true,
      unique: true,
    },

    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: [
        "Cash",
        "UPI",
        "Card",
        "Bank Transfer",
      ],
      default: "Cash",
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed",
        "Cancelled",
      ],
      default: "Pending",
    },

    // ==========================
    // UPI Details
    // ==========================

    upiTransactionId: {
      type: String,
      default: "",
      trim: true,
      unique: true,
      sparse: true,
    },

    upiPaymentDate: {
      type: Date,
      default: null,
    },

    soldBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    saleDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const BookSale = mongoose.model(
  "BookSale",
  bookSaleSchema
);

export default BookSale;