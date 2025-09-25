import { create } from "zustand";

type Store = {
  players: string[];
  addPlayer: (name: string) => void;
  removePlayer: (idx: number) => void;
  loadPlayers: (players: string[]) => void;
};

const usePlayersStore = create<Store>()((set) => ({
  players: [],
  addPlayer: (name: string) =>
    set((state) => ({ players: [...state.players, name] })),
  removePlayer: (idx: number) =>
    set((state) => ({ players: state.players.filter((_, i) => i !== idx) })),
  loadPlayers: (players: string[]) => set({ players }),
}));

export default usePlayersStore;
