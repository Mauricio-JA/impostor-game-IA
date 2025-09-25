"use client";
import { STEPS } from "../lib/types";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import SetupPhase from "./steps/SetupStep";
import useImpostorGameStore from "../stores/ImpostorGameStore";
import useImpostorGame from "../hooks/useImpostorGame";
import RevealTurnsPhase from "./steps/RevealTurnsStep";
import DiscussionStep from "./steps/DiscussionStep";
import RevealTurnsStep from "./steps/RevealTurnsStep";

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
  const { startPreparation, restartSamePlayers, newGame } = useImpostorGame();
  const { data, step } = useImpostorGameStore();

  // ---- Render ----
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-emerald-50 text-gray-800">
      <div className="mx-auto max-w-3xl p-6">
        <Header />

        {/* Tarjeta principal */}
        <div className="rounded-3xl border bg-white/80 shadow-lg backdrop-blur p-5 md:p-7">
          {step === STEPS.setup && (
            <SetupPhase startPreparation={startPreparation} />
          )}

          {step === STEPS.reveal_turns && data && (
            <RevealTurnsPhase gameState={data} />
          )}

          {step === STEPS.discussion && data && (
            <DiscussionStep
              restartSamePlayers={restartSamePlayers}
              newGame={newGame}
            />
          )}

          {step === STEPS.revealed && data && (
            <RevealTurnsStep gameState={data} />
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
