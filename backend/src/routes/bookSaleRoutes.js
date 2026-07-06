import express from "express";

import {
  createBookSale,
  getAllBookSales,
  getBookSaleById,
  cancelBookSale,
} from "../controllers/bookSaleController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getAllBookSales
);

router.get(
  "/:id",
  protect,
  getBookSaleById
);

router.post(
  "/",
  protect,
  authorize("admin", "staff"),
  createBookSale
);

router.put(
  "/:id/cancel",
  protect,
  authorize("admin"),
  cancelBookSale
);

export default router;