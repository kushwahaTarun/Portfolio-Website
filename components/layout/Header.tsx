"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X, Command as CommandIcon } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/shared/MagneticButton";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-4 z-40 mx-auto w-[min(96%,1200px)]",
          "transition-all duration-300"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between rounded-full border border-foreground/[0.08] px-4 py-2 md:px-6 transition-all duration-300",
            scrolled
              ? "bg-white shadow-[0_10px_40px_-12px_rgba(28,24,21,0.18)]"
              : "bg-white/80"
          )}
        >
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="flex items-baseline gap-1.5 text-sm font-semibold tracking-tight"
          >
            <span className="inline-flex items-baseline leading-none">
              <span className="text-[19px] font-black leading-none tracking-[-0.08em] text-foreground">
                tk
              </span>
              <span
                className="ml-[2px] inline-block size-[6px] shrink-0 translate-y-[1px] rounded-full"
                style={{ backgroundColor: "#e85d04" }}
              />
            </span>
            <span className="hidden sm:inline">{siteConfig.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-foreground/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const ev = new KeyboardEvent("keydown", {
                  key: "k",
                  metaKey: true,
                  ctrlKey: true,
                  bubbles: true,
                });
                window.dispatchEvent(ev);
              }}
              className="hidden items-center gap-2 rounded-full border border-foreground/10 bg-white px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground sm:flex"
              aria-label="Open command palette"
            >
              <CommandIcon size={12} />
              <span>K</span>
            </button>

            <MagneticButton className="hidden md:inline-block" strength={16}>
              <Link
                href="/contact"
                className="inline-flex h-9 items-center justify-center rounded-full bg-foreground px-4 text-xs font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Let&apos;s talk
              </Link>
            </MagneticButton>

            <button
              type="button"
              className="md:hidden grid size-9 place-items-center rounded-full border border-foreground/10 bg-white text-foreground"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background md:hidden"
        >
          <div className="flex items-center justify-between p-5">
            <span className="text-sm font-semibold">{siteConfig.name}</span>
            <button
              type="button"
              className="grid size-9 place-items-center rounded-full border border-foreground/10 bg-white"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
          <nav className="container-px flex flex-col gap-1 pt-8">
            {siteConfig.nav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-foreground/10 py-5 text-3xl font-semibold tracking-tight"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </>
  );
}
