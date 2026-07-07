import Subscription from "../../models/Subscription.js";

export async function getExpiringSubscriptions() {

    const today = new Date();

    const next30Days = new Date();

    next30Days.setDate(
        next30Days.getDate() + 30
    );

    const subscriptions =
        await Subscription.find({

            status: "Active",

            endDate: {

                $gte: today,

                $lte: next30Days,

            },

        })

        .populate(
            "member",
            "memberId fullName"
        )

        .populate(
            "publication",
            "name"
        )

        .sort({
            endDate: 1,
        })

        .limit(5);

    return subscriptions;

}