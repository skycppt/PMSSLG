import mongoose from "mongoose";

const subscriptionSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      publication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publication",
        required: true,
      },

      duration: {
        type: String,
        enum: [
          "6 Months",
          "1 Year",
        ],
        required: true,
      },

      startDate: {
        type: Date,
        required: true,
      },

      endDate: {
        type: Date,
        required: true,
      },

      amountPaid: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "Active",
          "Expired",
          "Cancelled",
        ],
        default: "Active",
      },
    },
    {
      timestamps: true,
    }
  );

const Subscription =
  mongoose.model(
    "Subscription",
    subscriptionSchema
  );

export default Subscription;