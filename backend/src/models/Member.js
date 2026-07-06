import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {

    memberId: {
      type: String,
      unique: true,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Active",
        "Inactive",
      ],
      default: "Active",
    },

    
    joinedDate: {
      type: Date,
      default: Date.now,
    },
  },
    {
      timestamps: true,
    },
    
);

const Member =
  mongoose.model(
    "Member",
    memberSchema
  );

export default Member;