import {
  FaUsers,
  FaBook,
  FaClipboardList,
  FaRupeeSign,
} from "react-icons/fa";

function Card({
  title,
  value,
  icon,
  color,
}) {
  return (

    <div className={`${color} rounded-xl shadow p-6`}>

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-600">

            {title}

          </p>

          <h2 className="text-3xl font-bold mt-3">

            {value}

          </h2>

        </div>

        {icon}

      </div>

    </div>

  );
}

function ReportOverview({ dashboard }) {

  return (

    <div className="grid grid-cols-4 gap-5 mb-8">

      <Card

        title="Revenue"

        value={`₹${dashboard.sales.totalRevenue}`}

        icon={<FaRupeeSign className="text-red-600 text-3xl" />}

        color="bg-red-50"

      />

      <Card

        title="Books"

        value={dashboard.books.totalBooks}

        icon={<FaBook className="text-blue-600 text-3xl" />}

        color="bg-blue-50"

      />

      <Card

        title="Members"

        value={dashboard.members.totalMembers}

        icon={<FaUsers className="text-purple-600 text-3xl" />}

        color="bg-purple-50"

      />

      <Card

        title="Subscriptions"

        value={dashboard.subscriptions.activeSubscriptions}

        icon={<FaClipboardList className="text-green-600 text-3xl" />}

        color="bg-green-50"

      />

    </div>

  );

}

export default ReportOverview;