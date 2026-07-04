import express from "express";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";

import { createBookSale } from "../controllers/bookSaleController.js";

const router = express.Router();

import authorize from "../middleware/roleMiddleware.js";
/**
 * @swagger
 * /api/book-sales:
 *   post:
 *     summary: Complete a book sale
 *     tags:
 *       - Book Sales
 *     responses:
 *       201:
 *         description: Sale completed successfully
 */

router.post(
  "/",
  protect,
  authorize("admin", "staff"),
  createBookSale
);

export default router;