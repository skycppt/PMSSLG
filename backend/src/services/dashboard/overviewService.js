import Book from "../../models/book.js";
import Publication from "../../models/Publication.js";
import Subscription from "../../models/Subscription.js";
import Member from "../../models/Member.js";

export async function getOverviewCards() {

    const totalBooks = await Book.countDocuments();

    const totalMembers =
        await Member.countDocuments({
            status: "Active",
        });

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

        members: {
            totalMembers,
        },

        publications: {
            totalPublications
        },

        subscriptions: {
            activeSubscriptions
        }

    };

}