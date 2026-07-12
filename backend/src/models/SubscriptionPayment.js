import mongoose from "mongoose";

const subscriptionPaymentSchema =
  new mongoose.Schema(
    {
      subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        required: true,
      },

      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true,
      },

      processedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      publication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publication",
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      paymentType: {
        type: String,
        enum: [
          "New Subscription",
          "Renewal",
        ],
        required: true,
      },

      paymentMethod: {
        type: String,
        enum: [
          "Cash",
          "UPI",
        ],
        default: "Cash",
      },

      // UPI Transaction ID
      transactionId: {
        type: String,
        default: null,
      },


      paymentStatus: {
        type: String,
        enum: [
          "Pending",
          "Paid",
          "Failed",
        ],
        default: "Paid",
      },
    },
    {
      timestamps: true,
    }
  );

const SubscriptionPayment = mongoose.model(
  "SubscriptionPayment",
  subscriptionPaymentSchema
);

export default SubscriptionPayment;