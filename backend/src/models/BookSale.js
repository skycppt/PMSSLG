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
        "Paid",
        "Pending",
        "Cancelled",
      ],
      default: "Paid",
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