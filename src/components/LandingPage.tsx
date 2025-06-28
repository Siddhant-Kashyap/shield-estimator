import { useState } from "react";

export default function LandingPage({ onJoin, roomCode }: { onJoin: (name: string) => void, roomCode?: string }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState(roomCode || "");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setError("");
    onJoin(name.trim());
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-lime-100 to-teal-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center mb-2" style={{ fontFamily: 'Honk' }}>Join Room</h1>
        <input
          className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ fontFamily: 'Revalia' }}
        />
        {roomCode && (
          <input
            className="border border-gray-400 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            value={roomCode}
            disabled
            style={{ fontFamily: 'Revalia' }}
          />
        )}
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 rounded bg-gradient-to-br from-teal-400 to-lime-400 text-white font-bold text-lg shadow hover:from-teal-500 hover:to-lime-500 transition-colors duration-200"
        >
          Join Room
        </button>
      </form>
    </div>
  );
}
