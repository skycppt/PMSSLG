import { deleteBook } from "../../services/bookService";
import toast from "react-hot-toast";

function DeleteBookModal({
  bookId,
  onClose,
  onDeleted,
}) {

  const handleDelete = async () => {

    try {

      await deleteBook(bookId);

      await onDeleted();
      toast.success("Book deleted successfully");
      onClose();

    } catch (error) {

      console.log(error);

      toast.error("Failed to delete book");

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-8 w-96">

        <h2 className="text-xl font-bold mb-4">
          Delete Book
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this book?
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteBookModal;