import express from "express";

import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBookStockHistory,
} from "../controllers/bookController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();
router.get("/", getAllBooks);

router.get(
  "/:id/history",
  protect,
  authorize("admin", "staff"),
  getBookStockHistory
);

router.get("/:id", getBookById);

router.post(
  "/",
  protect,
  authorize("admin"),
  createBook
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateBook
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteBook
);

export default router;