import User from "../models/user.js";
import bcrypt from "bcryptjs"; // for password encription
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {

    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,        
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
        message: "Server Error",
        error: error.message,
    });
}
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};


export const adminOnly = async (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
};