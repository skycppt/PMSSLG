import mongoose from "mongoose";

const subscriptionSchema =
  new mongoose.Schema(
    {
      member: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Member",
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
          "3 Months",
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

      deliveryHistory: [
        {
          month: {
            type: String,
            required: true,
          },

          delivered: {
            type: Boolean,
            default: false,
          },

          deliveredAt: {
            type: Date,
          },

          deliveredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        },
      ],

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