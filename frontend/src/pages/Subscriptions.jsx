import { useEffect, useMemo, useState } from "react";

import { getAllSubscriptions } from "../services/subscriptionService";

import SubscriptionTable from "../components/subscriptions/SubscriptionTable";
import SubscriptionSearch from "../components/subscriptions/SubscriptionSearch";
import SubscriptionModal from "../components/subscriptions/SubscriptionModal";
import ViewSubscriptionModal from "../components/subscriptions/ViewSubscriptionModal";
import RenewSubscriptionModal from "../components/subscriptions/RenewSubscriptionModal";
import CancelSubscriptionModal from "../components/subscriptions/CancelSubscriptionModal";


function Subscriptions() {

  const [subscriptions, setSubscriptions] = useState([]);
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [languageFilter, setLanguageFilter] = useState("All");

  const [publicationFilter, setPublicationFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [viewSubscription,setViewSubscription]= useState(null);

  const [renewSubscriptionData,setRenewSubscriptionData] = useState(null);

  const [cancelSubscriptionData, setCancelSubscriptionData]= useState(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {

    try {

      const response =
        await getAllSubscriptions();

      setSubscriptions(response);

    } catch (error) {

      console.log(error);

    }

  };

  // -----------------------
  // Statistics
  // -----------------------

  const stats = useMemo(() => {

    let active = 0;
    let expiring = 0;
    let expired = 0;
    let cancelled = 0;

    subscriptions.forEach((sub) => {

      if (sub.status === "Cancelled") {
        cancelled++;
        return;
      }

      const today = new Date();
      const end = new Date(sub.endDate);

      const monthsLeft =
        (end.getFullYear() - today.getFullYear()) * 12 +
        (end.getMonth() - today.getMonth());

      if (monthsLeft < 0) {

        expired++;

      } else if (monthsLeft <= 1) {

        expiring++;

      } else {

        active++;

      }

    });

    return {

      active,
      expiring,
      expired,
      cancelled,

    };

  }, [subscriptions]);

  // -----------------------
  // Filtered Data
  // -----------------------

  const filteredSubscriptions = subscriptions.filter((sub) => {

    const searchText = search.toLowerCase();

    const memberName =
      sub.member?.fullName?.toLowerCase() || "";

    const memberId =
      sub.member?.memberId?.toLowerCase() || "";

    const phone =
      sub.member?.phone || "";

    const publication =
      sub.publication?.name?.toLowerCase() || "";

    const language =
      sub.publication?.language || "";

    // Search

    const matchesSearch =

      memberName.includes(searchText) ||

      memberId.includes(searchText) ||

      publication.includes(searchText) ||

      phone.includes(search);

    // Language

    const matchesLanguage =

      languageFilter === "All" ||

      language === languageFilter;

    // Publication

    const matchesPublication =

      publicationFilter === "All" ||

      sub.publication?.name === publicationFilter;

    // Status

    let matchesStatus = true;

    const today = new Date();
    const end = new Date(sub.endDate);

    const monthsLeft =
      (end.getFullYear() - today.getFullYear()) * 12 +
      (end.getMonth() - today.getMonth());

    if (statusFilter === "Active")
      matchesStatus = monthsLeft > 1;

    if (statusFilter === "Expiring Soon")
      matchesStatus =
        monthsLeft >= 0 &&
        monthsLeft <= 1;

    if (statusFilter === "Expired")
      matchesStatus = monthsLeft < 0;

    if (statusFilter === "Cancelled")
      matchesStatus =
        sub.status === "Cancelled";

    return (

      matchesSearch &&

      matchesLanguage &&

      matchesPublication &&

      matchesStatus

    );

  });

  // Dropdown values

  const languages = [
    "All",
    ...new Set(
      subscriptions.map(
        (s) => s.publication?.language
      )
    ),
  ];

  const publications = [
    "All",
    ...new Set(
      subscriptions.map(
        (s) => s.publication?.name
      )
    ),
  ];

  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Subscriptions
          </h1>

          <p className="text-gray-500 mt-2">
            Manage magazine subscriptions
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          + New Subscription
        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-4 gap-5 mb-8">

        <StatCard title="Active" value={stats.active} color="green"/>

        <StatCard title="Expiring Soon" value={stats.expiring} color="yellow"/>

        <StatCard title="Expired" value={stats.expired} color="red"/>

        <StatCard title="Cancelled" value={stats.cancelled} color="gray"/>

      </div>

      <SubscriptionSearch

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

      />

      <div className="flex gap-4 mb-6">

        <select
          value={languageFilter}
          onChange={(e)=>setLanguageFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >

          {languages.map((lang)=>(
            <option
              key={lang}
              value={lang}
            >
              {lang}
            </option>
          ))}

        </select>

        <select
          value={publicationFilter}
          onChange={(e)=>setPublicationFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >

          {publications.map((pub)=>(
            <option
              key={pub}
              value={pub}
            >
              {pub}
            </option>
          ))}

        </select>

      </div>

      <div className="flex gap-3 mb-6">

        {[
          "All",
          "Active",
          "Expiring Soon",
          "Expired",
          "Cancelled",
        ].map((status)=>(

          <button

            key={status}

            onClick={()=>setStatusFilter(status)}

            className={`px-5 py-2 rounded-lg transition ${
              statusFilter===status
              ? "bg-blue-600 text-white"
              : "border hover:bg-gray-100"
            }`}

          >

            {status}

          </button>

        ))}

      </div>

      <SubscriptionTable
          subscriptions={filteredSubscriptions}

          onView={(subscription) => {
              setViewSubscription(subscription);
          }}

          onRenew={(subscription) => {
              setRenewSubscriptionData(subscription);
          }}

          onCancel={(subscription) => {
              setCancelSubscriptionData(subscription);
          }}
      />

    {showModal && (

        <SubscriptionModal
            onClose={() => setShowModal(false)}
            onSubscriptionAdded={fetchSubscriptions}
        />

    )}

    {viewSubscription && (

        <ViewSubscriptionModal
            subscription={viewSubscription}
            onClose={() =>
                setViewSubscription(null)
            }
        />

    )}
    
    {renewSubscriptionData && (

      <RenewSubscriptionModal
        subscription={renewSubscriptionData}
        onClose={() => setRenewSubscriptionData(null)}
        onRenewed={fetchSubscriptions}
      />

    )}

    {cancelSubscriptionData && (

      <CancelSubscriptionModal
        subscription={cancelSubscriptionData}
        onClose={() => setCancelSubscriptionData(null)}
        onCancelled={fetchSubscriptions}
      />

    )}
    </div>


  );

}

function StatCard({
  title,
  value,
}) {

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <p className="text-gray-500">

        {title}

      </p>

      <h2 className="text-3xl font-bold mt-2">

        {value}

      </h2>

    </div>
  );
  

  }

export default Subscriptions;