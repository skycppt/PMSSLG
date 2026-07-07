import {
  FaBook,
  FaHome,
  FaNewspaper,
  FaUsers,
  FaMoneyBill,
  FaFileInvoice,
  FaChartBar,
  FaAddressBook,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-10">
        PMS
      </h1>

      <nav className="space-y-5">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/books"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <FaBook />
          Books
        </NavLink>

        <NavLink
          to="/publications"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <FaNewspaper />
          Publications
        </NavLink>


          <NavLink
            to="/members"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100"
          >
            <FaUsers />
            Members
          </NavLink>
        <NavLink
          to="/subscriptions"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <FaUsers />
          Subscriptions
        </NavLink>
        
        <NavLink
          to="/sales"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <FaMoneyBill />
          Book Sales
        </NavLink>

        

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <FaChartBar />
          Reports
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;