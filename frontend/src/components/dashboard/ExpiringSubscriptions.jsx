function ExpiringSubscriptions({

subscriptions,

}){

return(

<div className="bg-white rounded-xl shadow p-6">

<h2 className="text-xl font-semibold mb-5">

Expiring Subscriptions

</h2>

<table className="w-full">

<thead>

<tr>

<th>

Member

</th>

<th>

Publication

</th>

<th>

End Date

</th>

</tr>

</thead>

<tbody>

{subscriptions.map(sub=>(

<tr
key={sub._id}
className="border-b"
>

<td>

{sub.member.fullName}

</td>

<td>

{sub.publication.name}

</td>

<td>

{

new Date(

sub.endDate

).toLocaleDateString()

}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default ExpiringSubscriptions;