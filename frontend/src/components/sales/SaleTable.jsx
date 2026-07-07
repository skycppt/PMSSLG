import {
  FaEye,
  FaPrint,
  FaBan,
} from "react-icons/fa";

function SaleTable({

  sales,

  onView,

  onPrint,

  onCancel,

}) {

  if (sales.length === 0) {

    return (

      <div className="bg-white rounded-xl shadow p-10 text-center">

        <h2 className="text-2xl font-semibold">

          No Sales Found

        </h2>

      </div>

    );

  }

  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="p-4">Invoice</th>

            <th className="p-4">Member</th>

            <th className="p-4">Amount</th>

            <th className="p-4">Payment</th>

            <th className="p-4">Date</th>

            <th className="p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {sales.map((sale) => (

            <tr
              key={sale._id}
              className="border-b hover:bg-gray-50 text-center"
            >

              <td className="p-4">

                {sale.invoiceNo}

              </td>

              <td className="p-4">

                <div className="font-semibold">

                  {sale.member?.fullName}

                </div>

                <div className="text-sm text-gray-500">

                  {sale.member?.memberId}

                </div>

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

              <td className="p-4">

                <div className="flex gap-4">

                  <button
                    onClick={() => onView(sale)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => onPrint(sale)}
                    className="text-green-600 hover:text-green-800"
                    title="Print"
                  >
                    <FaPrint />
                  </button>

                  <button
                    onClick={() => onCancel(sale)}
                    className="text-red-600 hover:text-red-800"
                    title="Cancel"
                  >
                    <FaBan />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default SaleTable;