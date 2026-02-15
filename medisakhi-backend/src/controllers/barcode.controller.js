import axios from "axios";

export const lookupBarcode = async (req, res) => {
  try {
    const { barcode } = req.body;

    if (!barcode) {
      return res.status(400).json({ error: "Barcode is required" });
    }

    // Try OpenFDA (may fail for many Indian barcodes)
    const url = `https://api.fda.gov/drug/label.json?search=openfda.product_ndc:${barcode}&limit=1`;

    const response = await axios.get(url, { timeout: 5000 });

    if (!response.data.results || response.data.results.length === 0) {
      throw new Error("Not found");
    }

    const drug = response.data.results[0];

    res.json({
      name: drug.openfda?.brand_name?.[0] || "Unknown medicine",
      uses: drug.indications_and_usage?.[0] || "Information not available",
      dosage: drug.dosage_and_administration?.[0] || "Consult a doctor",
      warnings: drug.warnings?.[0] || "No warnings listed",
      source: "OpenFDA"
    });

  } catch (err) {
    // Fallback — VERY IMPORTANT
    res.json({
      name: "Medicine identified",
      uses: "Details not available for this barcode",
      dosage: "Please consult a pharmacist",
      warnings: "No data found",
      source: "Fallback"
    });
  }
};
