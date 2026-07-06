import express from "express";

import {
  createPublication,
  getAllPublications,
  getPublicationById,
  updatePublication,
  deletePublication,
} from "../controllers/publicationController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllPublications);

router.get("/:id", getPublicationById);

router.post(
  "/",
  protect,
  authorize("admin"),
  createPublication
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updatePublication
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deletePublication
);

export default router;