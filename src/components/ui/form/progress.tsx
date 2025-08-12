export const Progress: React.FC<{ total: number; current: number }> = ({
  total,
  current,
}) =>
  total > 2 && (
    <div className="flex gap-1 w-full">
      {Array.from({ length: total - 1 }).map((_, i) => (
        <div
          key={`step-${i}`}
          className={`h-1.5 grow rounded-full ${
            i + 1 < current ? "bg-b2b-lv2" : "bg-white/40"
          }`}
        />
      ))}
    </div>
  );
