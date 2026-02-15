import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ChatbotPage() {
  const location = useLocation(); // ✅ MUST be here (top-level)

  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Auto-fill prompt when coming from medicine page
  useEffect(() => {
    if (location.state?.medicineId && location.state?.medicineName) {
      setInput( 
        `Tell me about ${location.state.medicineName}.
Include uses, dosage, side effects, and precautions.`
      );
    }
  }, [location.state]);

  const askAI = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setReply("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/chat",
        {
          message: input,
          medicineId: location.state?.medicineId || null,
        }
      );

      setReply(res.data.reply);
    } catch (error) {
      console.error(error);
      setReply("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          MediGPT 🤖
        </h2>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about medicines, hospitals, dosage, side effects..."
          className="w-full h-32 p-4 border rounded-lg"
        />

        <button
          onClick={askAI}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Thinking..." : "Ask MediGPT"}
        </button>

        {reply && (
          <div className="mt-6 bg-slate-100 p-6 rounded-lg prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {reply}
            </ReactMarkdown>
          </div>
        )}

        <p className="mt-4 text-xs text-red-500">
          ⚠️ This is general medical information. Always consult a doctor.
        </p>

      </div>
    </div>
  );
}

export default ChatbotPage;
