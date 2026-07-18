import DashboardCard from "./DashboardCard";

function SummaryCards({

data,

}){

return(

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">

<DashboardCard

title="Products"

value={data.books.totalBooks}

color="bg-blue-50"

route="/books"

/>

<DashboardCard

title="Publications"

value={data.publications.totalPublications}

color="bg-green-50"

route="/publications"

/>


<DashboardCard

title="Subscriptions"

value={data.subscriptions.activeSubscriptions}

color="bg-yellow-50"

route="/subscriptions"

/>

<DashboardCard

title="Members"
value={data.members.totalMembers}

color="bg-purple-50"

 route="/members"

/>

<DashboardCard

title="Today's Sales"

value={`₹${data.sales.todaysSales}`}

color="bg-red-50"

route="/sales?filter=today"

/>

</div>

);

}

export default SummaryCards;