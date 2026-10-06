import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiFileText, FiMenu, FiX } from "react-icons/fi";
import { profile } from "../data/content";

const links = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "expertise", label: "Expertise" },
  { id: "connect", label: "Connect" },
];

export default function Navbar({ visible }) {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="w-fit max-w-full rounded-[20px] border border-white/10 bg-[rgba(9,14,26,0.94)] shadow-[0_14px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <div className="flex items-center justify-between gap-4 px-5 py-2.5">
          <a
            href="#top"
            className="shrink-0 text-lg font-black tracking-tight text-white"
          >
            {profile.initials}
            <span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-5 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`font-figtree text-[13px] font-semibold uppercase tracking-wider transition-colors hover:text-white ${
                    active === l.id ? "text-accent" : "text-slate-300"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <motion.a
              href={profile.resume}
              download="Gauri_Pawar_Resume.docx"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 font-figtree text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-accent/60"
            >
              <FiFileText className="text-accent" /> Resume
            </motion.a>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
              className="grid h-9 w-9 place-items-center rounded-xl text-white md:hidden"
            >
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/10 md:hidden"
            >
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block px-6 py-3 font-figtree text-sm font-semibold uppercase tracking-wider ${
                      active === l.id ? "text-accent" : "text-slate-300"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
