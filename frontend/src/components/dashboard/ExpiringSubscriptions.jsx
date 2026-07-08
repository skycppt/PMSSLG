function ExpiringSubscriptions({

  subscriptions,

}) {

  return (

    <div className="bg-white rounded-xl shadow p-4 sm:p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-lg sm:text-xl font-semibold">

          Expiring Subscriptions

        </h2>

        <span className="text-sm text-gray-500">

          {subscriptions.length} Records

        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3 text-sm font-semibold">

                Member

              </th>

              <th className="text-left py-3 text-sm font-semibold">

                Publication

              </th>

              <th className="text-right py-3 text-sm font-semibold">

                End Date

              </th>

            </tr>

          </thead>

          <tbody>

            {subscriptions.length > 0 ? (

              subscriptions.map((sub) => (

                <tr

                  key={sub._id}

                  className="border-b hover:bg-gray-50"

                >

                  <td className="py-3">

                    <p className="font-medium text-sm sm:text-base">

                      {sub.member.fullName}

                    </p>

                  </td>

                  <td className="py-3">

                    <p className="text-sm sm:text-base">

                      {sub.publication.name}

                    </p>

                  </td>

                  <td className="py-3 text-right whitespace-nowrap">

                    <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">

                      {new Date(
                        sub.endDate
                      ).toLocaleDateString()}

                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="3"
                  className="py-6 text-center text-gray-500"
                >

                  No subscriptions are expiring soon.

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ExpiringSubscriptions;