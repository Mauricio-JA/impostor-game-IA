export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-sm shadow-sm bg-white/60 backdrop-blur">
      {children}
    </span>
  );
}
