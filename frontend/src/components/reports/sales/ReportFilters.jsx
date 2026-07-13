function ReportFilters({

  filters,

  setFilters,

  onGenerate,

}) {

  return (

    <div className="bg-white rounded-xl shadow p-6 mb-8">

      <div className="grid grid-cols-4 gap-5">

        <div>

          <label className="block mb-2">

            From

          </label>

          <input

            type="date"

            value={filters.from}

            onChange={(e)=>

              setFilters({

                ...filters,

                from:e.target.value,

              })

            }

            className="border rounded-lg w-full p-3"

          />

        </div>

        <div>

          <label className="block mb-2">

            To

          </label>

          <input

            type="date"

            value={filters.to}

            onChange={(e)=>

              setFilters({

                ...filters,

                to:e.target.value,

              })

            }

            className="border rounded-lg w-full p-3"

          />

        </div>

        <div>

          <label className="block mb-2">

            Payment

          </label>

          <select

            value={filters.paymentMethod}

            onChange={(e)=>

              setFilters({

                ...filters,

                paymentMethod:e.target.value,

              })

            }

            className="border rounded-lg w-full p-3"

          >

            <option>All</option>

            <option>Cash</option>

            <option>UPI</option>

            {/* <option>Card</option>

            <option>Bank Transfer</option> */}

          </select>

        </div>

        <div>

          <label className="block mb-2">

            Status

          </label>

          <select

            value={filters.paymentStatus}

            onChange={(e)=>

              setFilters({

                ...filters,

                paymentStatus:e.target.value,

              })

            }

            className="border rounded-lg w-full p-3"

          >

            <option>All</option>

            <option>Paid</option>

            <option>Pending</option>

            <option>Cancelled</option>

          </select>

        </div>

      </div>

      <button

        onClick={onGenerate}

        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"

      >

        Generate Report

      </button>

    </div>

  );

}

export default ReportFilters;