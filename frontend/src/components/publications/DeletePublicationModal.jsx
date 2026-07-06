import { deletePublication } from "../../services/publicationService";
import toast from "react-hot-toast";

function DeletePublicationModal({
  publicationId,
  onClose,
  onDeleted,
}) {

  const handleDelete = async () => {

    try {

      await deletePublication(publicationId);

      await onDeleted();

      toast.success("Publication deleted successfully");

      onClose();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete publication"
      );

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl p-8 w-[420px]">

        <h2 className="text-2xl font-bold mb-4">
          Delete Publication
        </h2>

        <p className="text-gray-600 mb-8">
          Are you sure you want to delete this publication?
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg hover:bg-gray-100"
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

export default DeletePublicationModal;