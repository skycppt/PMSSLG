function RecentSales({

sales,

}){

return(

<div className="bg-white rounded-xl shadow p-6 text-center">

<h2 className="text-xl font-semibold mb-5 text-center">

Recent 5 Sales

</h2>

<table className="w-full text-center">

<thead>

<tr>

<th>

Invoice

</th>

<th>

Member

</th>

<th>

Amount

</th>

</tr>

</thead>

<tbody>

{sales.map(sale=>(

<tr
key={sale._id}
className="border-b"
>

<td>

{sale.invoiceNo}

</td>

<td>

{sale.member?.fullName}

</td>

<td>

₹{sale.totalAmount}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default RecentSales;