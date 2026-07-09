import SubscriptionPayment
from "../models/SubscriptionPayment.js";

// import razorpay from "../config/razorpay.js";
import BookSale from "../models/BookSale.js";

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
export const createOrder = async (req, res) => {
  try {
    const { saleId } = req.body;

    const sale = await BookSale.findById(saleId);

    if (!sale) {
      return res.status(404).json({
        message: "Sale not found",
      });
    }

    const order = await razorpay.orders.create({
      amount: sale.totalAmount * 100,
      currency: "INR",
      receipt: sale.invoiceNo,
    });

    sale.paymentMethod = "UPI";
    sale.paymentStatus = "Pending";
    sale.razorpayOrderId = order.id;

    await sale.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};