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
        className="relative overflow-hidden rounded-[40px] p-10 md:p-20"
        style={{
          background:
            "linear-gradient(135deg, #e85d04 0%, #db2777 55%, #4f46e5 100%)",
        }}
      >
        {/* Decorative texture */}
        <div aria-hidden className="absolute inset-0 dot-pattern opacity-25" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 size-[420px] rounded-full bg-white/15 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-0 size-[360px] rounded-full bg-black/10 blur-2xl"
        />

        <div className="relative flex flex-col items-start gap-10 text-white lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white">
              <span className="size-1.5 rounded-full bg-[--color-brand-lime]" />
              Inbox is open
            </span>
            <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              Got an idea? <br />
              <span className="font-display italic">Tell me about it.</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base text-white/85 md:text-lg">
              Roles, freelance gigs, side-project collabs, or just a hello — I read
              everything and usually reply within a day.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-white"
              >
                Send me a note
                <ArrowUpRight size={16} />
              </Link>
            </MagneticButton>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 px-2 text-sm text-white/85 transition-colors hover:text-white"
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
