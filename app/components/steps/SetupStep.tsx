import React, { useMemo, useState } from "react";
import Pill from "../commons/Pill";
import { DATASETS } from "../../lib/datasets";
import usePlayers from "../../hooks/usePlayers";
import { StartPreparationParams } from "../../hooks/useImpostorGame";

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
      <h2 className="text-xl font-semibold mb-4">Preparación</h2>

      {/* Participantes */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Agregar participante
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddPlayer();
            }}
            placeholder="Ej. Ana"
            className="w-full rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            onClick={handleAddPlayer}
            className="rounded-2xl px-4 py-2 font-medium bg-emerald-500 text-white hover:bg-emerald-600 shadow"
          >
            Agregar
          </button>
        </div>
        {players.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {players.map((p, i) => (
              <li
                key={i}
                className="flex items-center gap-2 rounded-2xl border bg-white px-3 py-1 shadow-sm"
              >
                <span className="font-medium">{p}</span>
                <button
                  onClick={() => removePlayer(i)}
                  className="rounded-full px-2 py-0.5 text-xs border hover:bg-gray-50"
                  title="Eliminar"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
        {players.length === 0 && (
          <p className="mt-2 text-sm opacity-70">
            Agrega al menos 3 jugadores.
          </p>
        )}
      </div>

      {/* Categoría y palabras */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Categoría</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl border px-3 py-2 bg-white shadow-sm"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {category !== "Personalizado..." && (
            <p className="mt-2 text-xs opacity-70">
              {Object.keys(DATASETS[category]).length} palabras disponibles
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Palabras personalizadas (opcional)
          </label>
          <textarea
            value={customWordsRaw}
            onChange={(e) => setCustomWordsRaw(e.target.value)}
            placeholder={
              "Escribe palabras separadas por coma, punto y coma o salto de línea"
            }
            rows={5}
            className="w-full rounded-2xl border px-3 py-2 bg-white shadow-sm"
          />
          <p className="mt-2 text-xs opacity-70">
            Se usará si eliges la categoría &quot;Personalizado...&quot;.
          </p>
        </div>
      </div>

      {/* Opciones de juego */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">
          Opciones de juego
        </label>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={enableHints}
              onChange={(e) => setEnableHints(e.target.checked)}
              className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
            />
            <span className="text-sm">💡 Mostrar pistas al impostor</span>
          </label>
          <div className="text-xs opacity-70">
            El impostor verá una pista sobre la palabra secreta
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onClickStart}
          className="rounded-2xl px-5 py-2.5 font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg disabled:opacity-50"
          disabled={players.length < 3}
        >
          Sortear e iniciar turnos
        </button>
        <div className="flex items-center gap-2 text-sm opacity-80">
          <Pill>👥 {players.length} jugadores</Pill>
          <Pill>🗂️ {category}</Pill>
        </div>
      </div>
    </section>
  );
};

export default SetupPhase;
