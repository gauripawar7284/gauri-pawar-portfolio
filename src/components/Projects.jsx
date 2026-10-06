import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiCode,
  FiLayout,
  FiLock,
  FiSearch,
  FiSend,
  FiTarget,
} from "react-icons/fi";
import { process, projects } from "../data/content";

const stepIcons = [FiSearch, FiTarget, FiCode, FiLayout, FiCheckCircle, FiSend];

const accents = [
  { text: "text-sky-600", from: "from-sky-100", to: "to-indigo-200" },
  { text: "text-fuchsia-600", from: "from-fuchsia-100", to: "to-purple-200" },
  { text: "text-emerald-600", from: "from-emerald-100", to: "to-teal-200" },
  { text: "text-amber-600", from: "from-amber-100", to: "to-orange-200" },
  { text: "text-rose-600", from: "from-rose-100", to: "to-pink-200" },
];

function ShelfCard({ project, index, pos, step }) {
  const x = useTransform([pos, step], ([p, s]) => (index - p) * s);
  const rotateY = useTransform(pos, (p) =>
    Math.max(-42, Math.min(42, (index - p) * -22)),
  );
  const rotateZ = useTransform(pos, (p) => (index - p) * 2.4);
  const scale = useTransform(
    pos,
    (p) => 1 - Math.min(Math.abs(index - p), 1.6) * 0.1,
  );
  const opacity = useTransform(
    pos,
    (p) => 1 - Math.min(Math.abs(index - p), 2.2) * 0.3,
  );
  const zIndex = useTransform(
    pos,
    (p) => 20 - Math.round(Math.abs(index - p) * 4),
  );

  const a = accents[index % accents.length];
  const Wrapper = project.link ? motion.a : motion.div;
  const linkProps = project.link
    ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...linkProps}
      style={{
        x,
        rotateY,
        rotateZ,
        scale,
        opacity,
        zIndex,
        transformOrigin: "50% 100%",
      }}
      whileHover={{ y: -8 }}
      className="group absolute bottom-7 left-1/2 ml-[calc(min(78vw,360px)/-2)] block w-[min(78vw,360px)] rounded-[26px] border border-white/60 bg-[#f4f7fb] p-2.5 text-[#0b1220] shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
    >
      {/* image height follows the screen height so the card never runs into the header */}
      <div
        className={`relative h-[clamp(110px,24vh,210px)] overflow-hidden rounded-[18px] bg-gradient-to-br ${a.from} ${a.to}`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} cover`}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center px-6 text-center font-figtree text-2xl font-extrabold text-[#0b1220]/70">
            {project.title}
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/90 px-2.5 py-1 font-figtree text-[10px] font-bold uppercase tracking-wide text-[#33506b] shadow"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="px-3 pb-2.5 pt-3">
        <p
          className={`font-figtree text-[11px] font-bold tracking-[0.2em] ${a.text}`}
        >
          {String(index + 1).padStart(2, "0")}
          <span className="text-slate-400"> / {project.year}</span>
        </p>
        <h3 className="mt-0.5 font-figtree text-lg font-extrabold leading-tight">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-slate-500">
          {project.description}
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors group-hover:text-[#0b1220]">
          {project.isPrivate ? (
            <>
              <FiLock size={13} /> internal tool · private
            </>
          ) : (
            <>
              view project
              <FiArrowRight className="transition-transform group-hover:translate-x-1.5" />
            </>
          )}
        </p>
      </div>
    </Wrapper>
  );
}

function Dot({ index, pos }) {
  const width = useTransform(pos, (p) => (Math.abs(index - p) < 0.5 ? 28 : 8));
  const opacity = useTransform(pos, (p) =>
    Math.abs(index - p) < 0.5 ? 1 : 0.35,
  );
  return (
    <motion.span
      style={{ width, opacity }}
      className="h-2 rounded-full bg-accent"
    />
  );
}

export default function Projects() {
  const N = projects.length;
  const ref = useRef(null);
  const step = useMotionValue(440);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const pos = useTransform(scrollYProgress, [0.04, 0.96], [0, N - 1]);

  useEffect(() => {
    const set = () => step.set(Math.min(window.innerWidth * 0.62, 450));
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, [step]);

  return (
    <section
      id="projects"
      ref={ref}
      style={{ height: `${N * 80 + 100}vh` }}
      className="relative z-10"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-[88px]">
        {/* compact header: badge + title + one-row process strip */}
        <div className="mx-auto w-full max-w-5xl px-5 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass inline-block rounded-full px-4 py-1 font-figtree text-[11px] font-bold uppercase tracking-[0.25em] text-sky-300"
          >
            Selected work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="metal-text mt-2 font-inter text-3xl font-black sm:text-4xl"
          >
            Project Shelf
          </motion.h2>

          <div className="glass mt-4 hidden grid-cols-6 gap-2 rounded-2xl px-3 py-2.5 text-left sm:grid [@media(max-height:680px)]:hidden">
            {process.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-2 px-1"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-accent/40 bg-[#0b1626] text-accent">
                    <Icon size={13} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-figtree text-[11px] font-extrabold uppercase tracking-wider text-white">
                      {String(i + 1).padStart(2, "0")} {s.title}
                    </span>
                    <span className="hidden truncate text-[10px] leading-tight text-muted lg:block">
                      {s.text}
                    </span>
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* cards stand on the shelf, in whatever space is left under the header */}
        <div
          className="relative mt-3 min-h-0 flex-1"
          style={{ perspective: 1600 }}
        >
          {projects.map((p, i) => (
            <ShelfCard key={p.id} project={p} index={i} pos={pos} step={step} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[10px] z-30 flex items-center justify-center gap-2">
          {projects.map((p, i) => (
            <Dot key={p.id} index={i} pos={pos} />
          ))}
        </div>
        <div className="pointer-events-none absolute right-6 top-24 z-30 hidden items-center gap-2 text-xs uppercase tracking-widest text-muted xl:flex">
          scroll <span className="animate-hint-bob text-accent">→</span>
        </div>

        {/* wooden shelf */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-7 border-t border-[#6b4a32] bg-gradient-to-b from-[#3b2a1f] to-[#160d08] shadow-[0_-10px_30px_rgba(0,0,0,0.6)]" />
      </div>
    </section>
  );
}
