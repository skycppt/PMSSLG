import asyncHandler from "express-async-handler";
import { createSaleService } from "../services/bookSaleService.js";
import { saleSchema } from "../validators/saleValidator.js";

export const createBookSale = asyncHandler(async (req, res) => {

    const { error, value } = saleSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
});

    if (error) {
      throw new Error(error.details[0].message);
    }

    const { customer, items, paymentMethod } = req.body;

    const result = await createSaleService(
        customer,
        items,
        paymentMethod,
        req.user._id
    );

    res.status(201).json({
        success: true,
        message: "Sale completed successfully",
        data: result,
    });

});