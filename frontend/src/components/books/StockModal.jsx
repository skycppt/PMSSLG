import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { getAllBooks } from "../../services/bookService";

function StockModal({ onClose, onStockAdded }) {

  const {
    register,
    handleSubmit,
    watch,
  } = useForm();

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectedBookId = watch("bookId");
  const quantity = watch("quantity");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
  try {
    setLoading(true);

    const books = await getAllBooks();

    console.log("Fetched Books:", books);

    setBooks(books);

  } catch (error) {
    console.log(error);
    toast.error("Failed to load books");
  } finally {
    setLoading(false);
  }
};

   const onSubmit = async (data) => {
    console.log(data);
  };

  useEffect(() => {

    if (!selectedBookId) {
      setSelectedBook(null);
      return;
    }

    const book = books.find(
      (book) => book._id === selectedBookId
    );

    setSelectedBook(book);

  }, [selectedBookId, books]);

  const newStock = selectedBook
    ? selectedBook.stockQuantity + Number(quantity || 0)
    : 0;


    return (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Add Stock
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >

        <select
          {...register("bookId", { required: true })}
          className="w-full border rounded-lg p-3 bg-white"
        >
          <option value="">Select Book</option>

          {books.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))}
        </select>

        <div className="border rounded-lg p-3 bg-gray-50">
          <p className="text-sm text-gray-500">Current Stock</p>

          <p className="text-lg font-semibold">
            {selectedBook
              ? `${selectedBook.stockQuantity} Copies`
              : "--"}
          </p>
        </div>

        <input
          type="number"
          min="1"
          placeholder="Quantity to Add"
          className="w-full border rounded-lg p-3"
          {...register("quantity", {
            required: true,
            min: 1,
            valueAsNumber: true,
          })}
        />

        <div className="border rounded-lg p-3 bg-green-50">
          <p className="text-sm text-gray-500">New Stock</p>

          <p className="text-lg font-semibold text-green-600">
            {selectedBook
              ? `${newStock} Copies`
              : "--"}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4">

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Stock
          </button>

        </div>

      </form>

    </div>
  </div>
);
}
export default StockModal;