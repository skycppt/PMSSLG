import { getSubscriptionStatus } from "../../utils/subscriptionStatus";
import {
  FaEye,
  FaSyncAlt,
  FaBan,
} from "react-icons/fa";

function SubscriptionTable({
  subscriptions,
  onView,
  onRenew,
  onCancel,
}) {

  if (subscriptions.length === 0) {

    return (

      <div className="bg-white rounded-xl shadow p-10 text-center">

        <div className="text-6xl mb-4">
          📰
        </div>

        <h2 className="text-2xl font-semibold">
          No Subscriptions Found
        </h2>

        <p className="text-gray-500 mt-2">
          Create your first subscription.
        </p>

      </div>

    );

  }

  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="p-4 text-left">
              S.No.
            </th>

            <th className="p-4 text-left">
              Member
            </th>

            <th className="p-4 text-left">
              Publication
            </th>
            <th className="p-4 text-left">
              Language
            </th>

            <th className="p-4 text-left">
              Duration
            </th>

            {/* <th className="p-4 text-left">
              Months Left
            </th> */}

            <th className="p-4 text-left">
              End Date
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {subscriptions.map((sub, index) => {

            const today = new Date();

            const end = new Date(sub.endDate);

            let monthsLeft =
              (end.getFullYear() - today.getFullYear()) * 12 +
              (end.getMonth() - today.getMonth());

            const status = getSubscriptionStatus(sub);

            let badge = "bg-green-100 text-green-700";

            switch (status) {
              case "Expiring Soon":
                badge = "bg-yellow-100 text-yellow-700";
                break;

              case "Expired":
                badge = "bg-red-100 text-red-700";
                break;

              case "Cancelled":
                badge = "bg-gray-200 text-gray-700";
                break;

              default:
                badge = "bg-green-100 text-green-700";
            }

            return (

              <tr
                key={sub._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {index + 1}
                </td>

                <td className="p-4">

                  <div className="font-semibold">
                    {sub.member?.fullName}
                  </div>

                  <div className="text-sm text-gray-500">
                    {sub.member?.memberId}
                  </div>

                </td>

                <td className="p-4">

                  {sub.publication?.name}

                </td>
                <td className="p-4">

                  {sub.publication?.language}

                </td>

                <td className="p-4">

                  {sub.duration}

                </td>

                

               <td className="p-4">
                  {(() => {
                    const date = new Date(sub.endDate);
                    date.setMonth(date.getMonth() - 1);

                    return date.toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    });
                  })()}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${badge}`}
                  >
                    {status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-4">

                    <button
                        onClick={() => {
                          console.log("Clicked subscription:", sub);
                          onView(sub);
                        }}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => {
                        onRenew(sub);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaSyncAlt />
                    </button>

                    <button
                      onClick={() => onCancel(sub)}
                      className="text-red-600 hover:text-red-800"
                      title="Cancel"
                    >
                      <FaBan />
                    </button>

                  </div>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>

  );

}

export default SubscriptionTable;