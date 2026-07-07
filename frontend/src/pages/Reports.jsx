import { useEffect, useState } from "react";

import { getSalesReport } from "../services/reportService";

import ReportFilters from "../components/reports/sales/ReportFilters";
import ReportSummary from "../components/reports/sales/ReportSummary";
import SalesReportTable from "../components/reports/sales/SalesReportTable";
import { exportSalesPDF }
from "../utils/reportExport/exportSalesPDF";

import { exportSalesExcel }
from "../utils/reportExport/exportSalesExcel";

function Reports() {

  const [report, setReport] = useState(null);

  const [filters, setFilters] = useState({

    from: "",

    to: "",

    paymentMethod: "All",

    paymentStatus: "All",

  });

  useEffect(() => {

    fetchReport();

  }, []);

  const fetchReport = async () => {

    try {

      const data =
        await getSalesReport(filters);

      setReport(data);

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <h1 className="text-3xl font-bold">

        Sales Report

      </h1>

      <p className="text-gray-500 mt-2 mb-8">

        Generate and download sales reports.

      </p>

      <ReportFilters

        filters={filters}

        setFilters={setFilters}

        onGenerate={fetchReport}

      />

      {report && (

        <>

          <div className="flex justify-end gap-4 mb-1">

            <button
            onClick={()=>
            exportSalesPDF(report)
            }
            className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700"
            >
            📄 Export PDF
            </button>
            <button
            onClick={()=>
            exportSalesExcel(report)
            }
            className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700"
            >
            📊 Export Excel
            </button>
            </div>


          <ReportSummary

            report={report}

          />

          <SalesReportTable

            sales={report.sales}

          />

        </>

      )}

    </div>

  );

}

export default Reports;



// import { useState } from "react";

// import ReportTabs from "../components/reports/ReportTabs";

// import ReportOverview from "../components/reports/ReportOverview";

// import SalesReport from "../components/reports/sales/SalesReport";

// import InventoryReport from "../components/reports/inventory/InventoryReport";

// import SubscriptionReport from "../components/reports/subscription/SubscriptionReport";

// import RevenueReport from "../components/reports/revenue/RevenueReport";

// import AnalyticsReport from "../components/reports/analytics/AnalyticsReport";

// import { getDashboard } from "../services/dashboardService";


// const [dashboard, setDashboard] = useState(null);

// const [activeTab, setActiveTab] = useState("sales");

// useEffect(() => {

//     fetchDashboard();

// }, []);

// const fetchDashboard = async () => {

//     const data = await getDashboard();

//     setDashboard(data);

// };


// <div>

// <h1 className="text-4xl font-bold">

// Reports

// </h1>

// <p className="text-gray-500 mb-8">

// Business Reports & Analytics

// </p>

// {dashboard && (

// <ReportOverview

// dashboard={dashboard}

// />

// )}

// <ReportTabs

// activeTab={activeTab}

// setActiveTab={setActiveTab}

// />

// {activeTab==="sales" && <SalesReport />}

// {activeTab==="inventory" && <InventoryReport />}

// {activeTab==="subscription" && <SubscriptionReport />}

// {activeTab==="revenue" && <RevenueReport />}

// {activeTab==="analytics" && <AnalyticsReport />}

// </div>