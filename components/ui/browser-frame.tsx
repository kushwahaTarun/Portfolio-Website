"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  url?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function BrowserFrame({ url, children, className, bodyClassName }: Props) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white shadow-[0_24px_64px_-32px_rgba(28,24,21,0.22)]",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-foreground/[0.06] bg-[--color-muted]/60 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        {url && (
          <div className="flex flex-1 items-center justify-center">
            <span className="inline-flex max-w-full items-center gap-1.5 truncate rounded-md bg-white px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
              <span className="size-1 rounded-full bg-[--color-brand-lime]" />
              <span className="truncate">{url}</span>
            </span>
          </div>
        )}
      </div>
      <div className={cn("relative", bodyClassName)}>{children}</div>
    </div>
  );
}
