import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getSubscriptionDetails,
  deliverMagazine,
} from "../../services/subscriptionService";

function generateMonths(startDate, endDate) {
  const months = [];

  const current = new Date(startDate);
  current.setDate(1);

  const end = new Date(endDate);
  end.setDate(1);

  while (current <= end) {
    months.push({
      value: `${current.getFullYear()}-${String(
        current.getMonth() +1,
      ).padStart(2, "0")}`,
      label: current.toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      }),
    });

    current.setMonth(current.getMonth() + 1);
  }

  return months;
}

function SubscriptionDetails() {
  const { id } = useParams();

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [delivering, setDelivering] = useState(false);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      setLoading(true);

      const data = await getSubscriptionDetails(id);

      setSubscription(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load subscription");
    } finally {
      setLoading(false);
    }
  };

  const handleDeliver = async () => {
    try {
      setDelivering(true);

      await deliverMagazine(subscription._id, selectedMonth.value);

      toast.success("Magazine delivered successfully");

      setShowConfirm(false);
      setSelectedMonth(null);

      fetchSubscription();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Delivery failed");
    } finally {
      setDelivering(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!subscription) {
    return <div className="p-6">Subscription not found.</div>;
  }

  const months = generateMonths(subscription.startDate, subscription.endDate);

  const deliveredCount = subscription.deliveryHistory.length;
  const totalMonths = months.length;
  const progress = (deliveredCount / totalMonths) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Subscription Details</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Member Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Name</strong>
            <p>{subscription.member.fullName}</p>
          </div>

          <div>
            <strong>Member ID</strong>
            <p>{subscription.member.memberId}</p>
          </div>

          <div>
            <strong>Phone</strong>
            <p>{subscription.member.phone}</p>
          </div>

          <div>
            <strong>Publication</strong>
            <p>{subscription.publication.name}</p>
          </div>

          <div>
            <strong>Language</strong>
            <p>{subscription.publication.language}</p>
          </div>

          <div>
            <strong>Duration</strong>
            <p>{subscription.duration}</p>
          </div>

          <div>
            <strong>Start Date</strong>
            <p>{new Date(subscription.startDate).toLocaleDateString()}</p>
          </div>

          <div>
            <strong>End Date</strong>
            <p>{new Date(subscription.endDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-6">
          Magazine Delivery Tracker
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-5">
            <p className="text-gray-500">Subscription</p>

            <h2 className="text-2xl font-bold">{subscription.duration}</h2>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-gray-500">Delivered</p>

            <h2 className="text-2xl font-bold">{deliveredCount}</h2>
          </div>

          <div className="bg-yellow-50 rounded-xl p-5">
            <p className="text-gray-500">Remaining</p>

            <h2 className="text-2xl font-bold">
              {totalMonths - deliveredCount}
            </h2>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Delivery Progress</span>

            <span className="text-sm text-gray-500">
              {deliveredCount} / {totalMonths} Delivered
            </span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full">
            <div
              className="h-3 bg-green-600 rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {months.map((month) => {
            const delivered = subscription.deliveryHistory.find(
              (item) => item.month === month.value,
            );

            return (
              <div
                key={month.value}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{month.label}</h3>

                  {delivered ? (
                    <div className="text-sm text-green-600 mt-1">
                      Delivered on{" "}
                      {new Date(delivered.deliveredAt).toLocaleDateString(
                        "en-IN",
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 mt-1">Pending</div>
                  )}
                </div>

                {delivered ? (
                  <button
                    disabled
                    className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-not-allowed"
                  >
                    Delivered
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedMonth(month);
                      setShowConfirm(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Deliver
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Delivery</h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to mark
              <span className="font-semibold"> {selectedMonth?.label}</span> as
              delivered?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setSelectedMonth(null);
                }}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDeliver}
                disabled={delivering}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {delivering ? "Saving..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubscriptionDetails;
