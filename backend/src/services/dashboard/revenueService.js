import BookSale from "../../models/BookSale.js";

export async function getRevenueStats() {

    const revenueResult =
        await BookSale.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalAmount"
                    }
                }
            }
        ]);

    const totalRevenue =
        revenueResult.length
            ? revenueResult[0].totalRevenue
            : 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRevenue =
        await BookSale.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: today
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$totalAmount"
                    }
                }
            }
        ]);

    const todaysSales =
        todayRevenue.length
            ? todayRevenue[0].total
            : 0;

    const firstDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );

    const monthlyRevenueData =
        await BookSale.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: firstDay
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$totalAmount"
                    }
                }
            }
        ]);

    const monthlyRevenue =
        monthlyRevenueData.length
            ? monthlyRevenueData[0].total
            : 0;

    return {

        sales: {

            totalRevenue,

            todaysSales,

            monthlyRevenue

        }

    };

}