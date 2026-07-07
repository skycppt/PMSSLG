

import { getOverviewCards } from "./dashboard/overviewService.js";
import { getRevenueStats } from "./dashboard/revenueService.js";
import { getInventoryStats } from "./dashboard/inventoryService.js";
import { getRecentSales } from "./dashboard/recentSalesService.js";
import { getBestSellingBooks } from "./dashboard/analyticsService.js";
import { getExpiringSubscriptions } from "./dashboard/expiringSubscriptionService.js";

export async function getDashboardSummary() {

    const overview =
        await getOverviewCards();

    const revenue =
        await getRevenueStats();

    const inventory =
        await getInventoryStats();

    const recentSales =
        await getRecentSales();

    const bestSellingBooks =
        await getBestSellingBooks();

    const expiringSubscriptions =
        await getExpiringSubscriptions();

    return {

        books: {

            ...overview.books,

            ...inventory.books

        },

        publications:
            overview.publications,

        subscriptions:
            overview.subscriptions,

        sales: {

            ...revenue.sales,

            ...recentSales.sales

        },

        analytics: {

            bestSellingBooks

        },

        expiringSubscriptions

    };

}