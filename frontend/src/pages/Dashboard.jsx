

import { useEffect, useState } from "react";

import { getDashboard } from "../services/dashboardService";

import SummaryCards from "../components/dashboard/SummaryCards";
import LowStockBooks from "../components/dashboard/LowStockBooks";
import RecentSales from "../components/dashboard/RecentSales";
import ExpiringSubscriptions from "../components/dashboard/ExpiringSubscriptions";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const response =
        await getDashboard();

      setDashboard(response);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="text-center text-xl mt-20">

        Loading Dashboard...

      </div>

    );

  }

  return (

    <div>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Dashboard

        </h1>

        <p className="text-gray-500 mt-2">

          Welcome to Sant Nirankari Publication Management System

        </p>

      </div>

      <SummaryCards
        data={dashboard}
      />

      <div className="grid grid-cols-2 gap-6 mt-8">

        <LowStockBooks
          books={dashboard.books.lowStockList}
        />

        <RecentSales
          sales={dashboard.sales.recentSales}
        />

      </div>

      <div className="mt-8">

        <ExpiringSubscriptions
          subscriptions={
            dashboard.expiringSubscriptions
          }
        />

      </div>

    </div>

  );

}

export default Dashboard;