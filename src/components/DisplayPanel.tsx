import { useState, useEffect } from "react";
import FancyButton from "./FancyButton";
import LandingPage from "./LandingPage";
import HomeLanding from "./HomeLanding";
import { useRoomWebSocket } from "../hooks/useRoomWebSocket";
import useStore from "../hooks/userHooks";

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function DisplayPanel() {
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [stage, setStage] = useState<'home' | 'join' | 'room'>('home');
  const [taskCode, setTaskCode] = useState("TASK-1234");
  const [editingTask, setEditingTask] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const players = useStore((state) => state.players);
  const setPlayers = useStore((state) => state.setPlayers);
  const { setCard, revealed, revealCards } = useStore();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // WebSocket logic
  const wsRef = useRoomWebSocket({
    roomCode,
    userName,
    onUserList: (users) => {
      setPlayers(users.map((user, idx) => ({
        id: user.id,
        name: user.name,
        position: [0, 0, idx],
      })));
    },
    onRoomCreated: (code) => setRoomCode(code),
    onCard: (id, card) => setCard(id, card),
    onReveal: () => revealCards(),
    onHost: () => {},
    onUserId: (id: string) => {
      setUserId(id);
      window.localStorage.setItem('userId', id);
    },
  });

  // HomeLanding: create or join
  if (stage === 'home') {
    return <HomeLanding
      onCreate={() => {
        const code = generateRoomCode();
        setRoomCode(code);
        setStage('join');
      }}
      onJoin={code => {
        setRoomCode(code);
        setStage('join');
      }}
    />;
  }

  // LandingPage: enter name for room
  if (!userName && roomCode && stage === 'join') {
    return <LandingPage onJoin={(name) => {
      setUserName(name);
      setStage('room');
    }} roomCode={roomCode} />;
  }

  // Room: show display panel
  // Find current user id (use userId from server)
  const myId = userId;

  // Card selection handler
  const handleCardSelect = (card: any) => {
    if (!myId) return;
    setCard(myId, card);
    if (wsRef.current) {
      wsRef.current.send(
        JSON.stringify({ type: "cardSelected", roomCode, userId: myId, card })
      );
    }
  };

  // Reveal handler (anyone can reveal)
  const handleReveal = () => {
    revealCards();
    if (wsRef.current) {
      wsRef.current.send(
        JSON.stringify({ type: "revealCards", roomCode })
      );
    }
  };

  return (
    <div
      className={`flex-[2] border border-gray-400 p-2 sm:p-4 ml-0 sm:ml-4 flex flex-col justify-between rounded-md shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      style={{ position: 'relative' }}
    >
      {/* Floating Toggle Button */}
      <button
        onClick={() => setDarkMode((d) => !d)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center border border-gray-400 bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
        style={{ fontSize: 28 }}
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          // Moon icon for dark mode
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-gray-800">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          </svg>
        ) : (
          // Sun icon for light mode
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-yellow-500">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </button>
      <div className="flex justify-between items-center mb-2">
        <div style={{ fontFamily: 'Honk' }} className="text-lg sm:text-3xl font-bold text-center border border-gray-400 p-2 sm:p-4 mb-4 sm:mb-6 rounded flex-1">
          {editingTask ? (
            <input
              className="bg-transparent border-b border-gray-400 outline-none text-center w-32 sm:w-48 text-lg sm:text-3xl font-bold"
              value={taskCode}
              onChange={e => setTaskCode(e.target.value)}
              onBlur={() => setEditingTask(false)}
              onKeyDown={e => { if (e.key === 'Enter') setEditingTask(false); }}
              autoFocus
              style={{ fontFamily: 'Honk' }}
            />
          ) : (
            <span onClick={() => setEditingTask(true)} className="cursor-pointer select-text">{taskCode}</span>
          )}
        </div>
      </div>
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-2 sm:gap-4 text-center`}>
        {players.map((player, i) => {
          let status = null;
          if (revealed) {
            status = player.card !== undefined ? (
              <span className="text-green-700 font-bold">{player.card}</span>
            ) : (
              <span className="text-gray-400 font-bold">-</span>
            );
          } else {
            if (player.card !== undefined) {
              if (player.id === myId) {
                status = <span className="text-blue-700 font-bold">{player.card}</span>;
              } else {
                status = <span className="text-gray-400 font-bold">?</span>;
              }
            } else {
              status = <span className="text-red-500 font-bold">✗</span>;
            }
          }
          return (
            <div key={i} className="border border-gray-400 p-1 sm:p-2 rounded text-xs sm:text-base flex flex-col items-center" style={{ fontFamily: 'Revalia' }}>
              <span>{player.name ? player.name : <span className="text-gray-400">Empty</span>}</span>
              {status}
            </div>
          );
        })}
        {Array.from({ length: 12 - players.length }).map((_, i) => (
          <div key={players.length + i} className="border border-gray-400 p-1 sm:p-2 rounded text-xs sm:text-base" style={{ fontFamily: 'Revalia' }}>
            <span className="text-gray-400">Empty</span>
          </div>
        ))}
      </div>
      {/* Card selection UI for user */}
      <div className="flex justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 flex-col items-center">
        <div className="flex justify-center gap-2 sm:gap-4 mb-2 sm:mb-4">
          {[1, 2, 3, 4].map((label, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded font-bold shadow border ${players.find(p => p.id === myId)?.card === label ? 'bg-lime-400 text-white' : 'bg-gray-200 text-black hover:bg-lime-200'}`}
              onClick={() => handleCardSelect(label)}
              disabled={revealed}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-2 sm:gap-4">
          {[5, 8, '∞', '☕'].map((label, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded font-bold shadow border ${players.find(p => p.id === myId)?.card === label ? 'bg-lime-400 text-white' : 'bg-gray-200 text-black hover:bg-lime-200'}`}
              onClick={() => handleCardSelect(label)}
              disabled={revealed}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {/* Reveal button for all users */}
      {!revealed && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 rounded bg-gradient-to-br from-orange-400 to-red-400 text-white font-bold shadow hover:from-orange-500 hover:to-red-500 transition-colors duration-200"
            onClick={handleReveal}
          >
            Reveal Cards
          </button>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 rounded bg-gradient-to-br from-lime-400 to-teal-400 text-white font-bold shadow hover:from-lime-500 hover:to-teal-500 transition-colors duration-200"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href.split('?')[0] + `?room=${roomCode}`);
          }}
        >
          Copy Invite Link
        </button>
      </div>
    </div>
  );
}