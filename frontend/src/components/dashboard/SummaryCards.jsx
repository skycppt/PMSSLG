import DashboardCard from "./DashboardCard";

function SummaryCards({

data,

}){

return(

<div className="grid grid-cols-1 sm:grid-cols-2:grid-cols-4 gap-2">

<DashboardCard

title="Books"

value={data.books.totalBooks}

color="bg-blue-50"

/>

<DashboardCard

title="Publications"

value={data.publications.totalPublications}

color="bg-green-50"

/>

<DashboardCard

title="Subscriptions"

value={data.subscriptions.activeSubscriptions}

color="bg-yellow-50"

/>

<DashboardCard

title="Members"
value={data.members.totalMembers}

color="bg-purple-50"

/>

<DashboardCard

title="Today's Sales"

value={`₹${data.sales.todaysSales}`}

color="bg-red-50"

/>

</div>

);

}

export default SummaryCards;