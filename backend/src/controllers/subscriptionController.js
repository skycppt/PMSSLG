import Subscription from "../models/Subscription.js";
import Publication from "../models/Publication.js";

export const createSubscription =
  async (req, res) => {
    try {

      const {
        publicationId,
        duration,
      } = req.body;

      const existingSubscription =
        await Subscription.findOne({
          user: req.user._id,
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
          user: req.user._id,

          publication:
            publication._id,

          duration,

          startDate,

          endDate,

          amountPaid,

          status: "Active",
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


  export const getMySubscriptions =
  async (req, res) => {
    try {

      const subscriptions =
        await Subscription.find({
          user: req.user._id,
        })
        .populate(
          "publication",
          "name language frequency coverImage"
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