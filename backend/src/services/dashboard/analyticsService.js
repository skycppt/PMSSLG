import BookSale from "../../models/BookSale.js";

export async function getBestSellingBooks() {

    return await BookSale.aggregate([

        {
            $unwind: "$items"
        },

        {
            $group: {

                _id: "$items.book",

                totalSold: {

                    $sum: "$items.quantity"

                }

            }

        },

        {
            $sort: {

                totalSold: -1

            }

        },

        {
            $limit: 5
        },

        {
            $lookup: {

                from: "books",

                localField: "_id",

                foreignField: "_id",

                as: "bookDetails"

            }

        },

        {
            $unwind: "$bookDetails"
        },

        {
            $project: {

                _id: 0,

                title: "$bookDetails.title",

                sellingPrice: "$bookDetails.sellingPrice",

                stockQuantity: "$bookDetails.stockQuantity",

                totalSold: 1

            }

        }

    ]);

}