import { GameState } from "@/lib/types";
import { Button_v1 } from "../commons/Button";
import { Button } from "../ui/button";
import { Separator } from "../commons/Separator";

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
      <div className="mx-auto max-w-md rounded-sm border bg-white shadow-inner p-6">
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

      <div className="mt-6 flex flex-col justify-center gap-3  w-full max-w-md mx-auto">
        <Separator label={<span className="px-2">Otra Ronda</span>} />
        <Button_v1 onClick={restartSamePlayers} size={"lg"}>
          Repetir categoria
        </Button_v1>
        <Button variant={"outline"} onClick={newGame} size={"lg"}>
          Nuevo juego
        </Button>
      </div>
    </section>
  );
};

export default RevealedStep;
