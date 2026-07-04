import Book from "../../models/book.js";
import Publication from "../../models/Publication.js";
import Subscription from "../../models/Subscription.js";

export async function getOverviewCards() {

    const totalBooks = await Book.countDocuments();

    const totalPublications =
        await Publication.countDocuments();

    const activeSubscriptions =
        await Subscription.countDocuments({
            status: "Active"
        });

    return {

        books: {
            totalBooks
        },

        publications: {
            totalPublications
        },

        subscriptions: {
            activeSubscriptions
        }

    };

}