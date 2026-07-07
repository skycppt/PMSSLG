import { useEffect, useState } from "react";

import {
  getAllMembers,
} from "../services/memberService";

import MemberTable from "../components/members/MemberTable";
import MemberSearch from "../components/members/MemberSearch";
import MemberModal from "../components/members/MemberModal";
import DeleteMemberModal from "../components/members/DeleteMemberModal";

function Members() {

  const [members, setMembers] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingMember, setEditingMember] =
    useState(null);

  const [deleteMemberId, setDeleteMemberId] =
    useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {

    try {

      const response =
        await getAllMembers();

      setMembers(response);

    } catch (error) {

      console.log(error);

    }

  };

  const filteredMembers = members.filter((member) => {

  const searchText = search.toLowerCase();

        return (

          member.fullName
            ?.toLowerCase()
            .includes(searchText) ||

          member.memberId
            ?.toLowerCase()
            .includes(searchText) ||

          member.phone
            ?.includes(search) ||

          member.email
            ?.toLowerCase()
            .includes(searchText) ||

          member.address
            ?.toLowerCase()
            .includes(searchText)

        );

      });

  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Members
        </h1>

        <button
          onClick={() => {

            setEditingMember(null);

            setShowModal(true);

          }}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          + Add Member
        </button>

      </div>

      <MemberSearch
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <MemberTable

        members={filteredMembers}

        onEdit={(member) => {

          setEditingMember(member);

          setShowModal(true);

        }}

        onDelete={(id) => {

          setDeleteMemberId(id);

        }}

      />

      {showModal && (

        <MemberModal

          member={editingMember}

          onClose={() => {

            setShowModal(false);

            setEditingMember(null);

          }}

          onMemberAdded={fetchMembers}

        />

      )}

      {deleteMemberId && (

        <DeleteMemberModal

          memberId={deleteMemberId}

          onClose={() =>
            setDeleteMemberId(null)
          }

          onDeleted={fetchMembers}

        />

      )}

    </div>

  );

}

export default Members;