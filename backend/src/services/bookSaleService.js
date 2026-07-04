import BookSale from "../models/BookSale.js";
import Book from "../models/book.js";
import StockHistory from "../models/StockHistory.js";
import { createInvoice } from "./invoiceService.js";

export const createSaleService = async (
  customer,
  items,
  paymentMethod,
  soldBy
) => {

  if (!items || items.length === 0) {
    throw new Error("Please add at least one book.");
  }

  const saleItems = [];

  let totalAmount = 0;

  for (const item of items) {

    const book = await Book.findById(item.book);

    if (!book) {
      throw new Error("Book not found");
    }

    if (book.stockQuantity < item.quantity) {
      throw new Error(
        `Insufficient stock for ${book.title}`
      );
    }

    const subtotal =
      book.sellingPrice * item.quantity;

    totalAmount += subtotal;

    const oldStock = book.stockQuantity;

    book.stockQuantity -= item.quantity;

    await book.save();

    await StockHistory.create({
      book: book._id,
      changeType: "SALE",
      quantity: item.quantity,
      oldStock,
      newStock: book.stockQuantity,
      updatedBy: soldBy,
    });

    saleItems.push({
      book: book._id,
      quantity: item.quantity,
      unitPrice: book.sellingPrice,
      subtotal,
    });
  }

  const sale = await BookSale.create({
    customer,
    soldBy,
    items: saleItems,
    totalAmount,
    paymentMethod,
  });

  const invoice = await createInvoice(
    sale,
    soldBy
  );

  return {

    sale,

    invoice,

};
};