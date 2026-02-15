function PriceCard({ price, isBest }) {
  return (
    <div
      className={`border rounded-lg p-4 flex justify-between items-center
      ${isBest ? "border-green-500 bg-green-50" : "border-gray-200"}`}
    >
      <div>
        <h3 className="font-semibold text-lg">{price.platform}</h3>
        <p className="text-slate-700">₹{price.price}</p>
        {isBest && (
          <span className="text-green-600 text-sm font-medium">
            ⭐ Best Price
          </span>
        )}
      </div>

      <a
        href={price.link}
        target="_blank"
        rel="noreferrer"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Buy Now
      </a>
    </div>
  );
}

export default PriceCard;
