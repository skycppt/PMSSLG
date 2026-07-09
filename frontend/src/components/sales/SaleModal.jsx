import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";

import { getAllMembers } from "../../services/memberService";
import { getAllBooks } from "../../services/bookService";
import { createSale } from "../../services/saleService";



function SaleModal({

  onClose,

  onSaleAdded,

}) {

  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);

  const [selectedMember, setSelectedMember] = useState(null);

  const [selectedBooks, setSelectedBooks] = useState([]);

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");


  const [loading, setLoading] =
    useState(false);

  const [paymentVerified, setPaymentVerified] =
useState(false);


  const [upiTransactionId,setUpiTransactionId]=
useState("");


    useEffect(() => {

  loadData();

}, []);

const loadData = async () => {

  try {

    const memberResponse =
      await getAllMembers();

    const bookResponse =
      await getAllBooks();

    setMembers(memberResponse);

    setBooks(bookResponse);

  } catch (error) {

    toast.error(
      "Failed to load data"
    );

  }

};

const memberOptions =
members.map(member=>({

value:member._id,

label:
`${member.memberId} • ${member.fullName} (${member.phone})`

}));

const bookOptions = books.map((book) => ({

  value: book._id,

  label: `${book.title} • ₹${book.sellingPrice} • Stock: ${book.stockQuantity}`,

}));

const totalAmount = useMemo(() => {

  return selectedBooks.reduce(

    (sum, book) =>

      sum +

      book.quantity *

      book.sellingPrice,

    0

  );

}, [selectedBooks]);


const handleCreateSale = async () => {

  if (!selectedMember) {
    toast.error("Please select a member");
    return;
  }

  if (selectedBooks.length === 0) {
    toast.error("Please add at least one book");
    return;
  }

  const saleData = {

    memberId: selectedMember._id,

    books: selectedBooks.map((book) => ({
      bookId: book.bookId,
      quantity: book.quantity,
    })),

    paymentMethod,

    paymentStatus: "Paid",

    upiTransactionId,

  };

  try {

    setLoading(true);

    // =============================
    // CASH
    // =============================

    if (paymentMethod === "Cash") {

      await createSale(saleData);

      toast.success("Sale created successfully");

      await onSaleAdded();

      onClose();

      return;

    }



    if (paymentMethod === "UPI") {

  const transactionId =
    upiTransactionId.trim().toUpperCase();

  if (!transactionId) {

    toast.error(
      "Please enter Transaction ID"
    );

    return;

  }

  if (transactionId.length < 10) {

    toast.error(
      "Invalid Transaction ID"
    );

    return;

  }

  if (!paymentVerified) {

    toast.error(
      "Please verify the payment."
    );

    return;

  }

  saleData.upiTransactionId =
    transactionId;

}


       
    await createSale(saleData);

    toast.success(
      "Sale created successfully"
    );

    await onSaleAdded();

    onClose();

  }
catch (error) {

    console.error(error);

    console.log(error.response);

    toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed"
    );

}

  finally {

    setLoading(false);

  }

};

