import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

function BarcodeScanner() {
  const scannerRef = useRef(null);
  const stoppedRef = useRef(false);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    const start = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          async (decodedText) => {
            if (stoppedRef.current) return;
            stoppedRef.current = true;

            try {
              setLoading(true);
              await scanner.stop();

              const res = await fetch(
                "http://localhost:5000/api/barcode/lookup",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ barcode: decodedText })
                }
              );

              const data = await res.json();
              setResult(data);
            } catch {
              setError("Server error");
            } finally {
              setLoading(false);
            }
          }
        );
      } catch {
        setError("Camera access denied");
      }
    };

    start();

    return () => {
      if (scannerRef.current && !stoppedRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">
          Scan Medicine Barcode
        </h2>

        {!result && <div id="reader" className="mx-auto w-[280px]" />}

        {loading && <p className="text-center mt-4">Fetching details...</p>}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {result && (
          <div className="mt-6 bg-slate-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">{result.name}</h3>
            <p><b>Uses:</b> {result.uses}</p>
            <p><b>Dosage:</b> {result.dosage}</p>
            <p><b>Warnings:</b> {result.warnings}</p>
            <p className="text-xs text-slate-500 mt-2">
              Source: {result.source}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BarcodeScanner;
