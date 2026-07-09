import Counter from "../models/Counter.js";

export const generateInvoiceNumber = async () => {

    console.log("generateInvoiceNumber called");

    const counter = await Counter.findByIdAndUpdate(
        "invoice",
        {
            $inc: {
                sequenceValue: 1,
            },
        },
        {
            new: true,
            upsert: true,
        }
    );

    console.log("Counter:", counter);

    return "INV" + String(counter.sequenceValue).padStart(6, "0");
};