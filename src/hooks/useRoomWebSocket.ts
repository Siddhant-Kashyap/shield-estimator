import { useEffect, useRef } from "react";

export function useRoomWebSocket({ roomCode, userName, onUserList, onRoomCreated }: {
  roomCode: string | null,
  userName: string | null,
  onUserList: (users: string[]) => void,
  onRoomCreated?: (roomCode: string) => void,
}) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomCode) return;
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onopen = () => {
      if (userName) {
        ws.send(JSON.stringify({ type: "joinRoom", roomCode, name: userName }));
      } else {
        ws.send(JSON.stringify({ type: "createRoom", roomCode }));
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "userList") {
          onUserList(data.users);
        } else if (data.type === "roomCreated" && onRoomCreated) {
          onRoomCreated(data.roomCode);
        }
      } catch {}
    };

    return () => {
      ws.close();
    };
    // Only re-run if roomCode or userName changes
  }, [roomCode, userName]);

  return wsRef;
}
