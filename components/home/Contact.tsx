"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { Section } from "@/components/shared/Section";
import { MagneticButton } from "@/components/shared/MagneticButton";

export function Contact() {
  return (
    <Section id="contact">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[40px] border border-foreground/[0.08] bg-white paper p-10 md:p-16"
      >
        {/* Soft accent halos — subtle, no full-bleed gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 size-[360px] rounded-full bg-[radial-gradient(circle,rgba(232,93,4,0.10),transparent_65%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-20 size-[320px] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.08),transparent_65%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(232,93,4,0.4), transparent)",
          }}
        />

        <div className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground sticker">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--color-brand-lime] opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[--color-brand-lime]" />
              </span>
              Inbox is open
            </span>
            <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Got an idea? <br />
              <span className="font-display italic text-[--color-brand-orange]">
                Tell me about it.
              </span>
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base text-muted-foreground md:text-lg">
              Roles, freelance gigs, side-project collabs, or just a hello — I read
              everything and usually reply within a day.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-foreground px-7 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Send me a note
                <ArrowUpRight size={16} />
              </Link>
            </MagneticButton>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 px-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail size={14} />
              {siteConfig.email}
            </Link>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
