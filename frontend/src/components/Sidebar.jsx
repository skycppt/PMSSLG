import {
  FaBook,
  FaHome,
  FaNewspaper,
  FaUsers,
  FaMoneyBill,
  FaFileInvoice,
  FaChartBar,
  FaAddressBook,
  FaTimes,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar({

  isOpen,

  setIsOpen,

})  {
  return (
    <aside
  className={`
    fixed lg:static
    top-0 left-0
    z-50
    w-64
    h-screen
    bg-blue-700
    text-white
    p-5
    transform
    transition-transform
    duration-300
    ${
      isOpen
        ? "translate-x-0"
        : "-translate-x-full lg:translate-x-0"
    }
  `}
>

      <div className="flex justify-between items-center mb-10">

<h1 className="text-2xl font-bold">

PMS

</h1>

<button

onClick={()=>setIsOpen(false)}

className="lg:hidden text-2xl"

>

<FaTimes/>

</button>

</div>

      <nav className="space-y-5">

        <NavLink
          to="/dashboard"
          onClick={()=>setIsOpen(false)}
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
          onClick={()=>setIsOpen(false)}
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
          onClick={()=>setIsOpen(false)}
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
            onClick={()=>setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100"
          >
            <FaUsers />
            Members
          </NavLink>
        <NavLink
          to="/subscriptions"
          onClick={()=>setIsOpen(false)}
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
          onClick={()=>setIsOpen(false)}
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
          onClick={()=>setIsOpen(false)}
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