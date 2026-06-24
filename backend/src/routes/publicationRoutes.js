import express from "express";

import {
  createPublication,
} from "../controllers/publicationController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("admin"),
  createPublication
);

export default router;