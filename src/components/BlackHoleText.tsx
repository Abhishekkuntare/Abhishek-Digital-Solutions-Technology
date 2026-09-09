import React, { useEffect, useRef } from "react";

interface BlackHoleTextProps {
  text: string;
  className?: string;
}

const BlackHoleText: React.FC<BlackHoleTextProps> = ({
  text,
  className = "",
}) => {
  const holeRef = useRef<HTMLSpanElement>(null);
  const torchRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hole = holeRef.current;
    const torch = torchRef.current;
    const glow = glowRef.current;

    if (!hole || !torch || !glow) return;

    let frame = 0;
    let startTime: number | null = null;

    const delay = 900;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;

      const elapsed = time - startTime;

      if (elapsed < delay) {
        frame = requestAnimationFrame(animate);
        return;
      }

      const t = (elapsed - delay) / 1000;

      /*
       * Move across the COMPLETE phrase.
       *
       * 0%   = Ready
       * 25%  = for
       * 50%  = the
       * 75%  = World
       * 100% = World
       *
       * Smooth ping-pong movement.
       */
      const cycle = (t / 5) % 2;

      const progress =
        cycle <= 1
          ? cycle
          : 2 - cycle;

      /*
       * Slight vertical movement so it feels
       * like gravity instead of a straight scanner.
       */
      const x = 3 + progress * 94;

      const y =
        50 +
        Math.sin(t * 2.2) * 8;

      /*
       * Very subtle size breathing.
       */
      const scale =
        1 + Math.sin(t * 2.5) * 0.06;

      /*
       * BLACK HOLE
       */
      hole.style.transform = `
        translate3d(${x}%, ${y}%, 0)
        translate(-50%, -50%)
        scale(${scale})
      `;

      /*
       * TORCH follows the black hole.
       */
      torch.style.transform = `
        translate3d(${x}%, ${y}%, 0)
        translate(-50%, -50%)
      `;

      /*
       * Wide atmospheric glow.
       */
      glow.style.transform = `
        translate3d(${x}%, ${y}%, 0)
        translate(-50%, -50%)
      `;

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span
      className={`
        relative
        inline-block
        whitespace-nowrap
        ${className}
      `}
    >
      {/* =====================================
          WIDE COSMIC ATMOSPHERE
      ====================================== */}
      <span
        ref={glowRef}
        className="
          pointer-events-none
          absolute
          left-0
          top-1/2
          z-0
          h-[180px]
          w-[180px]
          rounded-full
          will-change-transform
          opacity-60
          blur-2xl
        "
        style={{
          background: `
            radial-gradient(
              circle,
              rgba(34,211,238,0.20) 0%,
              rgba(59,130,246,0.12) 30%,
              transparent 72%
            )
          `,
        }}
      />

      {/* =====================================
          BLACK HOLE
      ====================================== */}
      <span
        ref={holeRef}
        className="
          pointer-events-none
          absolute
          left-0
          top-1/2
          z-10
          h-[68px]
          w-[68px]
          rounded-full
          will-change-transform
        "
      >
        {/* Outer gravitational ring */}
        <span
          className="
            absolute
            inset-[-24px]
            rounded-full
            border
            border-cyan-400/20
            shadow-[0_0_35px_rgba(34,211,238,0.25)]
          "
        />

        {/* Rotating ring */}
        <span
          className="
            absolute
            inset-[-15px]
            rounded-full
            border-2
            border-cyan-300/40
            border-r-transparent
            border-b-transparent
            animate-[spin_2.5s_linear_infinite]
          "
        />

        {/* Blue gravitational ring */}
        <span
          className="
            absolute
            inset-[-8px]
            rounded-full
            border
            border-blue-400/40
            border-l-transparent
            border-t-transparent
            animate-[spin_1.8s_linear_infinite_reverse]
          "
        />

        {/* Accretion disk */}
        <span
          className="
            absolute
            inset-[-3px]
            rounded-full
            border-[3px]
            border-cyan-300/50
            blur-[3px]
          "
        />

        {/* BLACK CENTER */}
        <span
          className="
            absolute
            inset-[9px]
            rounded-full
            bg-black
            shadow-[0_0_20px_8px_rgba(0,0,0,0.95),
                     0_0_45px_10px_rgba(34,211,238,0.32),
                     0_0_80px_15px_rgba(59,130,246,0.18)]
          "
        />

        {/* Event horizon */}
        <span
          className="
            absolute
            inset-[15px]
            rounded-full
            bg-black
          "
        />
      </span>

      {/* =====================================
          TORCH / SPOTLIGHT
      ====================================== */}
      <span
        ref={torchRef}
        className="
          pointer-events-none
          absolute
          left-0
          top-1/2
          z-20
          h-[150px]
          w-[150px]
          rounded-full
          will-change-transform
          opacity-70
          blur-[2px]
        "
        style={{
          background: `
            radial-gradient(
              circle,
              rgba(255,255,255,0.16) 0%,
              rgba(34,211,238,0.13) 18%,
              rgba(59,130,246,0.07) 40%,
              transparent 72%
            )
          `,
        }}
      />

      {/* =====================================
          TEXT
      ====================================== */}
      <span
        className="
          relative
          z-30
          inline-block
          bg-gradient-to-r
          from-cyan-400
          via-sky-300
          to-blue-500
          bg-clip-text
          text-transparent
          drop-shadow-[0_0_10px_rgba(34,211,238,0.20)]
        "
      >
        {text}
      </span>

      {/* =====================================
          SMALL COSMIC PARTICLES
      ====================================== */}

      <span
        className="
          pointer-events-none
          absolute
          left-[8%]
          top-[15%]
          z-20
          h-1
          w-1
          rounded-full
          bg-cyan-300
          shadow-[0_0_8px_rgba(34,211,238,1)]
          animate-pulse
        "
      />

      <span
        className="
          pointer-events-none
          absolute
          left-[38%]
          bottom-[8%]
          z-20
          h-[3px]
          w-[3px]
          rounded-full
          bg-blue-300
          shadow-[0_0_8px_rgba(59,130,246,1)]
          animate-pulse
        "
      />

      <span
        className="
          pointer-events-none
          absolute
          right-[10%]
          top-[18%]
          z-20
          h-1
          w-1
          rounded-full
          bg-cyan-200
          shadow-[0_0_8px_rgba(34,211,238,1)]
          animate-pulse
        "
      />
    </span>
  );
};

export default BlackHoleText;