"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { Send, Loader2, Check, Phone, MessageCircle } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Something went wrong");
      }
      toast.success("Message sent. I'll reply within a day or two.");
      setSent(true);
      reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send message";
      toast.error(msg);
    }
  };

  if (sent) {
    const whatsappNumber = siteConfig.phone.replace(/[^0-9]/g, "");
    return (
      <div className="flex flex-col gap-5 rounded-3xl border border-foreground/[0.08] bg-white p-6 paper md:p-8">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[--color-brand-lime] text-white">
            <Check size={18} strokeWidth={2.5} />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Message sent.
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              I&apos;ll reply within a day or two. If it&apos;s urgent, feel
              free to reach me directly below.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-foreground/[0.08] bg-foreground/[0.02] p-5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Direct line
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              <Phone size={14} />
              {siteConfig.phone}
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border-2 border-foreground bg-transparent px-5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Available 10:00–22:00 IST. Best for hiring intros and freelance
            scoping calls.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSent(false)}
          className="self-start text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-3xl border border-foreground/[0.08] bg-white p-6 paper md:p-8"
      noValidate
    >
      <input
        type="text"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden
        className="hidden"
        {...register("website")}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <Input
            placeholder="Tarun Kushwaha"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="you@company.com"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      <Field label="Subject" error={errors.subject?.message}>
        <Input
          placeholder="A short summary"
          {...register("subject")}
          aria-invalid={!!errors.subject}
        />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <Textarea
          placeholder="Tell me about the project, timeline, team size — anything that helps me reply usefully."
          rows={6}
          {...register("message")}
          aria-invalid={!!errors.message}
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting || sent}
        className={cn(
          "mt-2 inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:bg-foreground/90 disabled:opacity-60",
          sent && "bg-[--color-brand-lime] hover:bg-[--color-brand-lime] text-white"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Sending...
          </>
        ) : sent ? (
          <>
            <Check size={14} /> Sent
          </>
        ) : (
          <>
            <Send size={14} /> Send message
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-[--color-brand-pink]">{error}</span>}
    </label>
  );
}
