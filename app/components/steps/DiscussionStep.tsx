import useImpostorGameStore from "@/app/stores/ImpostorGameStore";
import React from "react";

type Props = {
  restartSamePlayers: () => void;
  newGame: () => void;
};

const DiscussionStep = ({ restartSamePlayers, newGame }: Props) => {
  const { changeStep } = useImpostorGameStore();
  return (
    <section className="text-center">
      <h2 className="text-xl font-semibold mb-2">
        ¡A debatir en la vida real! 🗣️
      </h2>
      <p className="opacity-80 mb-6">
        Todos han visto su rol. Comiencen a dar pistas, hacer preguntas y
        acusar. Cuando estén listos, revelen el resultado.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={() => changeStep("revealed")}
          className="rounded-2xl px-6 py-3 font-semibold bg-rose-600 text-white hover:bg-rose-700 shadow"
        >
          Revelar impostor y palabra
        </button>
        <button
          onClick={restartSamePlayers}
          className="rounded-2xl px-6 py-3 font-semibold border hover:bg-gray-50"
        >
          Reiniciar (mismos jugadores)
        </button>
        <button
          onClick={newGame}
          className="rounded-2xl px-6 py-3 font-semibold border hover:bg-gray-50"
        >
          Nuevo juego (nuevos jugadores)
        </button>
      </div>
    </section>
  );
};

export default DiscussionStep;
