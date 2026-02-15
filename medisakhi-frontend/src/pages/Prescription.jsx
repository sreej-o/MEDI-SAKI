

import { useState } from "react";
import axios from "axios";

function PrescriptionUpload() {
  const [file, setFile] = useState(null);
  const [guidance, setGuidance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    console.log("button clicked");
    if (!file) return;

    setLoading(true);
    setError("");
    setGuidance("");

    try {
      const formData = new FormData();
      formData.append("prescription", file);

      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);

      const res = await axios.post(
        "http://localhost:5000/api/prescription/analyze",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("RESPONSE:", res.data);
      setGuidance(res.data.guidance);

    } catch (err) {
      console.error(err);
      setError("Failed to analyze prescription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4 text-center">
          Upload Prescription
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-4"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-teal-600 text-white py-2 rounded-lg"
        >
          {loading ? "Analyzing..." : "Analyze Prescription"}
        </button>

        {error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}

        {guidance && (
          <div className="mt-6 bg-slate-50 border rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-lg">
              Prescription Guidance
            </h3>

            <ul className="list-disc list-inside space-y-2">
              {guidance
                .split("\n")
                .filter(Boolean)
                .map((line, index) => (
                  <li key={index}>{line.replace("•", "")}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrescriptionUpload;
