import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  bleed?: boolean;
};

export function Section({ className, children, bleed, ...props }: Props) {
  return (
    <section
      className={cn(
        "relative w-full",
        !bleed && "container-px mx-auto max-w-[1400px] py-16 md:py-32",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  accent?: "orange" | "cyan" | "lime" | "pink" | "indigo";
};

const accentMap = {
  orange: "bg-[--color-brand-orange]",
  cyan: "bg-[--color-brand-cyan]",
  lime: "bg-[--color-brand-lime]",
  pink: "bg-[--color-brand-pink]",
  indigo: "bg-[--color-brand-indigo]",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  accent = "orange",
}: HeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex max-w-3xl flex-col gap-4 md:mb-14",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-foreground/10 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground sticker">
          <span className={cn("size-1.5 rounded-full", accentMap[accent])} />
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
