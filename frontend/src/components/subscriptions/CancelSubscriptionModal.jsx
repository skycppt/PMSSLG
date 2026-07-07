import toast from "react-hot-toast";

import {
cancelSubscription,
}
from "../../services/subscriptionService";

function CancelSubscriptionModal({

subscription,

onClose,

onCancelled,

}){

const handleCancel=async()=>{

try{

await cancelSubscription(
subscription._id
);

toast.success(
"Subscription Cancelled"
);

await onCancelled();

onClose();

}

catch(error){

toast.error(
error.response?.data?.message ||
"Failed"
);

}

};

return(

<div className="fixed inset-0 bg-black/40 flex justify-center items-center">

<div className="bg-white rounded-xl p-8 w-[450px]">

<h2 className="text-xl font-bold mb-4">

Cancel Subscription

</h2>

<p className="mb-6">

Are you sure you want to cancel

<strong>

{" "}
{subscription.publication?.name}

</strong>

?

</p>

<div className="flex justify-end gap-3">

<button

onClick={onClose}

className="border px-5 py-2 rounded-lg"

>

No

</button>

<button

onClick={handleCancel}

className="bg-red-600 text-white px-5 py-2 rounded-lg"

>

Yes, Cancel

</button>

</div>

</div>

</div>

);

}

export default CancelSubscriptionModal;