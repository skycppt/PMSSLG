import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { renewSubscription } from "../../services/subscriptionService";
import PaymentSection from "../common/PaymentSection";

function RenewSubscriptionModal({
  subscription,
  onClose,
  onRenewed,
}) {



  const {
  register,
  handleSubmit,
  watch,
  reset,
} = useForm({
  defaultValues: {
    duration: subscription.duration,
    paymentMethod: "Cash",
  },
});
 

  const [loading, setLoading] =
  useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  const [paymentVerified, setPaymentVerified] =
    useState(false);

  const [upiTransactionId, setUpiTransactionId] =
    useState("");

  const [cardReference, setCardReference] =
    useState("");


  const handleRenew = async (data) => {

  try {

    if (paymentMethod === "UPI") {

      const transactionId =
        upiTransactionId.trim().toUpperCase();

      if (!transactionId) {
        toast.error("Please enter Transaction ID");
        return;
      }

      if (transactionId.length < 10) {
        toast.error("Invalid Transaction ID");
        return;
      }

      if (!paymentVerified) {
        toast.error("Please verify the payment.");
        return;
      }

    }



    setLoading(true);

    await renewSubscription(
      subscription._id,
      {
        duration: data.duration,

        paymentMethod,

        transactionId:
          paymentMethod === "UPI"
            ? upiTransactionId.trim().toUpperCase()
            : null,
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

console.log(subscription.publication);

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-start overflow-y-auto z-50 py-8">

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
          {...register("duration", {
            required: true,
          })}
          className="border rounded-lg p-3 w-full mb-8"
        >
          <option value="6 Months">
            6 Months
          </option>

          <option value="1 Year">
            1 Year
          </option>
        </select>

          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">

            <p className="text-gray-600 text-sm">
              Renewal Amount
            </p>

            <h2 className="text-3xl font-bold text-green-700 mt-2">
              ₹
              {watch("duration") === "6 Months"
                ? subscription.publication?.price6Months
                : subscription.publication?.price1Year}
            </h2>

          </div>

      <PaymentSection
        amount={
          watch("duration") === "6 Months"
            ? subscription.publication.price6Months
            : subscription.publication.price1Year
        }

        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}

        paymentVerified={paymentVerified}
        setPaymentVerified={setPaymentVerified}

        upiTransactionId={upiTransactionId}
        setUpiTransactionId={setUpiTransactionId}

      />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit(handleRenew)}
            disabled={
              loading ||
              (
                paymentMethod === "UPI" &&
                !paymentVerified
              )
}
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