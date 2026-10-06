import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FiArrowDown,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { profile, projects } from "../data/content";
import CurvedCarousel from "./CurvedCarousel";

const socials = [
  { Icon: FiGithub, href: profile.github, label: "GitHub" },
  { Icon: FiLinkedin, href: profile.linkedin, label: "LinkedIn" },
  { Icon: FiMail, href: `mailto:${profile.email}`, label: "Email" },
  {
    Icon: FiPhone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    label: "Phone",
  },
];

export default function Hero({ ready }) {
  const mx = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18 });

  const carX = useTransform(sx, [-0.5, 0.5], [34, -34]);
  const portraitX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const textX = useTransform(sx, [-0.5, 0.5], [10, -10]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
  };
  const reset = () => mx.set(0);

  const show = (delay) => ({
    initial: { opacity: 0, y: 40 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="top"
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative h-screen min-h-[640px] overflow-hidden"
    >
      {/* curved project carousel */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 top-[12%] h-[38%]"
      >
        <motion.div
          style={{ x: carX }}
          className="absolute inset-y-0 -inset-x-12"
        >
          <CurvedCarousel items={projects} />
        </motion.div>
      </motion.div>

      {/* portrait */}
      <motion.div
        {...show(0.25)}
        className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[76%] justify-center"
      >
        <motion.div style={{ x: portraitX }} className="relative h-full">
          <div className="absolute inset-x-[-20%] bottom-0 top-[12%] rounded-full bg-accent/20 blur-[100px]" />
          <img
            src={profile.profileCutout}
            alt={profile.name}
            className="relative h-full w-auto max-w-none object-contain object-bottom"
            style={{
              filter:
                "drop-shadow(0 0 1px rgba(125,211,252,0.55)) drop-shadow(0 12px 40px rgba(56,189,248,0.22)) brightness(0.96) contrast(1.06)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 80%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, #000 80%, transparent 100%)",
            }}
          />
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      {/* left: greeting, title, CTA */}
      <motion.div
        style={{ x: textX }}
        className="absolute bottom-[9%] left-[6vw] z-20 max-w-[90vw]"
      >
        <motion.p
          {...show(0.45)}
          className="font-caveat text-3xl font-semibold text-sky-300 md:text-4xl"
        >
          Hi, I&apos;m {profile.firstName}
        </motion.p>
        <motion.h1
          {...show(0.55)}
          className="metal-text mt-1 font-inter text-4xl font-black uppercase leading-[0.98] sm:text-5xl lg:text-6xl"
        >
          {profile.tagline[0]}
          <br />
          {profile.tagline[1]}
        </motion.h1>
        <motion.a
          {...show(0.7)}
          href="#projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="btn-glow mt-6 inline-flex h-14 items-center gap-3 rounded-full px-7 font-figtree text-sm font-bold uppercase tracking-wider"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-white">
            <FiArrowDown size={14} />
          </span>
          View my work
        </motion.a>
      </motion.div>

      {/* right: intro + signature + socials */}
      <motion.div
        style={{ x: textX }}
        className="absolute bottom-[10%] right-[6vw] z-20 hidden max-w-[290px] md:block"
      >
        <motion.div {...show(0.6)}>
          <p className="text-sm leading-relaxed text-body">{profile.intro}</p>
          <p className="mt-3 text-sm leading-relaxed text-body">
            I build{" "}
            <strong className="font-semibold text-white">
              {profile.highlight}
            </strong>
            .
          </p>
        </motion.div>

        <motion.div {...show(0.8)} className="mt-5">
          <p className="font-caveat text-4xl font-bold text-white/90">
            {profile.name}
          </p>
          <svg viewBox="0 0 200 14" className="mt-0.5 h-3 w-40" fill="none">
            <motion.path
              d="M2 9 C 30 2, 60 14, 100 7 S 170 4, 198 8"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={ready ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 1.1 }}
            />
          </svg>
        </motion.div>

        <motion.div {...show(0.95)} className="mt-5 flex gap-3">
          {socials.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -4, scale: 1.12 }}
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-accent/60 hover:text-accent"
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
