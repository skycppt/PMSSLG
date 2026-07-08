import { useEffect, useState } from "react";

import { getAllSales } from "../services/saleService";

import SaleTable from "../components/sales/SaleTable";
import SaleSearch from "../components/sales/SaleSearch";
import SaleModal from "../components/sales/SaleModal";
import ViewSaleModal from "../components/sales/ViewSaleModal";

import { getSaleById } from "../services/saleService";
import { generateInvoicePDF } from "../utils/invoiceGenerator";
import { useSearchParams } from "react-router-dom";

function Sales() {

  const [sales, setSales] = useState([]);

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [viewSale,setViewSale]=useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {

  const filter = searchParams.get("filter");

  if (filter === "today") {

    const today = new Date()
      .toISOString()
      .split("T")[0];

    setDateFilter(today);

  }

}, [searchParams]);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {

    fetchSales();

  }, []);

  const fetchSales = async () => {

    try {

      const response =
        await getAllSales();

      setSales(response);

    }

    catch(error){

      console.log(error);

    }

  };

  const filteredSales = sales.filter((sale) => {

  const text = search.toLowerCase();

  const matchesSearch =

    sale.invoiceNo
      ?.toLowerCase()
      .includes(text)

    ||

    sale.member?.fullName
      ?.toLowerCase()
      .includes(text)

    ||

    sale.member?.memberId
      ?.toLowerCase()
      .includes(text);

  let matchesDate = true;

  if (dateFilter) {

    const saleDate =
      new Date(sale.saleDate)
        .toISOString()
        .split("T")[0];

    matchesDate =
      saleDate === dateFilter;

  }

  return (
    matchesSearch &&
    matchesDate
  );

});

  return(

<div>

<div className="flex justify-between items-center mb-8">

<div>

<h1 className="text-3xl font-bold">

Sales

</h1>

<p className="text-gray-500 mt-2">

Manage Book Sales

</p>

</div>

<button

onClick={()=>setShowModal(true)}

className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"

>

+ New Sale

</button>

</div>

<div className="flex gap-4 mb-6">

  <div className="flex-1">

    <SaleSearch
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

  </div>

  <input
    type="date"
    value={dateFilter}
    onChange={(e) => setDateFilter(e.target.value)}
    className="border rounded-lg px-4 py-3"
  />

</div>

<SaleTable

sales={filteredSales}

onView={(sale)=>{

setViewSale(sale);

}}

onPrint={async (sale) => {

  try {

    const response =
      await getSaleById(sale._id);

    await generateInvoicePDF(response);

  } catch (error) {

    console.log(error);

  }

}}

onWhatsapp={(sale)=>{

const phone =
sale.member.phone.replace(/\D/g,"");

const message =
`🙏🏻 Dhan Nirankar Ji 🙏🏻

Rev. ${sale.member.fullName} Ji,

Thank you for purchasing from Sant Nirankari Publication, Siliguri.

Invoice No : ${sale.invoiceNo}

Amount : ₹${sale.totalAmount}

Payment Method : ${sale.paymentMethod}

Your purchase has been recorded successfully.

Regards,
Sant Nirankari Mission
Siliguri Zone`;

window.open(

`https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,

"_blank"

);

}}

// onCancel={(sale)=>{

// console.log("Cancel",sale);

// }}

/>

{viewSale&&(

<ViewSaleModal

sale={viewSale}

onClose={()=>

setViewSale(null)

}

/>

)}

{showModal&&(

<SaleModal

onClose={()=>setShowModal(false)}

onSaleAdded={fetchSales}

/>

)}

</div>

);

}

export default Sales;