import { create } from "zustand";
import { GameState, Step, STEPS } from "../lib/types";

type Store = {
  data: GameState | null;
  step: Step;
  clear: () => void;
  nextTurn: () => void;
  updateGameState: (data: GameState | null) => void;
  changeStep: (step: Step) => void;
};

const useImpostorGameStore = create<Store>()((set) => ({
  data: null,
  step: STEPS.setup,
  clear: () => set({ data: null }),
  nextTurn: () =>
    set(({ data }) => ({ data: { ...data!, turn: data!.turn + 1 } })),
  updateGameState: (data: GameState | null) => set({ data }),
  changeStep: (step: Step) => set({ step }),
}));

export default useImpostorGameStore;
