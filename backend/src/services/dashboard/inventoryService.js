import Book from "../../models/book.js";

export async function getInventoryStats() {

    const lowStockBooks =
        await Book.countDocuments({
            stockQuantity: {
                $lt: 10
            }
        });

    const lowStockList =
        await Book.find({
            stockQuantity: {
                $lt: 10
            }
        })
            .select("title stockQuantity")
            .sort({
                stockQuantity: 1
            });

    return {

        books: {

            lowStockBooks,

            lowStockList

        }

    };

}