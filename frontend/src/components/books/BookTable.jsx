import { FaEdit, FaTrash } from "react-icons/fa";

function BookTable({
  books,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="text-left p-4">
              Title
            </th>

            <th className="text-left p-4">
              Author
            </th>
            <th className="text-left p-4">
              Type
            </th>
            <th className="text-left p-4">
              Language
            </th>

            <th className="text-left p-4">
              Price
            </th>

            <th className="text-left p-4">
              Stock
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {books.map((book) => (

            <tr
              key={book._id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-4">
                {book.title}
              </td>

              <td className="p-4">
                {book.author}
              </td>

              <td className="p-4">
                {book.genre}
              </td>

              <td className="p-4">
                {book.language}
              </td>

              <td className="p-4">
                ₹{book.sellingPrice}
              </td>

              <td className="p-4">
                {book.stockQuantity}
              </td>

              <td className="p-4">

                {book.stockQuantity < 5 ? (

                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">

                    Low Stock

                  </span>

                ) : (

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                    Available

                  </span>

                )}

              </td>

              <td className="p-4 flex gap-4">

                <button
                  onClick={() => onEdit(book)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <FaEdit size={18} />
                </button>

                <button
                  onClick={() => onDelete(book._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrash size={18} />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default BookTable;