import { STEPS } from "@/lib/types";
import useImpostorGameStore from "@/stores/ImpostorGameStore";
import { Button_v1, Button_v2 } from "../commons/Button";
import { Button } from "../ui/button";
import { Separator } from "../commons/Separator";

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
      <div className="flex flex-col justify-center gap-3 w-full max-w-md mx-auto">
        <Button_v2 onClick={() => changeStep(STEPS.revealed)} size={"lg"}>
          Revelar impostor y palabra
        </Button_v2>
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

export default DiscussionStep;
