import express from "express";

import {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  searchMembers,
} from "../controllers/memberController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

// Search
router.get(
  "/search",
  protect,
  searchMembers
);

// Get all members
router.get(
  "/",
  protect,
  getAllMembers
);

// Get member by ID
router.get(
  "/:id",
  protect,
  getMemberById
);

// Create member
router.post(
  "/",
  protect,
  authorize("admin", "staff"),
  createMember
);

// Update member
router.put(
  "/:id",
  protect,
  authorize("admin", "staff"),
  updateMember
);

// Delete member
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteMember
);

export default router;