import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

function PublicationTable({
  publications,
  onEdit,
  onDelete,
}) {

  const navigate = useNavigate();


  if (publications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">

        <div className="text-6xl mb-4">
          📚
        </div>

        <h2 className="text-2xl font-semibold">
          No Publications Found
        </h2>

        <p className="text-gray-500 mt-2">
          Click "Add Publication" to create your first publication.
        </p>

      </div>
    );
  }

  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="text-left p-4">
              Name
            </th>

            <th className="text-left p-4">
              Language
            </th>

            <th className="text-left p-4">
              Frequency
            </th>

            <th className="text-left p-4">
              6 Months
            </th>

            <th className="text-left p-4">
              1 Year
            </th>
            <th className="text-left p-4">
              Active Subscriber
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

          {publications.map((publication) => (

            <tr
              key={publication._id}
              className="border-b hover:bg-gray-50"
            >

              
              <td
                  className="p-4 text-blue-600 hover:underline cursor-pointer"
                  onClick={() =>
                    navigate("/subscriptions", {
                      state: {
                        publication: publication.name,
                        language: publication.language,
                        status: "Active",
                      },
                    })
                  }
                >
                  {publication.name}
                </td>

              <td className="p-4">
                {publication.language}
              </td>

              <td className="p-4">
                {publication.frequency}
              </td>

              <td className="p-4">
                ₹{publication.price6Months}
              </td>

              <td className="p-4">
                ₹{publication.price1Year}
              </td>

              <td className="p-4 text-center font-medium">
                {publication.subscriberCount}
              </td>

              <td className="p-4">

                {publication.isActive ? (

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                    Active

                  </span>

                ) : (

                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">

                    Inactive

                  </span>

                )}

              </td>

              <td className="p-4 flex gap-4">

                <button
                  onClick={() => onEdit(publication)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <FaEdit size={18} />
                </button>

                <button
                  onClick={() => onDelete(publication._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrash size={18} />
                </button>

                {status === "Expiring Soon" && (
                  <button
                    onClick={() => onWhatsapp(sub)}
                    className="text-green-600 hover:text-green-700"
                    title="Send Renewal Reminder"
                  >
                    <FaWhatsapp />
                  </button>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default PublicationTable;