import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

function AdminLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] =
  useState(false);

  return (

    <div className="flex">

      <Sidebar

        isOpen={sidebarOpen}

        setIsOpen={setSidebarOpen}

        />
        {

          sidebarOpen && (

          <div

          className="fixed inset-0 bg-black/40 z-40 lg:hidden"

          onClick={()=>setSidebarOpen(false)}

          />

          )

          }

      <div className="flex-1 bg-gray-100 min-h-screen">

          <div className="lg:hidden p-4 bg-white shadow">

            <button

            onClick={()=>setSidebarOpen(true)}

            className="text-2xl text-blue-700"

            >

            <FaBars/>

            </button>

            </div>
        <Navbar />

        <main className="p-4 sm:p-6 lg:p-8">

          {children}

        </main>

      </div>

    </div>

  );

}

export default AdminLayout;