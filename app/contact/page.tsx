import type { Metadata } from "next";
import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { GradientOrbs } from "@/components/shared/GradientOrbs";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tarun Kushwaha — senior React.js / Next.js engineer.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-28 md:pb-16">
        <GradientOrbs />
        <div className="container-px mx-auto max-w-[1400px]">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            / Contact
          </span>
          <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            Let&apos;s <span className="gradient-text">talk</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
            A new role, a freelance build, a question about React, or just a hello
            — I read every message and usually reply within a day or two. No
            template, no sales pitch.
          </p>
        </div>
      </section>

      <Section className="py-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />

          <aside className="space-y-8">
            <div className="rounded-2xl border border-foreground/[0.08] bg-white paper p-7">
              <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Direct
              </h2>
              <ul className="space-y-4">
                <ContactRow icon={<Mail size={16} />} label="Email">
                  <Link
                    href={`mailto:${siteConfig.email}`}
                    className="text-foreground hover:underline underline-offset-4"
                  >
                    {siteConfig.email}
                  </Link>
                </ContactRow>
                <ContactRow icon={<MapPin size={16} />} label="Based in">
                  <span className="text-foreground">{siteConfig.location}</span>
                </ContactRow>
                <ContactRow icon={<Github size={16} />} label="GitHub">
                  <Link
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline underline-offset-4"
                  >
                    @kushwahatarun9
                  </Link>
                </ContactRow>
                <ContactRow icon={<Linkedin size={16} />} label="LinkedIn">
                  <Link
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline underline-offset-4"
                  >
                    /in/tarun-kushwaha-react
                  </Link>
                </ContactRow>
                <ContactRow icon={<Phone size={16} />} label="Phone">
                  <Link
                    href={`tel:${siteConfig.phone}`}
                    className="text-foreground hover:underline underline-offset-4"
                  >
                    {siteConfig.phone}
                  </Link>
                </ContactRow>
              </ul>
            </div>

            <div className="rounded-2xl border border-foreground/[0.08] bg-white paper p-7">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Currently
              </h2>
              <p className="text-sm text-foreground/85">
                Open to interesting frontend or full-stack work. Comfortable with
                async, remote, and time-zone-friendly teams.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-foreground/10 bg-white text-muted-foreground">
        {icon}
      </span>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="text-sm">{children}</div>
      </div>
    </li>
  );
}
