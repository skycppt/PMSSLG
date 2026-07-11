import express from "express";


import {
  createSubscription,
  getAllSubscriptions,
  updateSubscription,
  cancelSubscription,
  renewSubscription,
  getMemberSubscriptions,
  getSubscriptionDetails,
  deliverMagazine,
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
  getSubscriptionDetails
);

router.put(
  "/:id/deliver",
  protect,
  deliverMagazine
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


// router.get(
//     "/:id",
//     protect,
//     authorize("admin", "staff"),
//     getSubscriptionDetails
// );

// router.put(
//     "/:id/deliver",
//     protect,
//     authorize("admin", "staff"),
//     deliverMagazine
// );