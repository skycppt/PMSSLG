import BookInvoice from "../models/BookInvoice.js";
import generateInvoiceNumber from "../utils/generateInvoiceNumber.js";

export const createInvoice = async (
    sale,
    generatedBy
) => {

    const invoice = await BookInvoice.create({

        invoiceNumber:
            generateInvoiceNumber(),

        sale: sale._id,

        customer: sale.customer,

        amount: sale.totalAmount,

        paymentMethod:
            sale.paymentMethod,

        generatedBy,

    });

    return invoice;
};