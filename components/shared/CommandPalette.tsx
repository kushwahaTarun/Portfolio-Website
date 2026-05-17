"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowRight,
  Briefcase,
  Code2,
  FileText,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("http") || href.startsWith("mailto")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    toast.success("Email copied to clipboard");
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-foreground/30 data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-[20%] z-[91] w-[92vw] max-w-[560px] -translate-x-1/2 overflow-hidden rounded-2xl border border-foreground/10 bg-white shadow-2xl">
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Dialog.Description className="sr-only">
            Quick navigation and actions
          </Dialog.Description>
          <Command className="[&_[cmdk-input]]:h-12 [&_[cmdk-input]]:w-full [&_[cmdk-input]]:bg-transparent [&_[cmdk-input]]:px-4 [&_[cmdk-input]]:text-sm [&_[cmdk-input]]:outline-none [&_[cmdk-input]]:border-b [&_[cmdk-input]]:border-foreground/10">
            <Command.Input placeholder="Type a command or search..." />
            <Command.List className="max-h-[360px] overflow-y-auto p-2">
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>

              <Command.Group
                heading="Navigation"
                className="text-xs uppercase tracking-wider text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
              >
                <PaletteItem icon={<Sparkles size={16} />} onSelect={() => go("/")}>
                  Home
                </PaletteItem>
                <PaletteItem
                  icon={<Briefcase size={16} />}
                  onSelect={() => go("/projects")}
                >
                  Projects
                </PaletteItem>
                <PaletteItem icon={<User size={16} />} onSelect={() => go("/about")}>
                  About
                </PaletteItem>
                <PaletteItem icon={<Code2 size={16} />} onSelect={() => go("/uses")}>
                  Stack / Uses
                </PaletteItem>
                <PaletteItem icon={<Zap size={16} />} onSelect={() => go("/now")}>
                  Now
                </PaletteItem>
                <PaletteItem icon={<Mail size={16} />} onSelect={() => go("/contact")}>
                  Contact
                </PaletteItem>
              </Command.Group>

              <Command.Group
                heading="Actions"
                className="text-xs uppercase tracking-wider text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
              >
                <PaletteItem icon={<Mail size={16} />} onSelect={copyEmail}>
                  Copy email
                </PaletteItem>
                <PaletteItem
                  icon={<FileText size={16} />}
                  onSelect={() => go(siteConfig.links.resume)}
                >
                  Open resume
                </PaletteItem>
              </Command.Group>

              <Command.Group
                heading="Social"
                className="text-xs uppercase tracking-wider text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
              >
                <PaletteItem
                  icon={<Github size={16} />}
                  onSelect={() => go(siteConfig.links.github)}
                >
                  GitHub
                </PaletteItem>
                <PaletteItem
                  icon={<Linkedin size={16} />}
                  onSelect={() => go(siteConfig.links.linkedin)}
                >
                  LinkedIn
                </PaletteItem>
              </Command.Group>
            </Command.List>
            <div className="flex items-center justify-between border-t border-foreground/10 px-3 py-2 text-[11px] text-muted-foreground">
              <span>
                <kbd className="rounded bg-foreground/[0.06] px-1.5 py-0.5 text-[10px]">↑↓</kbd>{" "}
                navigate
              </span>
              <span>
                <kbd className="rounded bg-foreground/[0.06] px-1.5 py-0.5 text-[10px]">↵</kbd>{" "}
                select
              </span>
              <span>
                <kbd className="rounded bg-foreground/[0.06] px-1.5 py-0.5 text-[10px]">esc</kbd>{" "}
                close
              </span>
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function PaletteItem({
  icon,
  children,
  onSelect,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-foreground/90 transition-colors data-[selected=true]:bg-foreground/[0.06] data-[selected=true]:text-foreground"
    >
      <span className="flex items-center gap-3">
        <span className="text-muted-foreground">{icon}</span>
        {children}
      </span>
      <ArrowRight size={14} className="opacity-0 transition-opacity data-[selected=true]:opacity-100" />
    </Command.Item>
  );
}
