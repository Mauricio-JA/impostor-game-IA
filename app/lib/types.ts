export type Phase = "setup" | "reveal_turns" | "discussion" | "revealed";

export interface GameState {
  players: string[];
  order: number[]; // índices de players en orden de revelación
  impostorIndex: number; // índice en players
  secretWord: string; // palabra sorteada
  category: string; // categoría elegida
  turn: number; // índice en order
  enableHints: boolean; // si se muestran pistas al impostor
}
