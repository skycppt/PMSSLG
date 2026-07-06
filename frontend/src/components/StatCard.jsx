import React from "react";

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center hover:shadow-lg transition">

      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {value}
        </h2>
      </div>

      <div className="text-4xl text-blue-600">
        {icon}
      </div>

    </div>
  );
}

export default StatCard;