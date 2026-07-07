import { useState } from "react";
import toast from "react-hot-toast";

import { renewSubscription } from "../../services/subscriptionService";

function RenewSubscriptionModal({
  subscription,
  onClose,
  onRenewed,
}) {

  const [duration, setDuration] =
    useState("6 Months");

  const [loading, setLoading] =
    useState(false);

  const handleRenew = async () => {

    try {

      setLoading(true);

      await renewSubscription(
        subscription._id,
        {
          duration,
        }
      );

      toast.success(
        "Subscription renewed successfully"
      );

      await onRenewed();

      onClose();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Renewal Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[500px] p-8">

        <h2 className="text-2xl font-bold mb-6">

          Renew Subscription

        </h2>

        <p className="mb-4">

          <strong>Member:</strong>{" "}
          {subscription.member?.fullName}

        </p>

        <p className="mb-6">

          <strong>Publication:</strong>{" "}
          {subscription.publication?.name}

        </p>

        <label className="block mb-2 font-medium">

          Renewal Duration

        </label>

        <select
          value={duration}
          onChange={(e)=>
            setDuration(e.target.value)
          }
          className="border rounded-lg p-3 w-full mb-8"
        >

          <option value="3 Months">
            3 Months
          </option>

          <option value="6 Months">
            6 Months
          </option>

          <option value="1 Year">
            1 Year
          </option>

        </select>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleRenew}
            disabled={loading}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >

            {loading
              ? "Renewing..."
              : "Renew"}

          </button>

        </div>

      </div>

    </div>

  );

}

export default RenewSubscriptionModal;