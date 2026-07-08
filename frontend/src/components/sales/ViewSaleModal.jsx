import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getSaleById } from "../../services/saleService";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaWhatsapp } from "react-icons/fa";


// import Invoice from "./Invoice";

function ViewSaleModal({

  sale,

  onClose,

}) {

  const [saleData, setSaleData] = useState(null);

  const [loading, setLoading] = useState(true);
 

  useEffect(() => {

    fetchSale();

  }, []);

  

  const fetchSale = async () => {

    try {

      const response = await getSaleById(sale._id);

      setSaleData(response);

    }

    catch (error) {

      console.log(error);

      toast.error("Failed to load sale");

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

        <div className="bg-white p-10 rounded-xl">

          Loading...

        </div>

      </div>

    );

  }

  const details = saleData.sale;

  const items = saleData.items;
 

  return (

<div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

<div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8">

<h2 className="text-3xl font-bold mb-8">

Sale Details

</h2>

<div className="grid grid-cols-2 gap-6 mb-8">

<div>

<p className="text-gray-500">

Invoice

</p>

<p className="font-semibold">

{details.invoiceNo}

</p>

</div>

<div>

<p className="text-gray-500">

Sale Date

</p>

<p className="font-semibold">

{new Date(details.saleDate).toLocaleString()}

</p>

</div>

<div>

<p className="text-gray-500">

Member

</p>

<p className="font-semibold">

{details.member.fullName}

</p>

</div>

<div>

<p className="text-gray-500">

Member ID

</p>

<p className="font-semibold">

{details.member.memberId}

</p>

</div>

<div>

<p className="text-gray-500">

Phone

</p>

<p className="font-semibold">

{details.member.phone}

</p>

</div>

<div>

<p className="text-gray-500">

Payment

</p>

<p className="font-semibold">

{details.paymentMethod}

</p>

</div>

<div>

<p className="text-gray-500">

Payment Status

</p>

<p className="font-semibold">

{details.paymentStatus}

</p>

</div>

<div>

<p className="text-gray-500">

Sold By

</p>

<p className="font-semibold">

{details.soldBy.fullName}

</p>

</div>

</div>

<h3 className="text-2xl font-semibold mb-5">

Purchased Books

</h3>

<table className="w-full border">

<thead className="bg-blue-600 text-white">

<tr>

<th className="p-3">

Book

</th>

<th className="p-3">

Author

</th>

<th className="p-3">

Qty

</th>

<th className="p-3">

Price

</th>

<th className="p-3">

Total

</th>

</tr>

</thead>

<tbody>

{items.map((item)=>(

<tr
key={item._id}
className="border-b"
>

<td className="p-3 text-center">

{item.book.title}

</td>

<td className="p-3 text-center">

{item.book.author}

</td>

<td className="p-3 text-center">

{item.quantity}

</td>

<td className="p-3 text-center">

₹{item.sellingPrice}

</td>

<td className="p-3 font-semibold text-center">

₹{item.total}

</td>

</tr>

))}

</tbody>

</table>

<div className="mt-8 flex justify-end">

<div className="text-right">

<h3 className="text-gray-500">

Grand Total

</h3>

<p className="text-4xl font-bold text-green-700">

₹{details.totalAmount}

</p>

</div>

</div>

<div className="flex justify-end gap-4 mt-10">

<button

onClick={onClose}

className="border px-6 py-3 rounded-lg hover:bg-gray-100"

>

Close

</button>



</div>

</div>

</div>

);

}

export default ViewSaleModal;