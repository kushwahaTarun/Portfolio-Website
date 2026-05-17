import { cn } from "@/lib/utils";

export function GradientOrbs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div className="absolute -top-32 left-[10%] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(232,93,4,0.18),transparent_60%)]" />
      <div className="absolute -top-20 right-[5%] size-[460px] rounded-full bg-[radial-gradient(circle,rgba(8,145,178,0.14),transparent_60%)]" />
      <div className="absolute bottom-0 left-1/3 size-[400px] rounded-full bg-[radial-gradient(circle,rgba(101,163,13,0.12),transparent_60%)]" />
      <div className="absolute inset-0 dot-pattern mask-radial-fade opacity-40" />
    </div>
  );
}
