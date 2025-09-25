import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juego del Impostor",
  description: "Juego del Impostor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-1">{children}</main>
        <footer className="border-t border-foreground/10 text-sm text-foreground/70">
          <div className="mx-auto w-full max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
            <span>
              ¿Encontraste un error o tienes una idea? Contribuye o abre un
              issue en{" "}
              <a
                href="https://github.com/Mauricio-JA/impostor-game-IA/issues/new"
                target="_blank"
                className="font-semibold"
              >
                GitHub
              </a>
            </span>
            <a
              href="https://github.com/Mauricio-JA/impostor-game-IA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 transition"
              title="GitHub"
            >
              {/* GitHub mark */}
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
