import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaGitAlt, FaJs, FaReact } from "react-icons/fa";
import { SiRedux, SiTailwindcss } from "react-icons/si";
import { about } from "../data/content";

const toolBadges = [
  { Icon: FaReact, name: "React", color: "#61dafb" },
  { Icon: FaJs, name: "JavaScript", color: "#f7df1e" },
  { Icon: SiRedux, name: "Redux", color: "#a78bfa" },
  { Icon: SiTailwindcss, name: "Tailwind", color: "#38bdf8" },
  { Icon: FaGitAlt, name: "Git", color: "#f05032" },
];

function Word({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

function CountUp({ to, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => c.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function About() {
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = about.paragraph.split(" ");

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-24 sm:px-8 md:px-10"
    >
      {/* tool badges */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
        {toolBadges.map(({ Icon, name, color }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -8, rotate: i % 2 ? 6 : -6 }}
            title={name}
            className="glass grid h-14 w-14 place-items-center rounded-2xl"
          >
            <Icon size={26} style={{ color }} />
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-4 font-caveat text-3xl text-sky-300"
      >
        About me
      </motion.p>

      <p
        ref={textRef}
        className="mx-auto max-w-4xl text-center text-xl leading-[1.6] text-body sm:text-2xl md:text-[28px]"
      >
        {words.map((w, i) => {
          const start = i / words.length;
          const end = start + 1.4 / words.length;
          return (
            <Word
              key={i}
              range={[start, Math.min(end, 1)]}
              progress={scrollYProgress}
            >
              {w}
            </Word>
          );
        })}
      </p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-10 max-w-2xl text-center font-caveat text-2xl text-sky-300/80 sm:text-3xl"
      >
        “{about.quote}”
      </motion.p>

      <div className="mt-16 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
        {about.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            whileHover={{ y: -8, borderColor: "rgba(56,189,248,0.5)" }}
            className="glass rounded-[20px] p-6 text-center transition-shadow hover:shadow-[0_20px_50px_rgba(56,189,248,0.15)]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">
              {s.label}
            </p>
            <p className="mt-2 font-figtree text-5xl font-black text-white">
              <CountUp
                to={s.value}
                decimals={s.decimals ?? 0}
                suffix={s.suffix}
              />
            </p>
            <p className="mt-1 text-sm text-body">{s.caption}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
