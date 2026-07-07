import asyncHandler from "express-async-handler";


import { getDashboardSummary }
from "../services/dashboardService.js";

export const getDashboard = asyncHandler(
    async (req, res) => {

        const summary =
            await getDashboardSummary();

        res.status(200).json({

            success: true,

            message:
                "Dashboard fetched successfully",

            data: summary,

        });

    }
);