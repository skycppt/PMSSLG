import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  createPublication,
  updatePublication,
} from "../../services/publicationService";

function PublicationModal({
  publication,
  onClose,
  onPublicationAdded,
}) {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (publication) {
      reset(publication);
    }

  }, [publication, reset]);

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      if (publication) {

        await updatePublication(
          publication._id,
          data
        );

        toast.success(
          "Publication updated successfully"
        );

      } else {

        await createPublication(data);

        toast.success(
          "Publication added successfully"
        );

      }

      await onPublicationAdded();

      onClose();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Operation Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8">

        <h2 className="text-2xl font-bold mb-8">

          {publication
            ? "Edit Publication"
            : "Add Publication"}

        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-5"
        >

          <input
            placeholder="Publication Name"
            {...register("name", {
              required: true,
            })}
            className="border rounded-lg p-3"
          />

          <select
            {...register("language", {
              required: true,
            })}
            className="border rounded-lg p-3 bg-white"
          >

            <option value="">
              Select Language
            </option>

            <option value="Hindi">
              Hindi
            </option>

            <option value="English">
              English
            </option>

            <option value="Bengali">
              Bengali
            </option>

            <option value="Punjabi">
              Punjabi
            </option>

            <option value="Marathi">
              Marathi
            </option>

            <option value="Gujarati">
              Gujarati
            </option>

            <option value="Tamil">
              Tamil
            </option>

            <option value="Telugu">
              Telugu
            </option>

            <option value="Kannada">
              Kannada
            </option>

            <option value="Malayalam">
              Malayalam
            </option>

            <option value="Odia">
              Odia
            </option>

            <option value="Urdu">
              Urdu
            </option>

          </select>

          <select
            {...register("frequency", {
              required: true,
            })}
            className="border rounded-lg p-3 bg-white"
          >

            <option value="">
              Select Frequency
            </option>

            <option value="Weekly">
              Weekly
            </option>

            <option value="Monthly">
              Monthly
            </option>

            <option value="Quarterly">
              Quarterly
            </option>

            <option value="Yearly">
              Yearly
            </option>

          </select>

          <input
            type="number"
            placeholder="6 Months Price"
            {...register("price6Months", {
              required: true,
            })}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            placeholder="1 Year Price"
            {...register("price1Year", {
              required: true,
            })}
            className="border rounded-lg p-3"
          />
                    <textarea
            placeholder="Description"
            {...register("description", {
              required: true,
            })}
            rows={4}
            className="border rounded-lg p-3 col-span-2 resize-none"
          />

          <input
            type="text"
            placeholder="Cover Image URL (Optional)"
            {...register("coverImage")}
            className="border rounded-lg p-3 col-span-2"
          />

          {publication && (
            <label className="col-span-2 flex items-center gap-3">

              <input
                type="checkbox"
                {...register("isActive")}
                className="w-5 h-5"
              />

              <span className="text-gray-700">
                Active Publication
              </span>

            </label>
          )}

          <div className="col-span-2 flex justify-end gap-3 mt-6">

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
                : publication
                ? "Update Publication"
                : "Save Publication"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default PublicationModal;