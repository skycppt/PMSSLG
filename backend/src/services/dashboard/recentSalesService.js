import BookSale from "../../models/BookSale.js";

export async function getRecentSales() {

    const recentSales =
        await BookSale.find()
            .sort({
                createdAt: -1
            })
            .limit(5)
            .populate(
                "soldBy",
                "fullName"
            );

    return {

        sales: {

            recentSales

        }

    };

}