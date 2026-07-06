import Subscription from "../models/Subscription.js";
import Publication from "../models/Publication.js";
import SubscriptionPayment
from "../models/SubscriptionPayment.js";

export const createSubscription =
  async (req, res) => {
    try {

      const {
          memberId,
          publicationId,
          duration,
      } = req.body;

      const existingSubscription =
        await Subscription.findOne({
          member: memberId,
          publication: publicationId,
          status: "Active",
        });

      if (existingSubscription) {
        return res.status(400).json({
          message:
            "You already have an active subscription for this publication",
        });
      }

      const publication =
        await Publication.findById(
          publicationId
        );

      if (!publication) {
        return res.status(404).json({
          message:
            "Publication not found",
        });
      }

      const startDate =
        new Date();

      const endDate =
        new Date(startDate);

      let amountPaid = 0;

      if (
        duration === "6 Months"
      ) {
        amountPaid =
          publication.price6Months;

        endDate.setMonth(
          endDate.getMonth() + 6
        );
      }

      if (
        duration === "1 Year"
      ) {
        amountPaid =
          publication.price1Year;

        endDate.setFullYear(
          endDate.getFullYear() + 1
        );
      }

      const subscription =
        await Subscription.create({
          member: memberId,

          publication:
            publication._id,

          duration,

          startDate,

          endDate,

          amountPaid,

          status: "Active",
        });

      

        await SubscriptionPayment.create({
          subscription: subscription._id,
          member: memberId,
          processedBy: req.user._id,
          publication: publication._id,
          amount: amountPaid,
          paymentType: "New Subscription",
          paymentMethod: "Cash",
        });

      res.status(201).json({
        message:
          "Subscription created successfully",

        subscription,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

  export const getAllSubscriptions = async (req, res) => {
  try {

    const subscriptions = await Subscription.find()

      .populate(
        "member",
        "memberId fullName phone"
      )

      .populate(
        "publication",
        "name language frequency"
      )

      .sort({
        createdAt: -1,
      });

    res.status(200).json(subscriptions);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

  export const renewSubscription =
  async (req, res) => {
    try {

      const { duration } = req.body;

      const subscription =
        await Subscription.findById(
          req.params.id
        );

      if (!subscription) {
        return res.status(404).json({
          message:
            "Subscription not found",
        });
      }

      let amountPaid = 0;

      const publication =
        await Publication.findById(
          subscription.publication
        );

      if (!publication) {
        return res.status(404).json({
          message:
            "Publication not found",
        });
      }

      const newEndDate =
        new Date(subscription.endDate);

      if (duration === "3 Months") {

          amountPaid = publication.price3Months;

          endDate.setMonth(
            endDate.getMonth() + 3
          );

        } else if (duration === "6 Months") {

          amountPaid = publication.price6Months;

          endDate.setMonth(
            endDate.getMonth() + 6
          );

        } else {

          amountPaid = publication.price1Year;

          endDate.setFullYear(
            endDate.getFullYear() + 1
          );

        }

      subscription.endDate =
        newEndDate;

      subscription.amountPaid +=
        amountPaid;

      await subscription.save();

      await SubscriptionPayment.create({
          subscription: subscription._id,
          member: memberId,
          processedBy: req.user._id,
          publication: publication._id,
          amount: amountPaid,
          paymentType: "New Subscription",
          paymentMethod: "Cash",
        });

      res.status(200).json({
        message:
          "Subscription renewed successfully",

        subscription,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

  export const getSubscriptionById = async (req, res) => {
  try {

    const subscription = await Subscription.findById(req.params.id)

      .populate(
        "member",
        "memberId fullName phone email"
      )

      .populate(
        "publication",
        "name language frequency"
      );

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    res.status(200).json(subscription);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const updateSubscription = async (req, res) => {
  try {

    const subscription = await Subscription.findById(
      req.params.id
    );

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    Object.assign(subscription, req.body);

    await subscription.save();

    res.status(200).json({
      message: "Subscription updated successfully",
      subscription,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


export const cancelSubscription = async (req, res) => {
  try {

    const subscription = await Subscription.findById(
      req.params.id
    );

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    subscription.status = "Cancelled";

    await subscription.save();

    res.status(200).json({
      message: "Subscription cancelled successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


export const getMemberSubscriptions =
  async (req, res) => {

    try {

      const subscriptions =
        await Subscription.find({

          member: req.params.memberId,

        })

        .populate(
          "publication",
          "name language frequency"
        )

        .sort({
          createdAt: -1,
        });

      res.status(200).json(
        subscriptions
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };