import { useMemo, useState } from "react";
import { DATASETS } from "../../lib/datasets";
import usePlayers from "../../hooks/usePlayers";
import { StartPreparationParams } from "../../hooks/useImpostorGame";
import { Input, InputBlock, Select, TextArea } from "../commons/Input";
import { Button_v1 } from "@/components/commons/Button";
import { Separator } from "@/components/commons/Separator";
import { Button } from "../ui/button";
import { Lightbulb, X } from "lucide-react";
import { EyeCatchingButton_v2 } from "../commons/EyeCatchingButton";
import { Checkbox } from "../ui/checkbox";
import Summary from "../layout/Summary";

type Props = {
  startPreparation: (params: StartPreparationParams) => void;
};

const SetupPhase = ({ startPreparation }: Props) => {
  const { players, addPlayer, removePlayer } = usePlayers();
  const [nameInput, setNameInput] = useState("");
  const [enableHints, setEnableHints] = useState<boolean>(false);
  const [category, setCategory] = useState<string>(Object.keys(DATASETS)[0]);
  const [customWordsRaw, setCustomWordsRaw] = useState<string>("");

  function handleAddPlayer() {
    const n = nameInput.trim();
    if (!n) return;
    addPlayer(n);
    setNameInput("");
  }

  const categories = useMemo(
    () => Object.keys(DATASETS).concat(["Personalizado..."]),
    []
  );

  const activeWordList: string[] = useMemo(() => {
    if (category === "Personalizado...") {
      const words = customWordsRaw
        .split(/\n|,|;/)
        .map((w) => w.trim())
        .filter(Boolean);
      return words.length ? words : ["(agrega palabras arriba)"];
    }
    return Object.keys(DATASETS[category]) ?? [];
  }, [category, customWordsRaw]);

  const onClickStart = () => {
    startPreparation({
      players,
      category,
      enableHints,
      activeWordList,
    });
  };

  return (
    <section>
      <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100 text-center">
        Preparación
      </h3>
      {/* Jugadores */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Agregar jugadores:
        </label>
        <div className="flex gap-2">
          <InputBlock variant={"neubrutalism"}>
            <Input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddPlayer();
              }}
              placeholder="Ej. Mauricio"
            />
          </InputBlock>
          <Button_v1 onClick={handleAddPlayer}>Agregar</Button_v1>
        </div>
        {players.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {players.map((p, i) => (
              <Button
                key={i}
                size={"xs"}
                className="rounded-sm flex"
                variant="secondary"
                onClick={() => removePlayer(i)}
              >
                <span className="font-medium">{p}</span>
                <X className="w-4 ml-1" />
              </Button>
            ))}
          </div>
        )}
        {players.length === 0 && (
          <p className="mt-1 text-sm opacity-70">
            Agrega al menos 3 jugadores.
          </p>
        )}
      </div>

      {/* Categoría y palabras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Categoría:</label>
          <InputBlock variant={"neubrutalism"}>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </InputBlock>
          {category !== "Personalizado..." && (
            <p className="mt-1 text-xs opacity-70">
              {Object.keys(DATASETS[category]).length} palabras disponibles
            </p>
          )}
        </div>
        <div className="h-max">
          <label className="block text-sm font-medium mb-1">
            Palabras personalizadas (opcional)
          </label>
          <InputBlock variant={"neubrutalism"} className="h-full">
            <TextArea
              value={customWordsRaw}
              onChange={(e) => setCustomWordsRaw(e.target.value)}
              placeholder={
                "Escribe palabras separadas por coma, punto y coma o salto de línea"
              }
              rows={5}
              className="resize-none"
            />
          </InputBlock>
          <p className="mt-1 text-xs opacity-70 mb-6">
            Se usará si eliges la categoría &quot;Personalizado...&quot;.
          </p>
        </div>
      </div>
      <Separator className="mb-4" />
      {/* Opciones de juego */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Opciones de juego
        </label>
        <div className="flex flex-col justify-center gap-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={enableHints}
              onCheckedChange={(checked) => {
                setEnableHints(!!checked);
              }}
            />
            <Lightbulb className="inline-block size-4 text-yellow-500" />
            <span className="text-sm flex items-center">
              Mostrar pistas al impostor
            </span>
          </label>
          <div className="text-xs opacity-70 ">
            El impostor verá una pista sobre la palabra secreta
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center  gap-3">
        <EyeCatchingButton_v2
          onClick={onClickStart}
          disabled={players.length < 3}
          size={"lg"}
          className="bg-tamarillo-500 dark"
        >
          Comenzar el juego
        </EyeCatchingButton_v2>
        <Summary
          category={category}
          playersCount={players.length}
          enableHints={enableHints}
        />
      </div>
    </section>
  );
};

export default SetupPhase;
