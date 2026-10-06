import { useEffect, useRef } from "react";

const SPEED = 52; // px per second the strip scrolls left
const MAX_ANGLE = 70; // card is almost edge-on at the screen edges
const DEG_PER_PX = 0.13; // how fast the tilt grows with distance from center
const COPIES = 3; // repeats of the item list so the strip always fills the screen

const fallbacks = [
  "from-sky-500/40 to-indigo-600/40",
  "from-fuchsia-500/40 to-purple-600/40",
  "from-emerald-500/40 to-teal-600/40",
];

// A strip of cards scrolls sideways forever; every frame each card's Y-rotation is
// recomputed from its distance to the screen center, so cards swing from edge-on at the
// sides to flat in the middle — it reads as a rotating, curved wall.
export default function CurvedCarousel({ items }) {
  const wrapRef = useRef(null);
  const cardRefs = useRef([]);
  const list = Array.from({ length: COPIES }).flatMap(() => items);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let raf;
    let last = performance.now();
    let offset = 0;
    let t = 0;

    const loop = (now) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;

      const vw = wrap.clientWidth;
      const W = Math.min(Math.max(vw * 0.22, 150), 320);
      const H = W * 0.72;
      const step = W * 1.18;
      const period = step * items.length;
      if (!reduce) offset = (offset + SPEED * dt) % period;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const x = i * step - offset - period * 0.25;
        const angle = Math.max(
          -MAX_ANGLE,
          Math.min(MAX_ANGLE, (x + W / 2 - vw / 2) * -DEG_PER_PX),
        );
        const y = reduce ? 0 : Math.sin(t * 0.9 + i * 1.3) * 7;
        el.style.width = `${W}px`;
        el.style.height = `${H}px`;
        el.style.top = `calc(50% - ${H / 2}px)`;
        el.style.transform = `translate3d(${x}px, ${y}px, ${-Math.abs(angle) * 1.6}px) rotateY(${angle}deg)`;
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [items.length]);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 select-none overflow-hidden"
      style={{
        perspective: 1100,
        perspectiveOrigin: "50% 45%",
        WebkitMaskImage:
          "linear-gradient(transparent 0%, #000 12%, #000 90%, transparent 100%)",
        maskImage:
          "linear-gradient(transparent 0%, #000 12%, #000 90%, transparent 100%)",
      }}
    >
      {list.map((p, i) => (
        <div
          key={`${p.id}-${i}`}
          ref={(el) => (cardRefs.current[i] = el)}
          className="absolute left-0 overflow-hidden rounded-2xl border border-white/15 bg-slate-900/70 shadow-[0_18px_50px_rgba(0,0,0,0.55)] will-change-transform"
          style={{ backfaceVisibility: "hidden" }}
        >
          {p.image ? (
            <img
              src={p.image}
              alt={p.title}
              draggable={false}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div
              className={`grid h-full w-full place-items-center bg-gradient-to-br ${fallbacks[i % 3]} p-3 text-center`}
            >
              <span className="font-figtree text-base font-bold text-white/90">
                {p.title}
              </span>
            </div>
          )}
          <span className="absolute left-2 top-2 animate-sparkle-spin text-xs text-white/80">
            ✦
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-white/5" />
        </div>
      ))}
    </div>
  );
}
