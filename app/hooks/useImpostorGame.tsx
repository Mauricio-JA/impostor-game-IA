import useImpostorGameStore from "../stores/ImpostorGameStore";
import { randomChoice, shuffle } from "../lib/functions";

import { GameState, STEPS } from "../lib/types";

export type StartPreparationParams = {
  players: string[];
  category: string;
  enableHints: boolean;
  activeWordList: string[];
};

const useImpostorGame = () => {
  const { updateGameState, changeStep, data } = useImpostorGameStore();

  const startPreparation = ({
    players,
    category,
    enableHints,
    activeWordList,
  }: StartPreparationParams) => {
    if (players.length < 3) {
      alert("Necesitas al menos 3 participantes.");
      return;
    }
    if (
      activeWordList.length === 0 ||
      activeWordList[0] === "(agrega palabras arriba)"
    ) {
      alert(
        "Agrega palabras en la lista personalizada o elige otra categoría."
      );
      return;
    }
    const impostorIndex = Math.floor(Math.random() * players.length);
    const secretWord = randomChoice(activeWordList);
    const order = shuffle(players.map((_, i) => i));
    const newGs: GameState = {
      players: [...players],
      order,
      impostorIndex,
      secretWord,
      category: category,
      turn: 0,
      enableHints,
      selectedWords: activeWordList,
    };
    updateGameState(newGs);
    changeStep(STEPS.reveal_turns);
  };

  const restartSamePlayers = () => {
    if (!data) {
      changeStep(STEPS.setup);
      return;
    }
    const basePlayers = data.players;
    const impostorIndex = Math.floor(Math.random() * basePlayers.length);
    const secretWord = randomChoice(data.selectedWords);
    const order = shuffle(basePlayers.map((_, i) => i));
    const newGs: GameState = {
      players: [...basePlayers],
      order,
      impostorIndex,
      secretWord,
      category: data.category,
      turn: 0,
      enableHints: data.enableHints,
      selectedWords: data.selectedWords,
    };
    updateGameState(newGs);
    changeStep(STEPS.reveal_turns);
  };

  const newGame = () => {
    changeStep(STEPS.setup);
    updateGameState(null);
  };

  return {
    startPreparation,
    restartSamePlayers,
    newGame,
  };
};

export default useImpostorGame;
