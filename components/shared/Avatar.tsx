"use client";

import { motion, useMotionValue, animate, useTransform, type Transition } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

export type AvatarStatus = "idle" | "listening" | "thinking" | "speaking" | "error";

type AvatarProps = {
  status: AvatarStatus;
  mouthIntensity: number;
  onClick?: () => void;
  disabled?: boolean;
  size?: number;
};

export function Avatar({
  status,
  mouthIntensity,
  onClick,
  disabled,
  size = 200,
}: AvatarProps) {
  const ring1Scale = useMotionValue(1);
  const ring2Scale = useMotionValue(1);
  const mouth = useMotionValue(0);

  useEffect(() => {
    const controls: ReturnType<typeof animate>[] = [];
    if (status === "listening" || status === "speaking") {
      controls.push(
        animate(ring1Scale, [1, 1.18, 1], {
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }),
        animate(ring2Scale, [1, 1.35, 1], {
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5,
        })
      );
    } else {
      controls.push(
        animate(ring1Scale, 1, { duration: 0.4 }),
        animate(ring2Scale, 1, { duration: 0.4 })
      );
    }
    return () => controls.forEach((c) => c.stop());
  }, [status, ring1Scale, ring2Scale]);

  useEffect(() => {
    const ctl = animate(mouth, mouthIntensity, { duration: 0.1, ease: "easeOut" });
    return () => ctl.stop();
  }, [mouth, mouthIntensity]);

  const orbiters = useMemo(() => [0, 0.66, 1.33], []);
  const headAnimation =
    status === "listening"
      ? { y: [0, -2, 0], rotate: 0 }
      : status === "speaking"
      ? { y: [0, -1, 0], rotate: 0 }
      : status === "thinking"
      ? { y: 0, rotate: [-3, 3, -3] }
      : status === "error"
      ? { y: [0, 1, 0, 1, 0], rotate: 0 }
      : { y: [0, -1, 0], rotate: 0 };

  const headTransition: Transition =
    status === "listening"
      ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
      : status === "speaking"
      ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
      : status === "thinking"
      ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
      : status === "error"
      ? { duration: 0.4, repeat: 1 }
      : { duration: 4, repeat: Infinity, ease: "easeInOut" };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Voice assistant avatar"
      className={cn(
        "relative grid place-items-center rounded-full transition-opacity",
        disabled && "opacity-40",
        !disabled && "cursor-pointer"
      )}
      style={{ width: size, height: size }}
    >
      <motion.span
        aria-hidden
        style={{ scale: ring2Scale }}
        className="absolute inset-0 rounded-full bg-foreground/[0.05]"
      />
      <motion.span
        aria-hidden
        style={{ scale: ring1Scale }}
        className="absolute inset-2 rounded-full bg-foreground/[0.08]"
      />

      {status === "thinking" &&
        orbiters.map((delay, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute left-1/2 top-1/2 size-1.5 rounded-full bg-foreground"
            style={{
              transformOrigin: `0 0`,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
          >
            <span
              className="absolute size-1.5 rounded-full bg-foreground"
              style={{ transform: `translate(${size * 0.43}px, 0)` }}
            />
          </motion.span>
        ))}

      <motion.svg
        viewBox="0 0 200 220"
        width={size * 0.82}
        height={size * 0.82 * (220 / 200)}
        className="relative z-10 drop-shadow-[0_18px_40px_rgba(28,24,21,0.28)]"
        animate={headAnimation}
        transition={headTransition}
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Skin gradient — warm tan with shading */}
          <radialGradient id="skin-grad" cx="42%" cy="38%" r="70%">
            <stop offset="0%" stopColor="#e8b88a" />
            <stop offset="55%" stopColor="#c98e5f" />
            <stop offset="100%" stopColor="#8a5a35" />
          </radialGradient>
          {/* Hair gradient */}
          <linearGradient id="hair-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a1f18" />
            <stop offset="100%" stopColor="#120b07" />
          </linearGradient>
          {/* Shirt gradient */}
          <linearGradient id="shirt-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a3633" />
            <stop offset="100%" stopColor="#1c1815" />
          </linearGradient>
          {/* Cheek blush */}
          <radialGradient id="blush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8704a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#e8704a" stopOpacity="0" />
          </radialGradient>
          {/* Sclera */}
          <radialGradient id="sclera" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e9e1d4" />
          </radialGradient>
          {/* Glass lens — slight tint */}
          <linearGradient id="lens-grad" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Neck */}
        <path
          d="M 78 178 Q 80 192 78 202 L 122 202 Q 120 192 122 178 Z"
          fill="url(#skin-grad)"
          opacity="0.95"
        />
        <path
          d="M 78 196 Q 100 200 122 196 L 122 204 Q 100 200 78 204 Z"
          fill="#000"
          opacity="0.15"
        />

        {/* Shirt / collar */}
        <path
          d="M 30 220 Q 35 195 78 198 Q 90 212 100 212 Q 110 212 122 198 Q 165 195 170 220 L 170 240 L 30 240 Z"
          fill="url(#shirt-grad)"
        />
        <path
          d="M 92 200 Q 100 215 108 200 L 110 205 Q 100 218 90 205 Z"
          fill="#000"
          opacity="0.3"
        />

        {/* Ears */}
        <ellipse cx="38" cy="115" rx="8" ry="14" fill="url(#skin-grad)" />
        <ellipse cx="162" cy="115" rx="8" ry="14" fill="url(#skin-grad)" />
        <path d="M 36 113 q 2 4 0 8" stroke="#7a4a25" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M 164 113 q -2 4 0 8" stroke="#7a4a25" strokeWidth="1" fill="none" opacity="0.6" />

        {/* Head shape — rounded soft rectangle */}
        <path
          d="M 50 105
             Q 50 60 100 56
             Q 150 60 150 105
             Q 150 145 140 165
             Q 130 182 100 184
             Q 70 182 60 165
             Q 50 145 50 105 Z"
          fill="url(#skin-grad)"
        />

        {/* Jaw shadow */}
        <path
          d="M 60 160 Q 100 188 140 160 Q 130 178 100 182 Q 70 178 60 160 Z"
          fill="#000"
          opacity="0.1"
        />

        {/* Cheeks */}
        <circle cx="68" cy="135" r="14" fill="url(#blush)" />
        <circle cx="132" cy="135" r="14" fill="url(#blush)" />

        {/* Hair — wavy top with side fade */}
        <path
          d="M 48 92
             Q 44 65 70 52
             Q 85 42 100 44
             Q 118 42 132 54
             Q 154 64 152 95
             Q 150 80 142 75
             Q 138 85 130 80
             Q 120 65 105 68
             Q 90 64 80 75
             Q 70 70 62 82
             Q 56 88 48 92 Z"
          fill="url(#hair-grad)"
        />
        {/* Sideburns hint */}
        <path d="M 50 105 Q 52 120 56 128 L 53 118 Z" fill="url(#hair-grad)" opacity="0.7" />
        <path d="M 150 105 Q 148 120 144 128 L 147 118 Z" fill="url(#hair-grad)" opacity="0.7" />
        {/* Hair highlight */}
        <path
          d="M 65 60 Q 80 50 100 50 Q 115 50 128 56 Q 110 52 95 53 Q 78 55 65 60 Z"
          fill="#fff"
          opacity="0.08"
        />

        {/* Eyebrows */}
        <Eyebrow status={status} side="left" />
        <Eyebrow status={status} side="right" />

        {/* Eyes (with glasses) */}
        <Eye status={status} side="left" />
        <Eye status={status} side="right" />

        {/* Glasses frame */}
        <g fill="none" stroke="#1c1815" strokeWidth="2.2" strokeLinecap="round">
          <rect x="60" y="100" width="32" height="24" rx="10" fill="url(#lens-grad)" />
          <rect x="108" y="100" width="32" height="24" rx="10" fill="url(#lens-grad)" />
          <line x1="92" y1="112" x2="108" y2="112" />
          <path d="M 60 108 q -8 -3 -14 0" />
          <path d="M 140 108 q 8 -3 14 0" />
        </g>

        {/* Nose */}
        <path
          d="M 98 122 Q 96 138 92 144 Q 100 148 108 144 Q 104 138 102 122"
          fill="none"
          stroke="#7a4a25"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.55"
        />
        <ellipse cx="96" cy="146" rx="2" ry="1.2" fill="#7a4a25" opacity="0.4" />
        <ellipse cx="104" cy="146" rx="2" ry="1.2" fill="#7a4a25" opacity="0.4" />

        {/* Stubble shading */}
        <g opacity="0.18">
          <ellipse cx="100" cy="172" rx="34" ry="6" fill="#3a2415" />
          <ellipse cx="75" cy="160" rx="10" ry="4" fill="#3a2415" />
          <ellipse cx="125" cy="160" rx="10" ry="4" fill="#3a2415" />
        </g>

        {/* Mouth */}
        <Mouth mouth={mouth} status={status} />
      </motion.svg>
    </button>
  );
}

