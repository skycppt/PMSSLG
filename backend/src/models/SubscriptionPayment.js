import mongoose from "mongoose";

const subscriptionPaymentSchema =
  new mongoose.Schema(
    {
      subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        required: true,
      },

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
          "Card",
          "Bank Transfer",
        ],
        default: "Cash",
      },
    },
    {
      timestamps: true,
    }
  );

const SubscriptionPayment =
  mongoose.model(
    "SubscriptionPayment",
    subscriptionPaymentSchema
  );

export default SubscriptionPayment;