import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
  tier:{
    type: String,
    enum:["Bronze","Silver","Gold"],
    default: "Bronze",
  },

  duration: {
    type: String,
    enum: ["6 Months", "1 Year", "3 Year"],
    default: "6 Months",
  },

  discountPercentage: {
    type: Number,
    default: 5,
  },

  startDate:{
    type: Date,
  },

  endDate:{
    type: Date,
  },

  isActive: {
    type: Boolean,
    default: false,
  },
});


const userSchema = new mongoose.Schema(
  {
    fullName:{
      type: String,
      required: true,
      trim: true,
    },
    email:{
      type:String,
      required: true,
      unique: true,
      lowercase:true,
    },

    password:{
      type:String,
      required: true,
      minlength:6,
    },

    phone:{
      type:String,
    },

    role:{
      type:String,
      enum:["admin","staff","member"],
      default:"member",
    },
    membership: membershipSchema,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;