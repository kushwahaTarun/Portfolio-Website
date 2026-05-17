import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-px mx-auto grid min-h-[80svh] max-w-[1400px] place-items-center py-32 text-center">
      <div>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          404 / Not found
        </span>
        <h1 className="mt-6 text-balance text-6xl font-semibold tracking-tight md:text-8xl">
          Lost in the <span className="gradient-text">void</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-pretty text-base text-muted-foreground md:text-lg">
          This route doesn&apos;t exist — or doesn&apos;t exist yet. Let&apos;s get
          you back somewhere useful.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>
    </div>
  );
}
