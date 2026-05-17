import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { socials } from "@/lib/data/socials";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-foreground/[0.1] bg-[#f3ecdb]">
      <div className="container-px mx-auto max-w-[1400px] py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h3 className="mb-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Want to chat? <br />
              <span className="gradient-text">My inbox is open.</span>
            </h3>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
            >
              {siteConfig.email}
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Sitemap
            </h4>
            <ul className="space-y-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Elsewhere
            </h4>
            <ul className="space-y-2.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <Icon size={14} />
                    {label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-foreground/10 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. Hand-built in Kanpur
            with a lot of chai.
          </span>
          <span className="font-mono">Next.js · React · Tailwind</span>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[--color-brand-orange] to-transparent opacity-60"
      />
    </footer>
  );
}
