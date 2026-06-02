import express from "express";
import authorize from "../middleware/roleMiddleware.js";

import {
  registerUser,
  loginUser,
  getProfile,
  adminOnly,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

router.get(
  "/admin",
  protect,
  authorize("admin"),
  adminOnly
);

export default router;