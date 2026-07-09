import Counter from "../models/Counter.js";
import BookSale from "../models/BookSale.js";

export const generateInvoiceNumber = async () => {

  let counter = await Counter.findById("invoice");

  if (!counter) {

    const lastSale = await BookSale.findOne()
      .sort({ createdAt: -1 });

    let lastNumber = 0;

    if (lastSale) {
      lastNumber = parseInt(
        lastSale.invoiceNo.replace("INV", "")
      );
    }

    counter = await Counter.create({
      _id: "invoice",
      sequenceValue: lastNumber,
    });
  }

  counter.sequenceValue++;

  await counter.save();

  return (
    "INV" +
    String(counter.sequenceValue).padStart(6, "0")
  );
};