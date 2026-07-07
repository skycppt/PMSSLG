import express from "express";

import protect
from "../middleware/authMiddleware.js";

import authorize
from "../middleware/roleMiddleware.js";

import {
    getDashboard,
}
from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
    "/",
    protect,
    authorize("admin", "staff"),
    getDashboard
);

export default router;
