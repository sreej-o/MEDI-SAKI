import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { QRCodeCanvas } from "qrcode.react";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [showUPI, setShowUPI] = useState(false);
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  const amount = 120;
  const upiId = "sreejareddi@ybl";
  const upiName = "MediSakhi";

  const upiURL = `upi://pay?pa=${upiId}&pn=${upiName}&am=${amount}&cu=INR`;

  const confirmPayment = async () => {
    setLoading(true);

    // simulate verification delay
    setTimeout(async () => {
      await axios.put(
        `http://localhost:5000/api/consultations/${id}/pay`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPaid(true);
      setLoading(false);

      setTimeout(() => {
        navigate(`/waiting/${id}`);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl shadow p-8 w-96 text-center">
        <h2 className="text-xl font-semibold mb-2">Payment Gateway</h2>
        <p className="text-gray-500 mb-4">Amount to Pay</p>

        <p className="text-3xl font-bold text-teal-600 mb-6">₹{amount}</p>

        <button
          onClick={() => setShowUPI(true)}
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700"
        >
          Pay via UPI
        </button>
      </div>

      {/* UPI MODAL */}
      {showUPI && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 text-center relative">

            {/* CLOSE */}
            <button
              onClick={() => setShowUPI(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {!paid ? (
              <>
                <h3 className="text-lg font-semibold mb-1">
                  Scan & Pay
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Pay to MediSakhi
                </p>

                {/* REAL QR CODE */}
                <div className="flex justify-center mb-4">
                  <QRCodeCanvas
                    value={upiURL}
                    size={180}
                    level="H"
                    
                  />
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  UPI ID
                </p>
                <p className="font-medium mb-4">
                  {upiId}
                </p>

                <button
                  onClick={confirmPayment}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "I've Paid"}
                </button>
              </>
            ) : (
              <>
                {/* SUCCESS */}
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-3xl">✓</span>
                  </div>

                  <h3 className="text-lg font-semibold">
                    Payment Successful
                  </h3>

                  <p className="text-sm text-gray-500">
                    Redirecting to consultation…
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;