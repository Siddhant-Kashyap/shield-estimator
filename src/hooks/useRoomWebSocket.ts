import { useEffect, useRef } from "react";

export function useRoomWebSocket({ roomCode, userName, onUserList, onRoomCreated, onCard, onReveal, onReset, onHost, onUserId }: {
  roomCode: string | null,
  userName: string | null,
  onUserList: (users: {id: string, name: string}[]) => void,
  onRoomCreated?: (roomCode: string) => void,
  onCard?: (id: string, card: any) => void,
  onReveal?: () => void,
  onReset?: () => void,
  onHost?: (hostId: string) => void,
  onUserId?: (userId: string) => void,
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
        } else if (data.type === "cardSelected" && onCard) {
          onCard(data.userId, data.card);
        } else if (data.type === "revealCards" && onReveal) {
          onReveal();
        } else if (data.type === "resetCards" && onReset) {
          onReset();
        } else if (data.type === "host" && onHost) {
          onHost(data.hostId);
        } else if (data.type === "userId" && onUserId) {
          onUserId(data.userId);
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
