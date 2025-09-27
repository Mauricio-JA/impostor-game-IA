import { BookMarked, HatGlasses, Lightbulb, UsersRound } from "lucide-react";
import React from "react";
import Pill from "@/components/commons/Pill";
import { cn } from "@/lib/utils";

type Props = {
  category: string;
  playersCount: number;
  enableHints?: boolean;
  privateMode?: boolean;
  className?: string;
};

const Summary = ({
  category,
  playersCount,
  enableHints,
  privateMode,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 text-xs opacity-80",
        className
      )}
    >
      <Pill>
        <UsersRound className="size-4 text-blue-500" /> {playersCount} jugadores
      </Pill>
      <Pill>
        <BookMarked className="size-4 text-green-500" /> {category}
      </Pill>
      {privateMode && (
        <Pill>
          <HatGlasses className="size-4" /> Modo privado: mostrar/ocultar
        </Pill>
      )}
      {enableHints && (
        <Pill>
          <Lightbulb className="size-4 text-yellow-500" /> Pistas habilitadas
        </Pill>
      )}
    </div>
  );
};

export default Summary;
