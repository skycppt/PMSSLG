import express from "express";

import {
  createBook,
  getAllBooks,
} from "../controllers/bookController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllBooks);

router.post(
  "/",
  protect,
  authorize("admin"),
  createBook
);

export default router;