import { create } from 'zustand'

interface Player {
  id: string
  name: string
  card?: number | string
  position: [number, number, number]
}

interface StoreState {
  players: Player[]
  hostId: string | null
  revealed: boolean
  setPlayers: (players: Player[]) => void
  revealCards: () => void
  setCard: (id: string, card: number | string) => void
}

const useStore = create<StoreState>((set) => ({
  players: [],
  hostId: null,
  revealed: false,
  setPlayers: (players) => set({ players }),
  revealCards: () => set({ revealed: true }),
  setCard: (id, card) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === id ? { ...p, card } : p
      ),
    })),
}))

export default useStore