import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    language: {
      type: String,
      required: true,
      trim: true,
    },

    frequency: {
      type: String,
      enum: [
        "Monthly",
        "Weekly",
        "Quarterly",
        "Yearly",
      ],
      required: true,
    },

    price6Months: {
      type: Number,
      required: true,
      min: 0,
    },

    price1Year: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Publication = mongoose.model(
  "Publication",
  publicationSchema
);

export default Publication;