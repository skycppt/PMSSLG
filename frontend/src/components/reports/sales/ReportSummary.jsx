function ReportSummary({

report,

}){

return(

<div className="bg-green-50 rounded-xl p-6 mb-8">

<div className="flex justify-between">

<div>

<h3 className="text-gray-500">

Total Sales

</h3>

<p className="text-3xl font-bold text-green-700">

₹{report.totalSales}

</p>

</div>

<div>

<h3 className="text-gray-500">

Total Records

</h3>

<p className="text-3xl font-bold">

{report.totalRecords}

</p>

</div>

</div>

</div>

);

}

export default ReportSummary;