import express from "express";

import {
    getMyPayments,
    createOrder,
} from "../controllers/paymentController.js";


import protect from "../middleware/authMiddleware.js";

const router = express.Router();



router.get(
  "/my-payments",
  protect,
  getMyPayments
);

router.post(
    "/create-order",
    protect,
    createOrder
);


export default router;