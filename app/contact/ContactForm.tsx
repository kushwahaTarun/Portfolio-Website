"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { Send, Loader2, Check } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send message";
      toast.error(msg);
    }
  };

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
