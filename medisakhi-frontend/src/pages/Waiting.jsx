import { useParams } from "react-router-dom";
import { Video, Clock, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

function Waiting() {
  const { id } = useParams();
  const [showCall, setShowCall] = useState(false);

  // Unique room per consultation
  const roomName = `MediSakhi-${id}`;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg text-center space-y-6">

        {/* STATUS ICON */}
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-slate-800">
          Consultation Confirmed
        </h2>

        <p className="text-sm text-gray-500">
          Consultation ID
        </p>
        <p className="font-mono text-sm text-slate-700">
          {id}
        </p>

        {/* STATUS */}
        <div className="flex items-center justify-center gap-2 text-green-600">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">
            Doctor will join you shortly
          </span>
        </div>

        {/* ACTIONS */}
        {!showCall ? (
          <button
            onClick={() => setShowCall(true)}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 flex items-center justify-center gap-2"
          >
            <Video className="h-5 w-5" />
            Join Video Consultation
          </button>
        ) : (
          <div className="rounded-xl overflow-hidden border mt-4">
            <iframe
              src={`https://meet.jit.si/${roomName}`}
              allow="camera; microphone; fullscreen; display-capture"
              className="w-full h-80"
              title="MediSakhi Video Call"
            />
          </div>
        )}

        {/* INFO */}
        <p className="text-xs text-gray-400">
          Secure video consultation powered by Jitsi
        </p>
      </div>
    </div>
  );
}

export default Waiting;