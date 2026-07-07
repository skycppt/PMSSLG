import { FaEdit, FaTrash } from "react-icons/fa";

function MemberTable({
  members,
  onEdit,
  onDelete,
}) {

  if (members.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">

        <div className="text-6xl mb-4">
          👥
        </div>

        <h2 className="text-2xl font-semibold">
          No Members Found
        </h2>

        <p className="text-gray-500 mt-2">
          Add your first member.
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
              S.No.
            </th>
            <th className="text-left p-4">
              Member ID
            </th>

            <th className="text-left p-4">
              Name
            </th>

            <th className="text-left p-4">
              Phone
            </th>

            <th className="text-left p-4">
              Email
            </th>
            <th className="text-left p-4">
              Address
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

          {members.map((member, index) => (

            <tr
              key={member._id}
              className="border-b hover:bg-gray-50"
            >


              <td className="p-4 font-medium">
                {index + 1}
              </td>
              <td className="p-4">
                {member.memberId}
              </td>

              <td className="p-4">
                {member.fullName}
              </td>

              <td className="p-4">
                {member.phone}
              </td>

              <td className="p-4">
                {member.email || "-"}
              </td>
              <td className="p-4">
                {member.address || "-"}
              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    member.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {member.status}
                </span>

              </td>

              <td className="p-4 flex gap-4">

                <button
                  onClick={() => onEdit(member)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => onDelete(member._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default MemberTable;