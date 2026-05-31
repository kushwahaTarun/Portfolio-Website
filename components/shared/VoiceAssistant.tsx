"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, type AvatarStatus } from "@/components/shared/Avatar";
import { useIsMobile } from "@/lib/use-is-mobile";

type Status = AvatarStatus;
type Turn = { role: "user" | "assistant"; content: string };

const MAX_USER_TURNS = 10;

// Minimal Web Speech API typings — these are not in stock TS lib.
type SpeechRecognitionEventLike = {
  results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }>;
  resultIndex: number;
};
type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
type SpeechRecognitionCtor = new () => SpeechRecognitionInstance;

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function VoiceAssistant() {
  const [status, setStatus] = useState<Status>("idle");
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [supported] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return Boolean(getSpeechRecognitionCtor()) && "speechSynthesis" in window;
  });
  const [mouthIntensity, setMouthIntensity] = useState(0);
  const isMobile = useIsMobile();

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const spokenIndexRef = useRef(0);
  const mouthRafRef = useRef<number | null>(null);
  const mouthNudgeRef = useRef(0);

  const turnsExhausted = useMemo(
    () => turns.filter((t) => t.role === "user").length >= MAX_USER_TURNS,
    [turns]
  );

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      abortRef.current?.abort();
      if (mouthRafRef.current != null) cancelAnimationFrame(mouthRafRef.current);
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, []);

  const startMouthLoop = useCallback(() => {
    if (mouthRafRef.current != null) return;
    const tick = () => {
      if (typeof window === "undefined" || !window.speechSynthesis.speaking) {
        setMouthIntensity(0);
        mouthRafRef.current = null;
        return;
      }
      const base = 0.35 + Math.sin(performance.now() / 110) * 0.25;
      const nudge = Math.max(0, mouthNudgeRef.current);
      mouthNudgeRef.current = nudge * 0.85;
      const value = Math.min(1, Math.max(0.15, base + nudge));
      setMouthIntensity(value);
      mouthRafRef.current = requestAnimationFrame(tick);
    };
    mouthRafRef.current = requestAnimationFrame(tick);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1.05;
      utter.pitch = 1;
      utter.volume = 1;
      utter.onstart = () => startMouthLoop();
      utter.onboundary = () => {
        mouthNudgeRef.current = 0.4;
      };
      utter.onend = () => {
        if (typeof window !== "undefined" && !window.speechSynthesis.speaking) {
          setMouthIntensity(0);
        }
      };
      window.speechSynthesis.speak(utter);
    },
    [startMouthLoop]
  );

  const stopEverything = useCallback(() => {
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    abortRef.current?.abort();
    abortRef.current = null;
    if (mouthRafRef.current != null) {
      cancelAnimationFrame(mouthRafRef.current);
      mouthRafRef.current = null;
    }
    setMouthIntensity(0);
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    setStatus("idle");
  }, []);

  const askLLM = useCallback(
    async (userText: string) => {
      setError(null);
      setReply("");
      setStatus("thinking");
      spokenIndexRef.current = 0;

      const nextTurns: Turn[] = [...turns, { role: "user", content: userText }];
      setTurns(nextTurns);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextTurns }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? "The assistant is unavailable. Please try again.");
        }
        if (!res.body) throw new Error("No response stream.");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        let firstChunk = true;

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setReply(acc);
          if (firstChunk) {
            setStatus("speaking");
            firstChunk = false;
          }

          // Speak completed sentences as they arrive.
          const sentenceEnd = acc.slice(spokenIndexRef.current).search(/[.!?]\s/);
          if (sentenceEnd !== -1) {
            const cutoff = spokenIndexRef.current + sentenceEnd + 1;
            const chunk = acc.slice(spokenIndexRef.current, cutoff).trim();
            spokenIndexRef.current = cutoff;
            if (chunk) speak(chunk);
          }
        }

        // Speak any trailing remainder.
        const tail = acc.slice(spokenIndexRef.current).trim();
        if (tail) speak(tail);

        setTurns([...nextTurns, { role: "assistant", content: acc }]);

        // Wait until speech queue drains, then return to idle.
        const checkDone = () => {
          if (typeof window === "undefined") return;
          if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
            setTimeout(checkDone, 300);
          } else {
            setStatus("idle");
          }
        };
        setTimeout(checkDone, 400);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        const msg = err instanceof Error ? err.message : "Something went wrong.";
        setError(msg);
        setStatus("error");
        speak(msg);
      } finally {
        abortRef.current = null;
      }
    },
    [turns, speak]
  );

  const startListening = useCallback(() => {
    if (turnsExhausted) {
      setError("Conversation limit reached. Tap the reset button to start over.");
      setStatus("error");
      return;
    }

    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      setError("Voice input isn't supported in this browser. Try Chrome, Edge, or Safari.");
      setStatus("error");
      return;
    }

    if (typeof window !== "undefined") window.speechSynthesis?.cancel();

    setError(null);
    setTranscript("");
    setReply("");
    setStatus("listening");

    const recog = new Ctor();
    recog.lang = "en-US";
    recog.continuous = false;
    recog.interimResults = true;
    recog.maxAlternatives = 1;

    let finalText = "";
    recog.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finalText += res[0].transcript;
        else interim += res[0].transcript;
      }
      setTranscript((finalText + interim).trim());
    };
    recog.onerror = (e) => {
      recognitionRef.current = null;
      if (e.error === "no-speech") {
        setError("I didn't hear anything. Tap the mic and try again.");
      } else if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setError("Microphone access denied. Enable it in your browser settings.");
      } else if (e.error !== "aborted") {
        setError("Couldn't capture audio. Please try again.");
      }
      if (e.error !== "aborted") setStatus("error");
    };
    recog.onend = () => {
      recognitionRef.current = null;
      const text = finalText.trim();
      if (text) {
        setTranscript(text);
        askLLM(text);
      } else if (status === "listening") {
        setStatus("idle");
      }
    };

    recognitionRef.current = recog;
    try {
      recog.start();
    } catch {
      setError("Couldn't start the microphone. Please refresh and try again.");
      setStatus("error");
    }
  }, [askLLM, status, turnsExhausted]);

  const handleMicClick = () => {
    if (status === "listening") {
      recognitionRef.current?.stop();
      return;
    }
    if (status === "thinking" || status === "speaking") {
      stopEverything();
      return;
    }
    startListening();
  };

  const reset = () => {
    stopEverything();
    setTurns([]);
    setTranscript("");
    setReply("");
    setError(null);
    setStatus("idle");
  };

  const statusLabel: Record<Status, string> = {
    idle:
      turns.length === 0
        ? "Tap to speak"
        : isMobile
          ? "Tap to ask again"
          : "Tap to ask another question",
    listening: "Listening…",
    thinking: "Thinking…",
    speaking: "Speaking…",
    error: "Something went wrong",
  };

  const hasContent = Boolean(transcript || reply || error || !supported);
  const showClear = turns.length > 0 || transcript || reply || error;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-end p-3 sm:p-6">
      <div className="pointer-events-auto flex max-w-full items-end gap-2 sm:gap-3">
        <AnimatePresence>
          {hasContent && (
            <motion.div
              key="bubbles"
              initial={{ opacity: 0, x: 20, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-[min(58vw,260px)] flex-col items-end gap-2 pb-2 text-sm sm:w-[min(78vw,320px)]"
            >
              {!supported && (
                <Bubble tone="warn">
                  Voice features need Chrome, Edge, or Safari.
                </Bubble>
              )}
              {error && <Bubble tone="error">{error}</Bubble>}
              {transcript && (
                <Bubble tone="user" label="You">
                  {transcript}
                </Bubble>
              )}
              {reply && (
                <Bubble tone="assistant" label="Assistant">
                  {reply}
                </Bubble>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col items-center gap-2">
          <Avatar
            status={status}
            mouthIntensity={mouthIntensity}
            onClick={handleMicClick}
            disabled={!supported}
            size={isMobile ? 72 : 96}
          />
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "max-w-[55vw] truncate rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium shadow-[0_4px_14px_-4px_rgba(28,24,21,0.2)] backdrop-blur sm:max-w-none sm:px-3 sm:text-[11px]",
                status === "error" ? "text-red-600" : "text-foreground"
              )}
            >
              {statusLabel[status]}
            </span>
            {showClear && (
              <button
                type="button"
                onClick={reset}
                aria-label="Reset conversation"
                className="grid size-6 place-items-center rounded-full bg-white/90 text-foreground/70 shadow-[0_4px_14px_-4px_rgba(28,24,21,0.2)] backdrop-blur transition-colors hover:text-foreground"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({
  children,
  tone,
  label,
}: {
  children: React.ReactNode;
  tone: "user" | "assistant" | "error" | "warn";
  label?: string;
}) {
  const toneClass = {
    user: "bg-foreground text-background",
    assistant: "bg-white text-foreground",
    error: "bg-red-50 text-red-700",
    warn: "bg-amber-50 text-amber-800",
  }[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "max-w-full rounded-2xl px-3.5 py-2 leading-relaxed shadow-[0_8px_24px_-12px_rgba(28,24,21,0.35)] backdrop-blur",
        toneClass
      )}
    >
      {label && (
        <p
          className={cn(
            "mb-0.5 text-[9px] uppercase tracking-wide",
            tone === "user" ? "text-background/60" : "text-muted-foreground"
          )}
        >
          {label}
        </p>
      )}
      <p className="whitespace-pre-wrap text-sm">{children}</p>
    </motion.div>
  );
}

