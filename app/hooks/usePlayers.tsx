import { useEffect } from "react";
import usePlayersStore from "../stores/PlayersStore";

const usePlayers = () => {
  const {
    players,
    addPlayer: newPlayer,
    removePlayer,
    loadPlayers,
  } = usePlayersStore();

  const addPlayer = (name: string) => {
    if (!name) return;
    if (players.some((p) => p.toLowerCase() === name.toLowerCase())) {
      alert("Ese nombre ya está en la lista.");
      return;
    }
    newPlayer(name);
  };

  // Persistencia simple de jugadores en localStorage
  useEffect(() => {
    const stored = localStorage.getItem("impostor_players");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) loadPlayers(parsed);
      } catch {}
    }
  }, [loadPlayers]);
  useEffect(() => {
    localStorage.setItem("impostor_players", JSON.stringify(players));
  }, [players]);

  return {
    players,
    addPlayer,
    removePlayer,
  };
};

export default usePlayers;
