function SalesReportTable({

sales,

}){

return(

<div className="bg-white rounded-xl shadow overflow-hidden">

<table className="w-full text-center">

<thead className="bg-blue-600 text-white">

<tr>

<th className="p-4">Invoice</th>

<th className="p-4">Member</th>

<th className="p-4">Amount</th>

<th className="p-4">Payment</th>


<th className="p-4">Date</th>

</tr>

</thead>

<tbody>

{sales.map((sale)=>(

<tr
key={sale._id}
className="border-b hover:bg-gray-50"
>

<td className="p-4">

{sale.invoiceNo}

</td>

<td className="p-4">

{sale.member?.fullName}

</td>

<td className="p-4">

₹{sale.totalAmount}

</td>

<td className="p-4">

{sale.paymentMethod}

</td>

<td className="p-4">

{new Date(
sale.saleDate
).toLocaleDateString()}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default SalesReportTable;