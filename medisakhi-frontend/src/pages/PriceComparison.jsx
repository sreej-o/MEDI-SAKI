import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PriceCard from "../components/PriceCard";

function PriceComparison() {
  const { medicineName } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!medicineName) {
      setError("Medicine name missing");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/prices/compare/${medicineName}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Price data not available");
        setLoading(false);
      });
  }, [medicineName]);
  if (!medicineName) {
  return (
    <div className="p-6 text-center">
      <p className="text-red-500 font-medium">
        Please select a medicine to compare prices
      </p>
    </div>
  );
}


  if (loading) return <p className="p-6">Loading prices...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  if (!data || !data.allPrices) {
    return <p className="p-6 text-red-500">No price data found</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-2">{data.medicine}</h2>

        <p className="text-slate-600 mb-6">
          Best Price: ₹{data.bestDeal.price} on{" "}
          <span className="font-medium">{data.bestDeal.platform}</span>
        </p>

        <div className="space-y-4">
          {data.allPrices.map((price, index) => (
            <PriceCard
              key={index}
              price={price}
              isBest={price.platform === data.bestDeal.platform}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PriceComparison;