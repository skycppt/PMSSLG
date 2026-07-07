import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";

import { getAllMembers } from "../../services/memberService";
import { getAllPublications } from "../../services/publicationService";
import { createSubscription } from "../../services/subscriptionService";

function SubscriptionModal({
  onClose,
  onSubscriptionAdded,
}) {

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm();

  const [members, setMembers] = useState([]);

  const [publications, setPublications] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const memberResponse =
        await getAllMembers();

      const publicationResponse =
        await getAllPublications();

      setMembers(memberResponse);

      setPublications(
        publicationResponse
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load data"
      );

    }

  };
    const memberOptions =
    members.map((member) => ({

      value: member._id,

      label:
        `${member.memberId} • ${member.fullName} (${member.phone})`,

    }));
      const publicationOptions =
    publications.map((publication) => ({

      value: publication._id,

      label:
        `${publication.name} • ${publication.language}`,

    }));
      const selectedMemberId =
    watch("memberId");

  const selectedPublicationId =
    watch("publicationId");

  const duration =
    watch("duration");

    const selectedMember =
    useMemo(() => {

      return members.find(

        (member) =>

          member._id ===
          selectedMemberId

      );

    }, [
      selectedMemberId,
      members,
    ]);



  const selectedPublication =
    useMemo(() => {

      return publications.find(

        (publication) =>

          publication._id ===
          selectedPublicationId

      );

    }, [
      selectedPublicationId,
      publications,
    ]);

      const amount =
    useMemo(() => {

      if (
        !selectedPublication
      )
        return 0;

      switch (duration) {


        case "6 Months":

          return (
            selectedPublication.price6Months || 0
          );

        case "1 Year":

          return (
            selectedPublication.price1Year || 0
          );

        default:

          return 0;

      }

    }, [
      selectedPublication,
      duration,
    ]);

      const onSubmit = async (data) => {

        try {

          setLoading(true);

          await createSubscription(data);

          toast.success(
            "Subscription created successfully"
          );

          await onSubscriptionAdded();

          reset();

          onClose();

        } catch (error) {

          console.log(error);

          toast.error(
            error.response?.data?.message ||
            "Failed to create subscription"
          );

        } finally {

          setLoading(false);

        }

      };

      return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">

        <h2 className="text-2xl font-bold mb-8">

          New Subscription

        </h2>

        <form

          onSubmit={handleSubmit(onSubmit)}

          className="grid grid-cols-2 gap-6"

        >
          {/* ===========================
    Member
=========================== */}

<div className="col-span-2">

  <label className="block mb-2 font-medium">
    Member *
  </label>

  <Select
    options={memberOptions}
    placeholder="Search Member..."
    isSearchable
    onChange={(selected) =>
      setValue(
        "memberId",
        selected.value
      )
    }
  />

  <input
    type="hidden"
    {...register("memberId", {
      required: true,
    })}
  />

</div>


{/* ===========================
    Member Preview
=========================== */}

{selectedMember && (

<div className="col-span-2 bg-blue-50 rounded-xl p-5">

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

        Email

      </p>

      <p className="font-semibold">

        {selectedMember.email || "-"}

      </p>

    </div>

    <div className="col-span-2">

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
    Publication
=========================== */}

<div>

<label className="block mb-2 font-medium">

Publication *

</label>

<Select

options={publicationOptions}

placeholder="Select Publication"

isSearchable

onChange={(selected)=>

setValue(
"publicationId",
selected.value
)

}

/>

<input

type="hidden"

{...register("publicationId",{
required:true,
})}

/>

</div>



{/* ===========================
    Duration
=========================== */}

<div>

<label className="block mb-2 font-medium">

Duration

</label>

<select

{...register("duration",{
required:true,
})}

className="border rounded-lg p-3 w-full"

>

<option value="">

Select Duration

</option>

<option value="6 Months">

6 Months

</option>

<option value="1 Year">

1 Year

</option>

</select>

</div>
{selectedPublication && (

<div className="col-span-2 bg-green-50 rounded-xl p-5">

<h3 className="font-semibold text-lg mb-4">

Selected Publication

</h3>

<div className="grid grid-cols-2 gap-4">

<div>

<p className="text-gray-500">

Name

</p>

<p className="font-semibold">

{selectedPublication.name}

</p>

</div>

<div>

<p className="text-gray-500">

Language

</p>

<p className="font-semibold">

{selectedPublication.language}

</p>

</div>

<div>

<p className="text-gray-500">

Frequency

</p>

<p className="font-semibold">

{selectedPublication.frequency}

</p>

</div>

<div>

<p className="text-gray-500">

Price

</p>

<p className="font-semibold text-green-700 text-xl">

₹{amount}

</p>

</div>

</div>

</div>

)}


{/* ===========================
    Subscription Summary
=========================== */}

<div className="col-span-2 bg-yellow-50 rounded-xl p-5">

  <h3 className="text-lg font-semibold mb-4">

    Subscription Summary

  </h3>

  <div className="grid grid-cols-2 gap-4">

    <div>

      <p className="text-gray-500">
        Member
      </p>

      <p className="font-semibold">
        {selectedMember?.fullName || "-"}
      </p>

    </div>

    <div>

      <p className="text-gray-500">
        Publication
      </p>

      <p className="font-semibold">
        {selectedPublication?.name || "-"}
      </p>

    </div>

    <div>

      <p className="text-gray-500">
        Duration
      </p>

      <p className="font-semibold">
        {duration || "-"}
      </p>

    </div>

    <div>

      <p className="text-gray-500">
        Amount
      </p>

      <p className="text-2xl font-bold text-green-700">
        ₹{amount}
      </p>

    </div>

  </div>

</div>


{/* ===========================
    Buttons
=========================== */}

<div className="col-span-2 flex justify-end gap-4 mt-4">

  <button

    type="button"

    disabled={loading}

    onClick={onClose}

    className={`px-6 py-3 rounded-lg border transition ${
      loading
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-gray-100"
    }`}

  >

    Cancel

  </button>

  <button

    type="submit"

    disabled={loading}

    className={`px-6 py-3 rounded-lg text-white transition ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}

  >

    {loading
      ? "Creating..."
      : "Create Subscription"}

  </button>

</div>

</form>

</div>

</div>

);

}

export default SubscriptionModal;