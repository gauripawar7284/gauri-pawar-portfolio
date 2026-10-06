import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import { SiAxios, SiMongodb, SiRedux, SiTailwindcss } from "react-icons/si";
import { expertise, tools } from "../data/content";

const toolIcons = {
  HTML: [FaHtml5, "#e34f26"],
  CSS: [FaCss3Alt, "#1572b6"],
  JavaScript: [FaJs, "#d4b800"],
  React: [FaReact, "#0ea5e9"],
  Redux: [SiRedux, "#764abc"],
  "Tailwind CSS": [SiTailwindcss, "#06b6d4"],
  Axios: [SiAxios, "#5a29e4"],
  "Node.js": [FaNodeJs, "#3c873a"],
  MongoDB: [SiMongodb, "#47a248"],
  Git: [FaGitAlt, "#f05032"],
  GitHub: [FaGithub, "#0b1220"],
};

/* ---- tiny UI mockups, one per expertise card ---- */
function CodeMock() {
  const lines = [
    ["#7c3aed", "w-10"],
    ["#0ea5e9", "w-24"],
    ["#10b981", "w-16"],
    ["#f59e0b", "w-28"],
    ["#0ea5e9", "w-12"],
  ];
  return (
    <div className="w-[78%] rounded-xl bg-[#0b1220] p-3 shadow-lg">
      <div className="mb-2 flex gap-1.5">
        {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
          <span
            key={c}
            className="h-2 w-2 rounded-full"
            style={{ background: c }}
          />
        ))}
      </div>
      {lines.map(([c, w], i) => (
        <motion.div
          key={i}
          initial={{ width: 0 }}
          whileInView={{ width: "auto" }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          className={`mb-1.5 h-1.5 rounded-full ${w}`}
          style={{ background: c, marginLeft: i % 2 ? 14 : 0 }}
        />
      ))}
    </div>
  );
}

function DevicesMock() {
  return (
    <div className="flex items-end gap-2">
      {[
        ["h-24 w-10", 0],
        ["h-16 w-24", 0.15],
        ["h-20 w-16", 0.3],
      ].map(([c, d], i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, delay: d }}
          className={`${c} rounded-lg border-2 border-[#0b1220] bg-white p-1.5 shadow`}
        >
          <div className="mb-1 h-1.5 w-1/2 rounded bg-sky-400" />
          <div className="h-1 rounded bg-slate-200" />
          <div className="mt-1 h-1 w-2/3 rounded bg-slate-200" />
        </motion.div>
      ))}
    </div>
  );
}

function ApiMock() {
  return (
    <div className="w-[82%] space-y-2 font-mono text-[10px]">
      <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow">
        <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-bold text-emerald-600">
          GET
        </span>
        <span className="text-slate-500">/api/campaigns</span>
      </div>
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="rounded-lg bg-[#0b1220] px-3 py-2 text-sky-300 shadow"
      >
        {"{ status: 200, data: [...] }"}
      </motion.div>
    </div>
  );
}

function StackMock() {
  return (
    <div className="flex flex-col items-center gap-2">
      {["React UI", "Express API", "MongoDB"].map((l, i) => (
        <motion.div
          key={l}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className="rounded-lg bg-white px-4 py-1.5 font-figtree text-[11px] font-bold text-[#0b1220] shadow"
          style={{ width: 120 - i * 14 }}
        >
          <span className="text-center block">{l}</span>
        </motion.div>
      ))}
    </div>
  );
}

function PerfMock() {
  return (
    <div className="flex h-24 items-end gap-2">
      {[38, 62, 48, 82, 95].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.7 }}
          className="w-7 rounded-t-md bg-gradient-to-t from-sky-500 to-sky-300"
        />
      ))}
    </div>
  );
}

function AgileMock() {
  return (
    <div className="flex gap-2">
      {[
        ["To do", 2],
        ["Doing", 1],
        ["Done", 3],
      ].map(([t, n]) => (
        <div key={t} className="w-[70px] rounded-lg bg-white/70 p-1.5">
          <p className="mb-1 font-figtree text-[9px] font-bold uppercase text-slate-500">
            {t}
          </p>
          {Array.from({ length: n }).map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 3 }}
              className="mb-1 h-4 rounded bg-white shadow-sm"
              style={{
                borderLeft: `3px solid ${["#38bdf8", "#f59e0b", "#10b981"][n - 1]}`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const mocks = {
  frontend: CodeMock,
  responsive: DevicesMock,
  api: ApiMock,
  fullstack: StackMock,
  perf: PerfMock,
  agile: AgileMock,
};

function Marquee({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="group flex overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div
        className={`flex shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((name, i) => {
          const [Icon, color] = toolIcons[name] ?? [null, "#0b1220"];
          return (
            <div
              key={i}
              className="flex shrink-0 items-center gap-2.5 rounded-2xl border border-white/70 bg-white/70 px-5 py-3 font-figtree text-sm font-bold text-[#0b1220] shadow-sm backdrop-blur"
            >
              {Icon && <Icon size={18} style={{ color }} />}
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Expertise() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <>
      <section
        id="expertise"
        ref={ref}
        className="relative z-20 -mt-12 overflow-hidden rounded-t-[40px] bg-sky-200 px-5 pb-12 pt-16 text-ink sm:rounded-t-[50px] sm:px-8 sm:pt-20 md:rounded-t-[60px] md:px-10"
      >
        <motion.h2
          style={{ y: headY }}
          className="select-none text-center font-inter text-[clamp(44px,9vw,120px)] font-black uppercase leading-[0.9] tracking-tight text-[#33506b]/40"
        >
          Expertise
        </motion.h2>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((e, i) => {
            const Mock = mocks[e.id];
            return (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white p-3 shadow-[0_10px_30px_rgba(51,80,107,0.16)]"
              >
                <div className="relative grid h-32 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-sky-100">
                  <div className="origin-center scale-[0.78]">
                    <Mock />
                  </div>
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 opacity-0 transition-opacity group-hover:animate-slab-light group-hover:opacity-100" />
                </div>
                <h3 className="mt-3 font-figtree text-base font-extrabold">
                  {e.title}
                </h3>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                  {e.metric}
                </p>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* tools marquee — sits in the same light panel */}
      <section className="relative z-20 overflow-hidden bg-sky-200 px-5 pb-14 pt-4 text-ink sm:px-8 sm:pb-16 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-caveat text-2xl text-[#33506b]"
        >
          Stack
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-center font-inter text-2xl font-extrabold tracking-tight sm:text-4xl"
        >
          “Tools I Build With”
        </motion.h2>
        <Marquee items={tools} />
        <Marquee items={[...tools].reverse()} reverse />
      </section>
    </>
  );
}
