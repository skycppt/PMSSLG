import { useForm } from "react-hook-form";
import {createBook,updateBook,} from "../../services/bookService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function BookModal({onClose,onBookAdded,book,}){
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (book) {
    reset(book);
  }
}, [book, reset]);

  const onSubmit = async (data) => {

      try {

        setLoading(true);

        if (book) {

          await updateBook(book._id, data);

          toast.success("Book updated successfully");

        } else {

          await createBook(data);

          toast.success("Book added successfully");

        }

        await onBookAdded();

        onClose();

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data?.message || "Operation Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    // <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3 sm:p-4">

      {/* <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-8"> */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8">

        {/* <h2 className="text-2xl font-bold mb-6"> */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          {book ? "Edit Book" : "Add New Book"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          // className="grid grid-cols-2 gap-5"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
        >

          <input
            placeholder="Title"
            {...register("title", { required: true })}
            // className="border rounded-lg p-3"
            className="w-full border rounded-lg p-3"
          />

          <input
            placeholder="Author"
            {...register("author", { required: true })}
            // className="border rounded-lg p-3"
            className="w-full border rounded-lg p-3"
          />

          <input
            placeholder="Publisher"
            {...register("publisher", { required: true })}
            // className="border rounded-lg p-3"
            className="w-full border rounded-lg p-3"
          />

          <select
            {...register("language", { required: true })}
            className="border rounded-lg p-3 bg-white"
          >
            <option value="">Select Language</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Bengali">Bengali</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Marathi">Marathi</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Kannada">Kannada</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Odia">Odia</option>
            <option value="Urdu">Urdu</option>
          </select>

          <select
            {...register("genre", { required: true })}
            className="border rounded-lg p-3 bg-white"
          >
            <option value="">Select Genre</option>
            <option value="Spiritual">Spiritual</option>
            <option value="Biography">Biography</option>
            <option value="Children">Children</option>
            <option value="Poetry">Poetry</option>
            <option value="Magazine">Magazine</option>
            <option value="Health">Health</option>
            <option value="Motivational">Motivational</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="number"
            placeholder="Cost Price"
            {...register("costPrice", { required: true })}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            placeholder="Selling Price"
            {...register("sellingPrice", { required: true })}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            placeholder="Stock Quantity"
            {...register("stockQuantity", { required: true })}
            className="border rounded-lg p-3"
          />

          {/* <div className="col-span-2 flex justify-end gap-3 mt-4"> */}
          <div className="md:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-3 mt-4">

            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className={`px-6 py-3 rounded-lg border transition ${
                loading
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>

            <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded-lg text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading
                  ? "Saving..."
                  : book
                    ? "Update Book"
                    : "Save Book"}
              </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default BookModal;