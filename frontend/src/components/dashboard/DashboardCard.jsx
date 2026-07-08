import {
  FaBook,
  FaUsers,
  FaNewspaper,
  FaClipboardList,
  FaRupeeSign,
} from "react-icons/fa";


function DashboardCard({

title,

value,

color,

}){

  const cardConfig = {

    Books: {

      icon: <FaBook className="text-3xl text-blue-600" />,

      bg: "bg-blue-50",

    },

    Members: {

      icon: <FaUsers className="text-3xl text-purple-600" />,

      bg: "bg-purple-50",

    },

    Publications: {

      icon: <FaNewspaper className="text-3xl text-green-600" />,

      bg: "bg-green-50",

    },

    Subscriptions: {

      icon: <FaClipboardList className="text-3xl text-yellow-600" />,

      bg: "bg-yellow-50",

    },

    "Today's Sales": {

      icon: <FaRupeeSign className="text-3xl text-red-600" />,

      bg: "bg-red-50",

    },

  };


  const config = cardConfig[title];
 return (

    <div

      className={`${config.bg} rounded-xl shadow p-5 hover:shadow-lg transition duration-300 cursor-pointer`}

    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-600">

            {title}

          </p>

          <h2 className="text-3xl font-bold mt-3">

            {value}

          </h2>

        </div>

        {config.icon}

      </div>

    </div>

  );

}

export default DashboardCard;