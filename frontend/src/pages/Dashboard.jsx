import { useEffect, useState } from "react";

import { getDashboardData } from "../services/dashboardService";
import StatCard from "../components/StatCard";

import {
  FaBook,
  FaNewspaper,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const response = await getDashboardData();

      setDashboard(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!dashboard) {

    return (
      <h2 className="text-2xl">
        Loading Dashboard...
      </h2>
    );

  }

  return (

    <>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <StatCard
            title="Books"
            value={dashboard.books.totalBooks}
            icon={<FaBook />}
            />

          <StatCard
            title="Publications"
            value={dashboard.publications.totalPublications}
            icon={<FaNewspaper  />}
            />

          <StatCard
            title="Subscribers"
            value={dashboard.subscriptions.activeSubscriptions}
            icon={<FaUsers />}
            />

          <StatCard
            title="Revenue"
            value={`₹${dashboard.sales.totalRevenue}`}
            icon={<FaMoneyBillWave />}
            />

        </div>

          
              

    </>

  );

}

export default Dashboard;