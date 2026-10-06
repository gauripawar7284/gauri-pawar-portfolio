/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", '"Noto Sans Devanagari"', "sans-serif"],
        figtree: ["Figtree", "Inter", "sans-serif"],
        caveat: ["Caveat", "ui-rounded", "cursive"],
      },
      colors: {
        ink: "#050810",
        accent: "#38bdf8",
        sky: { 200: "#bae6ff", 300: "#7dd3fc" },
        body: "#c9cdd6",
        muted: "#a1a1aa",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "hint-bob": {
          "0%,100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(8px)" },
        },
        "sparkle-spin": {
          "0%": { transform: "rotate(0deg) scale(1)", opacity: "0.6" },
          "50%": { transform: "rotate(90deg) scale(1.3)", opacity: "1" },
          "100%": { transform: "rotate(180deg) scale(1)", opacity: "0.6" },
        },
        "slab-light": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-reverse": "marquee-reverse 44s linear infinite",
        "hint-bob": "hint-bob 1.6s ease-in-out infinite",
        "sparkle-spin": "sparkle-spin 3.2s ease-in-out infinite",
        "slab-light": "slab-light 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
