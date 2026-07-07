function LowStockBooks({

books,

}){

return(

<div className="bg-white rounded-xl shadow p-6">

<h2 className="text-xl font-semibold mb-5">

Low Stock Books

</h2>

<table className="w-full">

<thead>

<tr>

<th className="text-left">

Book

</th>

<th>

Stock

</th>

</tr>

</thead>

<tbody>

{books.map(book=>(

<tr
key={book._id}
className="border-b"
>

<td className="py-3">

{book.title}

</td>

<td className="text-center">

<span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">

{book.stockQuantity}

</span>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default LowStockBooks;