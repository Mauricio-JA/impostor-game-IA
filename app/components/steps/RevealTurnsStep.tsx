import { useState } from "react";
import useImpostorGameStore from "@/stores/ImpostorGameStore";
import { GameState, STEPS } from "@/lib/types";
import { DATASETS } from "@/lib/datasets";
import { Button_v1, Button_v2, Button_v3 } from "../commons/Button";
import { Lightbulb } from "lucide-react";
import Summary from "../layout/Summary";

type Props = {
  gameState: GameState;
};
const RevealTurnsStep = ({ gameState: gs }: Props) => {
  const { changeStep, nextTurn } = useImpostorGameStore();

  const [isRevealed, setIsRevealed] = useState(false);

  function nextPlayer() {
    if (!gs) return;
    if (gs.turn + 1 >= gs.order.length) {
      changeStep(STEPS.discussion);
      setIsRevealed(false);
      return;
    }
    nextTurn();
    setIsRevealed(false);
  }
  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Turno de revelación</h2>
      <p className="text-sm opacity-80 mb-4">
        Turno {gs.turn + 1} de {gs.order.length}. Asegúrate de que solo{" "}
        <span className="font-semibold">{gs.players[gs.order[gs.turn]]}</span>{" "}
        mire la pantalla.
      </p>

      <div className="rounded-sm border bg-white p-6 shadow-inner flex flex-col items-center text-center">
        <div className="text-sm opacity-70 mb-2">Jugador actual</div>
        <div className="text-2xl font-bold mb-6">
          {gs.players[gs.order[gs.turn]]}
        </div>

        {!isRevealed ? (
          <Button_v3 onClick={() => setIsRevealed(true)} size={"lg"}>
            Mostrar mi rol
          </Button_v3>
        ) : (
          <div className="w-full max-w-md">
            <div className="mb-4 rounded-sm border p-4 bg-emerald-50">
              {gs.order[gs.turn] === gs.impostorIndex ? (
                <>
                  <div className="text-2xl font-extrabold ">
                    🤫 ¡Eres el IMPOSTOR!
                  </div>
                  <p className="mt-2 text-sm">
                    Tu objetivo es pasar desapercibido durante la discusión. No
                    conoces la palabra secreta.
                  </p>
                  {gs.enableHints &&
                    DATASETS[gs.category] &&
                    DATASETS[gs.category][gs.secretWord] && (
                      <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
                        <div className="text-sm font-medium text-amber-800 mb-1">
                          <Lightbulb className="size-4 text-yellow-500 inline-block align-text-top" />{" "}
                          Pista para el impostor:
                        </div>
                        <div className="text-sm text-amber-700">
                          {DATASETS[gs.category][gs.secretWord]}
                        </div>
                      </div>
                    )}
                </>
              ) : (
                <>
                  <div className="text-sm opacity-70">La palabra es</div>
                  <div className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">
                    {gs.secretWord}
                  </div>
                  <div className="mt-2 inline-block text-xs rounded-full bg-emerald-100 px-3 py-1">
                    Categoría: {gs.category}
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button_v1
                onClick={() => setIsRevealed(false)}
                size={"lg"}
                className="flex-auto sm:flex-1"
              >
                Ocultar
              </Button_v1>
              <Button_v2
                onClick={nextPlayer}
                size={"lg"}
                className="flex-auto sm:flex-1"
              >
                Siguiente jugador
              </Button_v2>
            </div>
          </div>
        )}
      </div>
      <Summary
        category={gs.category}
        playersCount={gs.players.length}
        enableHints={gs.enableHints}
        privateMode
        className="mt-6"
      />
    </section>
  );
};

export default RevealTurnsStep;
