import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const greetings = ["नमस्कार", "Hello", "नमस्ते", "Hola", "Bonjour"];

const slats =
  "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 14px)";

export default function ShutterIntro({ onStart, onOpen }) {
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (ready) return;
    if (step >= greetings.length - 1) {
      const t = setTimeout(() => setReady(true), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 480);
    return () => clearTimeout(t);
  }, [step, ready]);

  const open = () => {
    if (opening) return;
    setOpening(true);
    onStart();
    setTimeout(onOpen, 1100);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-ink"
      initial={{ y: 0 }}
      animate={{ y: opening ? "-100%" : 0 }}
      transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0" style={{ backgroundImage: slats }} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 38% at 50% 45%, rgba(56,189,248,0.45), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {!ready ? (
            <motion.div
              key="greeting"
              className="flex items-center gap-3 text-3xl font-bold text-white/55 sm:text-4xl"
            >
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_#38bdf8]" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={greetings[step]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {greetings[step]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <h1
                className="metal-text font-figtree text-5xl font-black uppercase tracking-tight sm:text-7xl"
                style={{ filter: "drop-shadow(0 0 28px rgba(56,189,248,0.45))" }}
              >
                “Pixels to Product”
              </h1>
              <div className="mt-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300 sm:text-sm">
                <span className="h-px w-12 bg-accent/70 sm:w-24" />
                <span className="animate-sparkle-spin text-accent">✦</span>
                <span>Where ideas become interfaces</span>
                <span className="animate-sparkle-spin text-accent">✦</span>
                <span className="h-px w-12 bg-accent/70 sm:w-24" />
              </div>
              <motion.button
                onClick={open}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="btn-glow mt-14 h-14 rounded-full px-10 font-figtree text-sm font-bold uppercase tracking-widest"
              >
                Open shutter
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* shutter bottom bar + handle */}
      <div className="absolute inset-x-0 bottom-0 h-5 border-t border-accent/60 bg-gradient-to-b from-slate-700 to-slate-900 shadow-[0_-6px_24px_rgba(56,189,248,0.35)]">
        <div className="absolute left-1/2 top-1.5 h-1.5 w-20 -translate-x-1/2 rounded-full bg-slate-500/70" />
      </div>
    </motion.div>
  );
}
