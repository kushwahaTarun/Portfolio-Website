export default function Loading() {
  return (
    <div className="grid min-h-dvh place-items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-2 border-foreground/10 border-t-[--color-brand-orange]" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Loading
        </span>
      </div>
    </div>
  );
}
