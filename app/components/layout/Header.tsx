import Image from "next/image";
import React from "react";

const Header = () => {
  return (
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
      <div className="text-xs md:text-sm opacity-70">v1.1 • 100% offline</div>
    </header>
  );
};

export default Header;
