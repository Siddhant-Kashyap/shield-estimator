import { useState, useEffect } from "react";

export default function HomeLanding({ onCreate, onJoin }: { onCreate: () => void, onJoin: (room: string) => void }) {
  const [room, setRoom] = useState("");

  // Check for ?room=ROOMCODE in URL and auto-join
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRoom = params.get("room");
    if (urlRoom) {
      onJoin(urlRoom);
    }
  }, [onJoin]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-lime-100 to-teal-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center mb-2" style={{ fontFamily: 'Honk' }}>ScrumCircle</h1>
        <button
          className="w-full py-2 rounded bg-gradient-to-br from-teal-400 to-lime-400 text-white font-bold text-lg shadow hover:from-teal-500 hover:to-lime-500 transition-colors duration-200 mb-2"
          onClick={onCreate}
        >
          Create Room
        </button>
        <div className="text-center text-gray-500">or</div>
        <form onSubmit={e => { e.preventDefault(); if (room.trim()) onJoin(room.trim()); }} className="flex flex-col gap-2">
          <input
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            placeholder="Enter Room Code"
            value={room}
            onChange={e => setRoom(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 rounded bg-gradient-to-br from-lime-400 to-teal-400 text-white font-bold text-lg shadow hover:from-lime-500 hover:to-teal-500 transition-colors duration-200"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}
