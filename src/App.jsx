import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import ShutterIntro from "./components/ShutterIntro";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Expertise from "./components/Expertise";
import Connect from "./components/Connect";

export default function App() {
  const [started, setStarted] = useState(false);
  const [gone, setGone] = useState(false);

  // Deep links like /#connect can't scroll while the intro locks the page.
  useEffect(() => {
    if (gone && window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView();
    }
  }, [gone]);

  // `started` flips when the shutter begins rolling up, so the nav and hero
  // animate in underneath it; `gone` unmounts the shutter once it has left.
  return (
    <div className="grid-bg relative min-h-screen font-inter">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0b1220",
            color: "#fff",
            border: "1px solid #27272a",
          },
        }}
      />
      {!gone && (
        <ShutterIntro
          onStart={() => setStarted(true)}
          onOpen={() => setGone(true)}
        />
      )}
      <Navbar visible={started} />
      <main>
        <Hero ready={started} />
        <About />
        <Projects />
        <Expertise />
        <Connect />
      </main>
    </div>
  );
}
