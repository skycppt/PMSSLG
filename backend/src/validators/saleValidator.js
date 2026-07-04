import Joi from "joi";

export const saleSchema = Joi.object({

    customer: Joi.string()
        .allow(null, ""),

    paymentMethod: Joi.string()
        .valid("Cash", "UPI", "Card")
        .required(),

    items: Joi.array()
        .items(

            Joi.object({

                book: Joi.string()
                    .required(),

                quantity: Joi.number()
                    .integer()
                    .min(1)
                    .required(),

            })

        )
        .min(1)
        .required(),

});