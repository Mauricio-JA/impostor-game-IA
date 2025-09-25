"use client";
import React, { useMemo, useState, useEffect } from "react";
import { DATASETS } from "../lib/datasets";
import { Phase, GameState } from "../lib/types";
import { shuffle, randomChoice } from "../lib/functions";
import Image from "next/image";

// ============================
// Juego del Impostor (SPA)
// ============================
// Características:
// - Registrar participantes
// - Elegir dataset de palabras (categorías)
// - Sorteo de palabra y de impostor
// - Ronda de revelación por turnos (mostrar/ocultar)
// - Pantalla de discusión con botón para revelar resultado
// - Reiniciar con mismos jugadores o empezar uno nuevo
//
// Nota: 100% en cliente. No requiere backend.

// ---- Componente principal ----
export default function ImpostorGame() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<string[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [category, setCategory] = useState<string>(Object.keys(DATASETS)[0]);
  const [customWordsRaw, setCustomWordsRaw] = useState<string>("");
  const [enableHints, setEnableHints] = useState<boolean>(false);
  const [gs, setGs] = useState<GameState | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Persistencia simple de jugadores en localStorage
  useEffect(() => {
    const stored = localStorage.getItem("impostor_players");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setPlayers(parsed);
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("impostor_players", JSON.stringify(players));
  }, [players]);

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

  function addPlayer() {
    const n = nameInput.trim();
    if (!n) return;
    if (players.some((p) => p.toLowerCase() === n.toLowerCase())) {
      alert("Ese nombre ya está en la lista.");
      return;
    }
    setPlayers((prev) => [...prev, n]);
    setNameInput("");
  }

  function removePlayer(idx: number) {
    setPlayers((prev) => prev.filter((_, i) => i !== idx));
  }

  function startPreparation() {
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
    };
    setGs(newGs);
    setIsRevealed(false);
    setPhase("reveal_turns");
  }

  function nextPlayer() {
    if (!gs) return;
    if (gs.turn + 1 >= gs.order.length) {
      setPhase("discussion");
      setIsRevealed(false);
      return;
    }
    setGs({ ...gs, turn: gs.turn + 1 });
    setIsRevealed(false);
  }

  function restartSamePlayers() {
    if (!gs && players.length < 3) {
      setPhase("setup");
      return;
    }
    const basePlayers = gs ? gs.players : players;
    const impostorIndex = Math.floor(Math.random() * basePlayers.length);
    const secretWord = randomChoice(activeWordList);
    const order = shuffle(basePlayers.map((_, i) => i));
    const newGs: GameState = {
      players: [...basePlayers],
      order,
      impostorIndex,
      secretWord,
      category: category,
      turn: 0,
      enableHints,
    };
    setGs(newGs);
    setIsRevealed(false);
    setPhase("reveal_turns");
  }

  function newGame() {
    setPhase("setup");
    setGs(null);
    setIsRevealed(false);
  }

  // ---- UI helpers ----
  function Pill({ children }: { children: React.ReactNode }) {
    return (
      <span className="inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-sm shadow-sm bg-white/60 backdrop-blur">
        {children}
      </span>
    );
  }

  // ---- Render ----
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-emerald-50 text-gray-800">
      <div className="mx-auto max-w-3xl p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              className="inline-block"
              width={50}
              height={50}
            />{" "}
            Juego del Impostor
          </h1>
          <div className="text-xs md:text-sm opacity-70">
            v1.1 • 100% offline
          </div>
        </header>

        {/* Tarjeta principal */}
        <div className="rounded-3xl border bg-white/80 shadow-lg backdrop-blur p-5 md:p-7">
          {phase === "setup" && (
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
                      if (e.key === "Enter") addPlayer();
                    }}
                    placeholder="Ej. Ana"
                    className="w-full rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <button
                    onClick={addPlayer}
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
                  <label className="block text-sm font-medium mb-2">
                    Categoría
                  </label>
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
                      {Object.keys(DATASETS[category]).length} palabras
                      disponibles
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
                    Se usará si eliges la categoría
                    &quot;Personalizado...&quot;.
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
                    <span className="text-sm">
                      💡 Mostrar pistas al impostor
                    </span>
                  </label>
                  <div className="text-xs opacity-70">
                    El impostor verá una pista sobre la palabra secreta
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={startPreparation}
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
          )}

          {phase === "reveal_turns" && gs && (
            <section>
              <h2 className="text-xl font-semibold mb-2">
                Turno de revelación
              </h2>
              <p className="text-sm opacity-80 mb-4">
                Turno {gs.turn + 1} de {gs.order.length}. Asegúrate de que solo{" "}
                <span className="font-semibold">
                  {gs.players[gs.order[gs.turn]]}
                </span>{" "}
                mire la pantalla.
              </p>

              <div className="rounded-3xl border bg-white p-6 shadow-inner flex flex-col items-center text-center">
                <div className="text-sm opacity-70 mb-2">Jugador actual</div>
                <div className="text-2xl font-bold mb-6">
                  {gs.players[gs.order[gs.turn]]}
                </div>

                {!isRevealed ? (
                  <button
                    onClick={() => setIsRevealed(true)}
                    className="rounded-3xl px-6 py-4 font-bold text-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow"
                  >
                    Mostrar mi rol
                  </button>
                ) : (
                  <div className="w-full max-w-md">
                    <div className="mb-4 rounded-2xl border p-4 bg-emerald-50">
                      {gs.order[gs.turn] === gs.impostorIndex ? (
                        <>
                          <div className="text-2xl font-extrabold">
                            🤫 ¡Eres el IMPOSTOR!
                          </div>
                          <p className="mt-2 text-sm">
                            Tu objetivo es pasar desapercibido durante la
                            discusión. No conoces la palabra secreta.
                          </p>
                          {gs.enableHints &&
                            DATASETS[gs.category] &&
                            DATASETS[gs.category][gs.secretWord] && (
                              <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
                                <div className="text-sm font-medium text-amber-800 mb-1">
                                  💡 Pista para el impostor:
                                </div>
                                <div className="text-sm text-amber-700">
                                  {DATASETS[gs.category][gs.secretWord]}
                                </div>
                              </div>
                            )}
                        </>
                      ) : (
                        <>
                          <div className="text-sm opacity-70">
                            La palabra es
                          </div>
                          <div className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">
                            {gs.secretWord}
                          </div>
                          <div className="mt-2 inline-block text-xs rounded-full bg-emerald-100 px-3 py-1">
                            Categoría: {gs.category}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setIsRevealed(false)}
                        className="flex-1 rounded-2xl px-4 py-3 font-semibold border hover:bg-gray-50"
                      >
                        Ocultar
                      </button>
                      <button
                        onClick={nextPlayer}
                        className="flex-1 rounded-2xl px-4 py-3 font-semibold bg-sky-600 text-white hover:bg-sky-700"
                      >
                        Siguiente jugador ▶
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs opacity-70">
                <Pill>👥 {gs.players.length} jugadores</Pill>
                <Pill>🗂️ {gs.category}</Pill>
                <Pill>🔒 Modo privado: mostrar/ocultar</Pill>
                {gs.enableHints && <Pill>💡 Pistas habilitadas</Pill>}
              </div>
            </section>
          )}

          {phase === "discussion" && gs && (
            <section className="text-center">
              <h2 className="text-xl font-semibold mb-2">
                ¡A debatir en la vida real! 🗣️
              </h2>
              <p className="opacity-80 mb-6">
                Todos han visto su rol. Comiencen a dar pistas, hacer preguntas
                y acusar. Cuando estén listos, revelen el resultado.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => setPhase("revealed")}
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
          )}

          {phase === "revealed" && gs && (
            <section className="text-center">
              <h2 className="text-xl font-semibold mb-4">
                Resultado de la ronda
              </h2>
              <div className="mx-auto max-w-md rounded-3xl border bg-white shadow-inner p-6">
                <div className="text-sm opacity-70">El impostor era</div>
                <div className="text-3xl md:text-4xl font-extrabold mt-1">
                  {gs.players[gs.impostorIndex]}
                </div>
                <div className="mt-5">
                  <div className="text-sm opacity-70">
                    La palabra secreta fue
                  </div>
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
          )}
        </div>

        <section className="mt-6 text-center text-xs opacity-60">
          Consejos: juega con 1 impostor para 3–8 jugadores. Usa pista breve en
          las discusiones para mantener el misterio.
        </section>
      </div>
    </div>
  );
}
