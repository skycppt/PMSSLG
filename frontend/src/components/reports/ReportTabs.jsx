import {
  FaChartBar,
  FaBook,
  FaNewspaper,
  FaRupeeSign,
  FaChartLine,
} from "react-icons/fa";

const tabs = [
  {
    id: "sales",
    label: "Sales",
    icon: <FaChartBar />,
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: <FaBook />,
  },
  {
    id: "subscription",
    label: "Subscription",
    icon: <FaNewspaper />,
  },
  {
    id: "revenue",
    label: "Revenue",
    icon: <FaRupeeSign />,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <FaChartLine />,
  },
];

function ReportTabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-3 mb-8 flex gap-3">

      {tabs.map((tab) => (

        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg transition

          ${
            activeTab === tab.id
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {tab.icon}

          {tab.label}

        </button>

      ))}

    </div>
  );
}

export default ReportTabs;