function LowStockBooks({

  books,

}) {

  return (

    <div className="bg-white rounded-xl shadow p-4 sm:p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-lg sm:text-xl font-semibold">

          Low Stock Books

        </h2>

        <span className="text-sm text-gray-500">

          {books.length} Books

        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3 text-sm font-semibold">

                Book

              </th>

              <th className="text-center py-3 text-sm font-semibold">

                Stock

              </th>

            </tr>

          </thead>

          <tbody>

            {books.length > 0 ? (

              books.map((book) => (

                <tr

                  key={book._id}

                  className="border-b hover:bg-gray-50"

                >

                  <td className="py-3 pr-4">

                    <p className="font-medium text-sm sm:text-base">

                      {book.title}

                    </p>

                  </td>

                  <td className="text-center">

                    <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">

                      {book.stockQuantity}

                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td

                  colSpan="2"

                  className="py-6 text-center text-gray-500"

                >

                  No low stock books.

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default LowStockBooks;