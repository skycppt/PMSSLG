function ViewSubscriptionModal({

subscription,

onClose,

}){

return(

<div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

<div className="bg-white rounded-xl shadow-xl p-8 w-[700px]">

<h2 className="text-2xl font-bold mb-8">

Subscription Details

</h2>

<div className="grid grid-cols-2 gap-6">

<div>

<p className="text-gray-500">

Member ID

</p>

<p className="font-semibold">

{subscription.member?.memberId || "-"}

</p>

</div>

<div>

<p className="text-gray-500">

Member Name

</p>

<p className="font-semibold">

{subscription.member?.fullName || "-"}

</p>

</div>

<div>

<p className="text-gray-500">

Phone

</p>

<p className="font-semibold">

{subscription.member?.phone ||'-'}

</p>

</div>

<div>

<p className="text-gray-500">

Publication

</p>

<p className="font-semibold">

{subscription.publication?.name || "-"}

</p>

</div>

<div>

<p className="text-gray-500">

Language

</p>

<p className="font-semibold">

{subscription.publication?.language ||'-'}

</p>

</div>

<div>

<p className="text-gray-500">

Frequency

</p>

<p className="font-semibold">

{subscription.publication?.frequency ||'-'}

</p>

</div>

<div>

<p className="text-gray-500">

Duration

</p>

<p className="font-semibold">

{subscription.duration||'-'}

</p>

</div>

<div>

<p className="text-gray-500">

Amount Paid

</p>

<p className="font-semibold text-green-700">

₹{subscription.amountPaid||'-'}

</p>

</div>

<div>

<p className="text-gray-500">

Start Date

</p>

<p className="font-semibold">

{new Date(

subscription.startDate

).toLocaleDateString()}

</p>

</div>

<div>

<p className="text-gray-500">

End Date

</p>

<p className="font-semibold">

{new Date(

subscription.endDate

).toLocaleDateString()}

</p>

</div>

<div className="col-span-2">

<p className="text-gray-500">

Status

</p>

<p className="font-semibold">

{subscription.status}

</p>

</div>

</div>

<div className="flex justify-end mt-8">

<button

onClick={onClose}

className="border px-6 py-3 rounded-lg hover:bg-gray-100"

>

Close

</button>

</div>

</div>

</div>

);


}

export default ViewSubscriptionModal;