import express from "express";

import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  cancelSubscription,
  renewSubscription,
  getMemberSubscriptions,
} from "../controllers/subscriptionController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.get(
  "/",
  protect,
  getAllSubscriptions
);

router.get(
  "/:id",
  protect,
  getSubscriptionById
);

router.get(
  "/member/:memberId",
  protect,
  getMemberSubscriptions
);

router.post(
  "/",
  protect,
  createSubscription
);

router.put(
  "/:id",
  protect,
  updateSubscription
);

router.put(
  "/:id/cancel",
  protect,
  cancelSubscription
);

router.post(
  "/:id/renew",
  protect,
  renewSubscription
);

export default router;