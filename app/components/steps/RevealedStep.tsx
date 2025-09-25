import { GameState } from "@/app/lib/types";

type Props = {
  restartSamePlayers: () => void;
  newGame: () => void;
  gameState: GameState;
};

const RevealedStep = ({
  restartSamePlayers,
  newGame,
  gameState: gs,
}: Props) => {
  return (
    <section className="text-center">
      <h2 className="text-xl font-semibold mb-4">Resultado de la ronda</h2>
      <div className="mx-auto max-w-md rounded-3xl border bg-white shadow-inner p-6">
        <div className="text-sm opacity-70">El impostor era</div>
        <div className="text-3xl md:text-4xl font-extrabold mt-1">
          {gs.players[gs.impostorIndex]}
        </div>
        <div className="mt-5">
          <div className="text-sm opacity-70">La palabra secreta fue</div>
          <div className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">
            {gs.secretWord}
          </div>
          <div className="mt-2 inline-block text-xs rounded-full bg-emerald-100 px-3 py-1">
            Categoría: {gs.category}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={restartSamePlayers}
          className="rounded-2xl px-6 py-3 font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Otra ronda (mismos jugadores)
        </button>
        <button
          onClick={newGame}
          className="rounded-2xl px-6 py-3 font-semibold border hover:bg-gray-50"
        >
          Nuevo juego
        </button>
      </div>
    </section>
  );
};

export default RevealedStep;
