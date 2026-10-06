import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiFileText, FiGithub, FiLinkedin, FiMail, FiSend, FiX } from "react-icons/fi";
import { availableFor, profile } from "../data/content";

const links = [
  { label: "LinkedIn", href: profile.linkedin, Icon: FiLinkedin },
  { label: "Gmail", href: `mailto:${profile.email}`, Icon: FiMail },
  { label: "GitHub", href: profile.github, Icon: FiGithub },
  { label: "Resume", href: profile.resume, Icon: FiFileText, download: "Gauri_Pawar_Resume.docx" },
];

export default function Connect() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setSending(true);
    try {
      const res = await fetch(profile.formEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        toast.success("Message sent successfully");
        form.reset();
        setOpen(false);
      } else {
        toast.error("Failed to send. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const field =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-accent";

  return (
    <section
      id="connect"
      className="relative px-5 pb-7 pt-32 sm:px-8 sm:pb-8 sm:pt-36 md:px-10 md:pb-10 md:pt-44"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-figtree text-xs font-bold uppercase tracking-[0.35em] text-accent"
        >
          Available for
        </motion.p>

        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
          {availableFor.map((a, i) => (
            <motion.span
              key={a}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3, borderColor: "rgba(56,189,248,0.6)" }}
              className="glass rounded-full px-4 py-2 font-figtree text-[11px] font-bold uppercase tracking-widest text-sky-200"
            >
              {a}
            </motion.span>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="metal-text mt-10 font-inter text-5xl font-black uppercase leading-[0.95] sm:text-7xl md:text-8xl"
        >
          Let&apos;s build
          <br />
          something amazing
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-body"
        >
          I&apos;m open to UI/UX and frontend projects — landing pages, redesigns, or
          collaborations. Tell me what you&apos;re building.
        </motion.p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="btn-glow inline-flex h-14 items-center gap-2.5 rounded-full px-8 font-figtree text-sm font-bold uppercase tracking-wider"
          >
            <FiSend /> Send message
          </motion.button>
          {links.map(({ label, href, Icon, download }) => (
            <motion.a
              key={label}
              href={href}
              download={download}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="glass inline-flex h-14 items-center gap-2 rounded-full px-6 font-figtree text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-accent/60"
            >
              <Icon className="text-accent" /> {label}
            </motion.a>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-28 max-w-5xl border-t border-white/10 pt-6 text-center font-figtree text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        Designed &amp; built by {profile.name} © {new Date().getFullYear()}. Built with React, Tailwind
        and Framer Motion.
      </p>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[90] grid place-items-center bg-ink/80 px-5 backdrop-blur-md"
          >
            <motion.form
              onSubmit={handleSubmit}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="glass w-full max-w-lg space-y-4 rounded-[24px] bg-[#0b1220]/90 p-6 text-left"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-figtree text-xl font-extrabold">Send a message</h3>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-slate-400 hover:text-white">
                  <FiX size={20} />
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Name *" className={field} />
                <input name="email" type="email" required placeholder="Email *" className={field} />
              </div>
              <input name="subject" placeholder="Subject" className={field} />
              <textarea name="message" rows="4" required placeholder="Tell me about your project... *" className={field} />
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-glow h-12 w-full rounded-full font-figtree text-sm font-bold uppercase tracking-wider disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send message →"}
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
