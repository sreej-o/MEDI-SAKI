export const comparePrices = async (req, res) => {
  const { medicine } = req.params;

  // Mock price sources (later replace with API / scraping)
  const prices = [
    {
      platform: "Netmeds",
      price: 25,
      link: "https://www.netmeds.com",
    },
    {
      platform: "PharmEasy",
      price: 28,
      link: "https://pharmeasy.in",
    },
    {
      platform: "Tata 1mg",
      price: 30,
      link: "https://www.1mg.com",
    },
  ];

  if (!prices.length) {
    return res.status(404).json({ message: "No price data found" });
  }

  // Find best deal
  const bestDeal = prices.reduce((min, curr) =>
    curr.price < min.price ? curr : min
  );

  res.json({
    medicine: `${medicine} 500 mg`,
    salt: medicine,
    bestDeal,
    allPrices: prices, // ✅ THIS WAS MISSING
  });
};