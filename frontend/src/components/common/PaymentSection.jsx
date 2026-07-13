function PaymentSection({
  amount,

  paymentMethod,
  setPaymentMethod,

  paymentVerified,
  setPaymentVerified,

  upiTransactionId,
  setUpiTransactionId,

  cardReference,
  setCardReference,
}) {
  return (
    <>
      {/* ===========================
          Payment Method
      =========================== */}

      <div className="mt-6">
        <label className="block mb-2 font-medium">
          Payment Method
        </label>

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
          className="border rounded-lg p-3 w-full"
        >
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          {/* <option value="Card">Card</option> */}
        </select>
      </div>

      {/* ===========================
          UPI Payment
      =========================== */}

      {paymentMethod === "UPI" && (
        <div className="mt-8 border rounded-xl p-6 bg-blue-50">

          <h3 className="text-xl font-semibold text-center">
            Scan & Pay
          </h3>

          <img
            src="/Gpay.jpeg"
            alt="UPI QR"
            className="w-72 mx-auto mt-4 rounded-lg border"
          />

          <p className="text-center mt-4 text-gray-600">
            Amount to Pay
          </p>

          <p className="text-3xl font-bold text-center text-green-700">
            ₹{amount}
          </p>

          <input
            type="text"
            placeholder="Enter UPI Transaction ID (UTR)"
            value={upiTransactionId}
            onChange={(e) =>
              setUpiTransactionId(e.target.value)
            }
            className="border rounded-lg w-full p-3 mt-6"
          />

          <label className="flex items-center gap-3 mt-5">

            <input
              type="checkbox"
              checked={paymentVerified}
              onChange={(e) =>
                setPaymentVerified(
                  e.target.checked
                )
              }
            />

            <span>
              I have verified the payment.
            </span>

          </label>

        </div>
      )}

      {/* ===========================
          Card Payment
      =========================== */}

      {paymentMethod === "Card" && (
        <div className="mt-8 border rounded-xl p-6 bg-gray-50">

          <h3 className="text-xl font-semibold mb-4">
            Card Payment
          </h3>

          <p className="text-gray-600 mb-3">
            Amount
          </p>

          <p className="text-3xl font-bold text-green-700 mb-5">
            ₹{amount}
          </p>

          <input
            type="text"
            placeholder="Enter Card Reference"
            value={cardReference}
            onChange={(e) =>
              setCardReference(e.target.value)
            }
            className="border rounded-lg w-full p-3"
          />

        </div>
      )}
    </>
  );
}

export default PaymentSection;