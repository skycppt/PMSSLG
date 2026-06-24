import express from "express";

import {
  createSubscription,
  getMySubscriptions,
} from "../controllers/subscriptionController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/my-subscriptions",
  protect,
  getMySubscriptions
);

router.post(
  "/",
  protect,
  createSubscription
);

export default router;