function Eyebrow({ status, side }: { status: AvatarStatus; side: "left" | "right" }) {
  const baseX = side === "left" ? 60 : 108;
  const tilt =
    status === "thinking"
      ? side === "left"
        ? -6
        : 2
      : status === "listening"
      ? -2
      : status === "error"
      ? 4
      : 0;
  const yOffset =
    status === "listening" ? -3 : status === "thinking" ? -1 : status === "error" ? 2 : 0;

  return (
    <motion.path
      d={`M ${baseX} 96 q 16 -4 32 0`}
      fill="none"
      stroke="#1c1815"
      strokeWidth="4"
      strokeLinecap="round"
      animate={{
        y: yOffset,
        rotate: tilt,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ transformOrigin: `${baseX + 16}px 96px` }}
    />
  );
}

function Eye({ status, side }: { status: AvatarStatus; side: "left" | "right" }) {
  const cx = side === "left" ? 76 : 124;
  const cy = 112;
  const blinkRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const el = blinkRef.current;
    if (!el) return;
    if (status === "listening" || status === "thinking" || status === "speaking") return;

    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const delay = 2500 + Math.random() * 3500;
      t = setTimeout(() => {
        el.animate(
          [
            { transform: "scaleY(1)" },
            { transform: "scaleY(0.05)" },
            { transform: "scaleY(1)" },
          ],
          { duration: 160, easing: "ease-out" }
        );
        tick();
      }, delay);
    };
    tick();
    return () => clearTimeout(t);
  }, [status]);

  // Eye openness
  const ry =
    status === "listening" ? 8.5 : status === "thinking" ? 4.5 : status === "error" ? 6 : 7;
  const rx = 9;

  // Pupil gaze direction
  const gazeX =
    status === "thinking" ? (side === "left" ? -2.5 : 2.5) : status === "listening" ? 0 : 0;
  const gazeY = status === "thinking" ? -3 : 0;

  return (
    <g ref={blinkRef} style={{ transformOrigin: `${cx}px ${cy}px` }}>
      {/* Sclera */}
      <motion.ellipse
        cx={cx}
        cy={cy}
        animate={{ rx, ry }}
        transition={{ duration: 0.25 }}
        fill="url(#sclera)"
      />
      {/* Iris */}
      <motion.circle
        r={4}
        animate={{ cx: cx + gazeX, cy: cy + gazeY }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        fill="#4a2c18"
      />
      {/* Pupil */}
      <motion.circle
        r={2}
        animate={{ cx: cx + gazeX, cy: cy + gazeY }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        fill="#0a0604"
      />
      {/* Catchlight */}
      <motion.circle
        r={1.1}
        animate={{ cx: cx + gazeX - 1.5, cy: cy + gazeY - 1.5 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        fill="#fff"
        opacity={0.95}
      />
      {/* Tiny lower lid catchlight */}
      <motion.circle
        r={0.5}
        animate={{ cx: cx + gazeX + 1.5, cy: cy + gazeY + 1.8 }}
        transition={{ duration: 0.6 }}
        fill="#fff"
        opacity={0.5}
      />
    </g>
  );
}

function Mouth({
  mouth,
  status,
}: {
  mouth: ReturnType<typeof useMotionValue<number>>;
  status: AvatarStatus;
}) {
  // For speaking, intensity drives the gap between lips.
  const lowerLipY = useTransform(mouth, [0, 1], [158, 168]);
  const lowerLipCurve = useTransform(mouth, [0, 1], [4, 12]);
  const interiorOpacity = useTransform(mouth, [0, 0.15, 1], [0, 0.85, 1]);
  const lowerLipPath = useTransform(
    [lowerLipY, lowerLipCurve] as const,
    ([y, c]) => `M 84 158 Q 100 ${y as number} 116 158 Q 100 ${(y as number) - (c as number)} 84 158 Z`
  );

  if (status === "speaking") {
    return (
      <g>
        {/* Mouth interior (dark) */}
        <motion.path
          d="M 84 158 Q 100 166 116 158 Q 100 162 84 158 Z"
          fill="#1a0e08"
          style={{ opacity: interiorOpacity }}
        />
        {/* Upper lip */}
        <path
          d="M 84 158 Q 92 154 100 156 Q 108 154 116 158 Q 108 156 100 156 Q 92 156 84 158 Z"
          fill="#a04a3c"
        />
        {/* Lower lip — animates */}
        <motion.path
          d={lowerLipPath}
          fill="#b85a48"
        />
        {/* Teeth hint */}
        <motion.rect
          x="92"
          y="158"
          width="16"
          height="2.5"
          rx="1"
          fill="#f5ebd8"
          style={{ opacity: interiorOpacity }}
        />
      </g>
    );
  }

  if (status === "listening") {
    return (
      <g>
        {/* Slightly parted, expectant */}
        <path
          d="M 86 158 Q 100 156 114 158 Q 100 160 86 158 Z"
          fill="#a04a3c"
        />
        <ellipse cx="100" cy="161" rx="9" ry="2.5" fill="#1a0e08" opacity="0.7" />
        <path d="M 88 161 Q 100 163 112 161" stroke="#b85a48" strokeWidth="2" fill="none" />
      </g>
    );
  }

  if (status === "thinking") {
    return (
      <g>
        {/* Pursed mouth slightly to one side */}
        <path
          d="M 90 161 Q 100 158 110 162"
          fill="none"
          stroke="#8a3a2c"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="111" cy="161" r="1.5" fill="#8a3a2c" />
      </g>
    );
  }

  if (status === "error") {
    return (
      <g>
        <path
          d="M 86 164 Q 100 156 114 164"
          fill="none"
          stroke="#8a3a2c"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    );
  }

  // idle — gentle smile
  return (
    <g>
      <path
        d="M 86 158 Q 100 168 114 158"
        fill="none"
        stroke="#8a3a2c"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 90 159 Q 100 162 110 159"
        fill="none"
        stroke="#b85a48"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>
  );
}
