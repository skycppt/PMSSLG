import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  createMember,
  updateMember,
} from "../../services/memberService";

function MemberModal({
  member,
  onClose,
  onMemberAdded,
}) {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (member) {
      reset(member);
    }
  }, [member, reset]);

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      if (member) {

        await updateMember(
          member._id,
          data
        );

        toast.success(
          "Member updated successfully"
        );

      } else {

        await createMember(data);

        toast.success(
          "Member added successfully"
        );

      }

      await onMemberAdded();

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

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8">

        <h2 className="text-2xl font-bold mb-6">

          {member
            ? "Edit Member"
            : "Add Member"}

        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-5"
        >

          <input
            placeholder="Full Name"
            {...register("fullName", {
              required: true,
            })}
            className="border rounded-lg p-3"
          />

          <input
            placeholder="Phone Number"
            {...register("phone", {
              required: true,
            })}
            className="border rounded-lg p-3"
          />

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="border rounded-lg p-3"
          />

          <select
            {...register("status")}
            className="border rounded-lg p-3 bg-white"
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          <textarea
            placeholder="Address"
            {...register("address", {
              required: true,
            })}
            rows={4}
            className="border rounded-lg p-3 col-span-2 resize-none"
          />

          <div className="col-span-2 flex justify-end gap-3 mt-4">

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
                : member
                ? "Update Member"
                : "Save Member"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default MemberModal;