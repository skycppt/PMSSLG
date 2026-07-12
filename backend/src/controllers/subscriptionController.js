import Subscription from "../models/Subscription.js";
import Publication from "../models/Publication.js";
import SubscriptionPayment
from "../models/SubscriptionPayment.js";


const calculateEndDate = (startDate, duration) => {
  const endDate = new Date(startDate);

  switch (duration) {
    case "3 Months":
      endDate.setMonth(endDate.getMonth() + 3);
      break;

    case "6 Months":
      endDate.setMonth(endDate.getMonth() + 6);
      break;

    case "1 Year":
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;

    default:
      throw new Error("Invalid subscription duration");
  }

  // End one day before the anniversary date
  endDate.setDate(endDate.getDate() - 1);

  return endDate;
};

export const createSubscription = async (req, res) => {
    try {

      const {
        memberId,
        publicationId,
        duration,
        paymentMethod,
        transactionId,
        cardReference,
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
        
        let amountPaid = 0;
      const endDate = calculateEndDate(
          startDate,
          duration
      );

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

            paymentMethod,

            transactionId:
              paymentMethod === "UPI"
                ? transactionId
                : null,

            paymentStatus: "Paid",
          });

      if (
          paymentMethod === "UPI" &&
          !transactionId
        ) {
          return res.status(400).json({
            message: "UPI Transaction ID is required",
          });
        }


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
        "name language frequency price6Months price1Year"
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

  export const renewSubscription = async (req, res) => {
  try {

    const {
  duration,
  paymentMethod,
  transactionId,
  cardReference,
} = req.body;

    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    const publication = await Publication.findById(
      subscription.publication
    );

    if (!publication) {
      return res.status(404).json({
        message: "Publication not found",
      });
    }

    if (
      paymentMethod === "UPI" &&
      !transactionId
    ) {
      return res.status(400).json({
        message: "UPI Transaction ID is required",
      });
    }

    let amountPaid = 0;

    switch (duration) {

      case "3 Months":
        amountPaid = publication.price3Months;
        break;

      case "6 Months":
        amountPaid = publication.price6Months;
        break;

      case "1 Year":
        amountPaid = publication.price1Year;
        break;

      default:
        return res.status(400).json({
          message: "Invalid subscription duration",
        });
    }

    const oldEndDate = new Date(subscription.endDate);
    const newEndDate = calculateEndDate(
      subscription.endDate,
      duration
    );



    subscription.endDate = newEndDate;

    subscription.amountPaid += amountPaid;

    subscription.status = "Active";

    subscription.cancelledAt = null;

    subscription.renewalHistory.push({
    duration,

    renewedOn: new Date(),

    oldEndDate,

    newEndDate,

    amountPaid,

    paymentMethod,
    transactionId: paymentMethod === "UPI" ? transactionId : null,


    processedBy: req.user._id,
});

    await subscription.save();

    await SubscriptionPayment.create({
        subscription: subscription._id,
        member: subscription.member,
        processedBy: req.user._id,
        publication: publication._id,
        amount: amountPaid,
        paymentType: "Renewal",

        paymentMethod,

        transactionId: paymentMethod === "UPI" ? transactionId : null,
        paymentStatus: "Paid",
            });


    res.status(200).json({
      message: "Subscription renewed successfully",
      subscription,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
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
      )

      .populate(
      "renewalHistory.processedBy",
      "fullName"
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
    subscription.cancelledAt = new Date();

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



  export const getSubscriptionDetails = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate(
        "member",
        "memberId fullName phone email address"
      )
      .populate(
        "publication",
        "name language frequency price6Months price1Year"
      )
      .populate(
        "deliveryHistory.deliveredBy",
        "fullName"
      )

      .populate(
          "renewalHistory.processedBy",
          "fullName"
      );

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }


    
    const payments = await SubscriptionPayment.find({
      subscription: subscription._id,
    })
    .populate("processedBy", "fullName")
    .sort({ createdAt: -1 });
    
    res.status(200).json({
  ...subscription.toObject(),
  payments,
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};


export const deliverMagazine = async (req, res) => {
  try {

    const { month } = req.body;

    if (!month) {
      return res.status(400).json({
        message: "Month is required",
      });
    }

    const subscription =
      await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    if (subscription.status === "Cancelled") {
      return res.status(400).json({
        message:
          "This subscription has been cancelled. Magazine delivery is not allowed.",
      });
    }

    
    const alreadyDelivered =
      subscription.deliveryHistory.find(
        (item) => item.month === month
      );

    if (alreadyDelivered) {
      return res.status(400).json({
        message:
          "Magazine already delivered for this month",
      });
    }

    subscription.deliveryHistory.push({
      month,
      delivered: true,
      deliveredAt: new Date(),
      deliveredBy: req.user._id,
    });

    await subscription.save();

    res.status(200).json({
      message:
        "Magazine marked as delivered successfully",
      subscription,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};