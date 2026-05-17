import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  duration?: number;
  className?: string;
};

export function Marquee({
  children,
  reverse,
  pauseOnHover,
  duration = 40,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-6 pr-6 animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{ ["--duration" as string]: `${duration}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
