// import React, { forwardRef } from "react";

// const Invoice = forwardRef(({ sale, items }, ref) => {

//   return (

//     <div
//       id="invoice"
//       ref={ref}
//       className="bg-white p-10 text-black"
//       style={{
//         width: "210mm",
//         minHeight: "297mm",
//         margin: "auto",
//       }}
//     >

//       {/* Header */}

//       <div className="text-center border-b pb-5">

//         <h1 className="text-3xl font-bold">

//           Sant Nirankari Mission

//         </h1>

//         <p className="text-lg">

//           Siliguri Zone

//         </p>

//         <h2 className="text-2xl font-bold mt-4">

//           BOOK SALE INVOICE

//         </h2>

//       </div>

//       {/* Invoice Details */}

//       <div className="grid grid-cols-2 gap-8 mt-8">

//         <div>

//           <p>

//             <strong>Invoice:</strong>

//             {sale.invoiceNo}

//           </p>

//           <p>

//             <strong>Date:</strong>

//             {new Date(
//               sale.saleDate
//             ).toLocaleDateString()}

//           </p>

//         </div>

//         <div>

//           <p>

//             <strong>Payment:</strong>

//             {sale.paymentMethod}

//           </p>

//           <p>

//             <strong>Status:</strong>

//             {sale.paymentStatus}

//           </p>

//         </div>

//       </div>

//       {/* Member */}

//       <div className="mt-10">

//         <h3 className="text-xl font-bold mb-3">

//           Member Details

//         </h3>

//         <p>

//           <strong>ID:</strong>

//           {sale.member.memberId}

//         </p>

//         <p>

//           <strong>Name:</strong>

//           {sale.member.fullName}

//         </p>

//         <p>

//           <strong>Phone:</strong>

//           {sale.member.phone}

//         </p>

//       </div>

//       {/* Books */}

//       <table className="w-full mt-10 border">

//         <thead className="bg-gray-200">

//           <tr>

//             <th className="border p-3 text-left">

//               Book

//             </th>

//             <th className="border p-3 text-left">

//               Author

//             </th>

//             <th className="border p-3 text-center">

//               Qty

//             </th>

//             <th className="border p-3 text-right">

//               Price

//             </th>

//             <th className="border p-3 text-right">

//               Total

//             </th>

//           </tr>

//         </thead>

//         <tbody>

//           {items.map((item) => (

//             <tr key={item._id}>

//               <td className="border p-3">

//                 {item.book.title}

//               </td>

//               <td className="border p-3">

//                 {item.book.author}

//               </td>

//               <td className="border p-3 text-center">

//                 {item.quantity}

//               </td>

//               <td className="border p-3 text-right">

//                 ₹{item.sellingPrice}

//               </td>

//               <td className="border p-3 text-right">

//                 ₹{item.total}

//               </td>

//             </tr>

//           ))}

//         </tbody>

//       </table>

//       {/* Grand Total */}

//       <div className="flex justify-end mt-10">

//         <div className="border p-6 w-80">

//           <div className="flex justify-between">

//             <span className="font-semibold">

//               Grand Total

//             </span>

//             <span className="font-bold text-xl">

//               ₹{sale.totalAmount}

//             </span>

//           </div>

//         </div>

//       </div>

//       {/* Footer */}

//       <div className="mt-20 flex justify-between">

//         <div>

//           <p>

//             Sold By

//           </p>

//           <br />

//           <p>

//             ___________________

//           </p>

//         </div>

//         <div>

//           <p>

//             Customer Signature

//           </p>

//           <br />

//           <p>

//             ___________________

//           </p>

//         </div>

//       </div>

//     </div>

//   );

// });

// export default Invoice;