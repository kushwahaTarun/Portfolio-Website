import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { MagneticButton } from "@/components/shared/MagneticButton";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404 — Not found"
      prefix="Lost in the"
      highlight="void."
      underlineWidth="48%"
      className="min-h-[80svh] pb-24 md:pb-32"
      description={
        <p>
          This route doesn&apos;t exist — or doesn&apos;t exist yet. Let&apos;s
          get you back somewhere useful.
        </p>
      }
    >
      <MagneticButton>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
      </MagneticButton>
      <MagneticButton>
        <Link
          href="/projects"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-foreground bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          See projects
        </Link>
      </MagneticButton>
    </PageHero>
  );
}
