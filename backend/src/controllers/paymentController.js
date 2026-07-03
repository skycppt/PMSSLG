import SubscriptionPayment
from "../models/SubscriptionPayment.js";

export const getMyPayments =
  async (req, res) => {
    try {

      const payments =
        await SubscriptionPayment.find({
          user:
            req.user._id,
        })
        .populate(
          "publication",
          "name"
        )
        .sort({
          createdAt: -1,
        });

      res.status(200).json(
        payments
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };