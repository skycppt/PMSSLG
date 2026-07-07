import BookSale from "../../models/BookSale.js";

export async function getSalesReport(filters) {

    const query = {};

    // ===========================
    // Date Filter
    // ===========================

    if (filters.from || filters.to) {

        query.saleDate = {};

        if (filters.from) {

            query.saleDate.$gte =
                new Date(filters.from);

        }

        if (filters.to) {

            const endDate =
                new Date(filters.to);

            endDate.setHours(
                23,
                59,
                59,
                999
            );

            query.saleDate.$lte =
                endDate;

        }

    }

    // ===========================
    // Payment Method
    // ===========================

    if (
        filters.paymentMethod &&
        filters.paymentMethod !== "All"
    ) {

        query.paymentMethod =
            filters.paymentMethod;

    }

    // ===========================
    // Payment Status
    // ===========================

    if (
        filters.paymentStatus &&
        filters.paymentStatus !== "All"
    ) {

        query.paymentStatus =
            filters.paymentStatus;

    }

    const sales =
        await BookSale.find(query)

            .populate(
                "member",
                "memberId fullName"
            )

            .populate(
                "soldBy",
                "fullName"
            )

            .sort({
                saleDate: -1
            });

    const totalSales =
        sales.reduce(

            (sum, sale) =>
                sum + sale.totalAmount,

            0

        );

    return {

        sales,

        totalSales,

        totalRecords:
            sales.length,

    };

}