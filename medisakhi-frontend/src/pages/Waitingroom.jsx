function WaitingRoom() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-2">
        Doctor will join you shortly
      </h1>
      <p className="text-gray-600">
        Please keep your camera and mic ready 🎥🎙️
      </p>
    </div>
  );
}

export default WaitingRoom;
