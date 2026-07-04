import { createSaleService } from "../services/bookSaleService.js";

export const createBookSale = async (req, res) => {

  try {

    const { customer, items, paymentMethod } =
      req.body;

    const sale = await createSaleService(
      customer,
      items,
      paymentMethod,
      req.user._id
    );

    return res.status(201).json({
      message: "Book Sale Created Successfully",
      sale,
    });

  } catch (error) {

    return res.status(400).json({
      message: error.message,
    });

  }

};