return (

<div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

<div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">

<h2 className="text-2xl font-bold mb-8">

Create Sale

</h2>

{/* ===========================
    Member
=========================== */}

<div>

<label className="block font-medium mb-2">

Member

</label>

<Select

options={memberOptions}

placeholder="Search Member..."

isSearchable

onChange={(selected)=>{

const member=

members.find(

m=>m._id===selected.value

);

setSelectedMember(member);
}}
/>
</div>
{/* ===========================
    Member Preview
=========================== */}

{selectedMember && (

<div className="bg-blue-50 rounded-xl p-5 mt-6">

<h3 className="font-semibold text-lg mb-4">

Selected Member

</h3>

<div className="grid grid-cols-2 gap-4">

<div>

<p className="text-gray-500">

Member ID

</p>

<p className="font-semibold">

{selectedMember.memberId}

</p>

</div>

<div>

<p className="text-gray-500">

Name

</p>

<p className="font-semibold">

{selectedMember.fullName}

</p>

</div>

<div>

<p className="text-gray-500">

Phone

</p>

<p className="font-semibold">

{selectedMember.phone}

</p>

</div>

<div>

<p className="text-gray-500">

Address

</p>

<p className="font-semibold">

{selectedMember.address}

</p>

</div>

</div>

</div>

)}

{/* ===========================
    Add Books
=========================== */}

<div className="mt-8">

  <label className="block font-medium mb-2">

    Add Book

  </label>

  <Select
    options={bookOptions}
    placeholder="Search Book..."
    isSearchable
    onChange={(selected) => {

      const book = books.find(
        (b) => b._id === selected.value
      );

      if (!book) return;

      const exists = selectedBooks.find(
        (b) => b.bookId === book._id
      );

      if (exists) {

        toast.error("Book already added");

        return;

      }

      setSelectedBooks([
        ...selectedBooks,
        {
          bookId: book._id,
          title: book.title,
          sellingPrice: book.sellingPrice,
          stock: book.stockQuantity,
          quantity: 1,
        },
      ]);

    }}
  />

</div>


{selectedBooks.length > 0 && (
<div className="mt-6">
<h3 className="text-lg font-semibold mb-4">Selected Books</h3>
<div className="space-y-4">{selectedBooks.map((book) => (
  <div key={book.bookId} className="border rounded-lg p-4 flex justify-between items-center">
<div>
<h4 className="font-semibold">{book.title}</h4>
<p className="text-sm text-gray-500">
Stock: {book.stock}
</p>
</div>
<div>
₹{book.sellingPrice}
</div>
<div className="flex items-center gap-3">
<button
onClick={() => {
setSelectedBooks(
selectedBooks.map((b)=>
b.bookId===book.bookId
?{
...b,
quantity:
Math.max(
1,
b.quantity-1
),
}
:b)
);
}}
className="border px-3 rounded"
>
-
</button>
<span>
{book.quantity}
</span>
<button
onClick={() => {

if(
book.quantity>=book.stock
){

toast.error(
"Out of stock"
);

return;

}

setSelectedBooks(

selectedBooks.map((b)=>

b.bookId===book.bookId

?{

...b,

quantity:
b.quantity+1,

}

:b

)

);

}}

className="border px-3 rounded"

>

+

</button>

</div>

<div className="font-bold">

₹{

book.quantity *

book.sellingPrice

}

</div>

<button

onClick={()=>

setSelectedBooks(

selectedBooks.filter(

(b)=>

b.bookId!==book.bookId

)

)

}

className="text-red-600"

>

Remove

</button>

</div>

))}

</div>

</div>

)}

{/* ===========================
    Grand Total
=========================== */}

<div className="bg-green-50 rounded-xl p-6 mt-8">

  <h3 className="text-xl font-semibold mb-4">

    Order Summary

  </h3>

  <div className="flex justify-between mb-2">

    <span className="text-gray-600">

      Subtotal

    </span>

    <span>

      ₹{
        selectedBooks.reduce(

          (sum, book) =>

            sum +
            book.quantity *
            book.sellingPrice,

          0

        )
      }

    </span>

  </div>


  <hr className="my-3" />

  <div className="flex justify-between">

    <span className="text-2xl font-bold">

      Grand Total

    </span>

    <span className="text-3xl font-bold text-green-700">

      ₹{totalAmount}

    </span>

  </div>

</div>


{/* ===========================
    Payment Method
=========================== */}

{/* ===========================
    Payment Method
=========================== */}

<div className="mt-6">

  <label className="block mb-2 font-medium">
    Payment Method
  </label>

  <select
    value={paymentMethod}
    onChange={(e) =>
      setPaymentMethod(e.target.value)
    }
    className="border rounded-lg p-3 w-full"
  >
    <option value="Cash">Cash</option>
    <option value="UPI">UPI</option>
    <option value="Card">Card</option>
    <option value="Bank Transfer">
      Bank Transfer
    </option>
  </select>

</div>

{/* ===========================
    UPI Payment Section
=========================== */}

{paymentMethod === "UPI" && (

<div className="mt-8 border rounded-xl p-6 bg-blue-50">

<h3 className="text-xl font-semibold text-center">

Scan & Pay

</h3>

<img
src="/Gpay.jpeg"
alt="UPI QR"
className="w-72 mx-auto mt-4 rounded-lg border"
/>

<p className="text-center mt-4 text-gray-600">

Amount to Pay

</p>

<p className="text-3xl font-bold text-center text-green-700">

₹{totalAmount}

</p>

<input
type="text"
placeholder="Enter UPI Transaction ID (UTR)"
value={upiTransactionId}
onChange={(e)=>
setUpiTransactionId(e.target.value)
}
className="border rounded-lg w-full p-3 mt-6"
/>

<label className="flex items-center gap-3 mt-5">

<input
type="checkbox"
checked={paymentVerified}
onChange={(e)=>
setPaymentVerified(e.target.checked)
}
/>

<span>
I have verified the payment on the customer's phone.
</span>

</label>

</div>

)}

<div className="flex justify-end gap-4 mt-8">

<button onClick={onClose} className="border px-6 py-3 rounded-lg hover:bg-gray-100">
Cancel
</button>

<button
    onClick={handleCreateSale}
    disabled={
  loading ||
  !selectedMember ||
  selectedBooks.length === 0 ||
  (
    paymentMethod === "UPI" &&
    !paymentVerified
  )
}
    className={`px-6 py-3 rounded-lg text-white transition ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
  >
    {loading ? "Creating..." : "Create Sale"}
  </button>

</div>

</div>

</div>

);

}

export default SaleModal;