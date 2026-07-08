function RecentSales({

  sales,

}) {

  return (

    <div className="bg-white rounded-xl shadow p-4 sm:p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-lg sm:text-xl font-semibold">

          Recent Sales

        </h2>

        <span className="text-sm text-gray-500">

          {sales.length} Sales

        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3 text-sm font-semibold">

                Invoice

              </th>

              <th className="text-left py-3 text-sm font-semibold">

                Member

              </th>

              <th className="text-right py-3 text-sm font-semibold">

                Amount

              </th>

            </tr>

          </thead>

          <tbody>

            {sales.length > 0 ? (

              sales.map((sale) => (

                <tr

                  key={sale._id}

                  className="border-b hover:bg-gray-50"

                >

                  <td className="py-3 whitespace-nowrap">

                    <span className="font-medium text-blue-600">

                      {sale.invoiceNo}

                    </span>

                  </td>

                  <td className="py-3">

                    <p className="text-sm sm:text-base">

                      {sale.member?.fullName || "-"}

                    </p>

                  </td>

                  <td className="py-3 text-right font-semibold text-green-700 whitespace-nowrap">

                    ₹{sale.totalAmount}

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td

                  colSpan="3"

                  className="py-6 text-center text-gray-500"

                >

                  No recent sales found.

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default RecentSales;