
"use client";

import { useState } from "react";
import GingerbreadCharacter from "@/components/characters/GingerbreadCharacter";

type AnimationType = "idle" | "dance";

export default function Home() {
  const [animation, setAnimation] = useState<AnimationType>("idle");

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#38221B] px-6 py-12">

      {/* HEADER */}
      <header className="mb-10 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.4em] text-[#E8C99D]">
          Welcome to
        </p>

        <h1 className="text-5xl font-bold text-[#F8EBDD]">
          Party Studio
        </h1>

        <p className="mt-4 text-[#E8C99D]">
          Create magical invitations for every occasion.
        </p>
      </header>

      {/* ANIMATION CONTROLLER */}
      <section className="mb-10 w-full max-w-xl rounded-2xl border border-[#E8C99D]/20 bg-[#4A2C23] p-5">

        <h2 className="mb-2 text-center text-xl font-semibold text-[#F8EBDD]">
          Character Animation
        </h2>

        <p className="mb-5 text-center text-sm text-[#E8C99D]">
          Choose how your Gingerbread characters move.
        </p>

        <div className="flex flex-wrap justify-center gap-3">

          <button
            type="button"
            onClick={() => setAnimation("idle")}
            aria-pressed={animation === "idle"}
            className={`rounded-full px-7 py-3 text-sm font-semibold transition ${
              animation === "idle"
                ? "bg-[#E8C99D] text-[#38221B]"
                : "border border-[#E8C99D]/40 text-[#F8EBDD] hover:bg-[#65402F]"
            }`}
          >
            ✨ Idle
          </button>

          <button
            type="button"
            onClick={() => setAnimation("dance")}
            aria-pressed={animation === "dance"}
            className={`rounded-full px-7 py-3 text-sm font-semibold transition ${
              animation === "dance"
                ? "bg-[#E8C99D] text-[#38221B]"
                : "border border-[#E8C99D]/40 text-[#F8EBDD] hover:bg-[#65402F]"
            }`}
          >
            🎄 Christmas Dance
          </button>

        </div>

        <p className="mt-4 text-center text-xs text-[#E8C99D]/80">
          Current animation: {animation === "idle" ? "Idle" : "Christmas Dance"}
        </p>
      </section>

      {/* CHARACTERS */}
      <section className="flex flex-wrap items-start justify-center gap-8 sm:gap-12">

        <GingerbreadCharacter
          variant="boy"
          name="Gingerbread Boy"
          animation={animation}
        />

        <GingerbreadCharacter
          variant="girl"
          name="Gingerbread Girl"
          animation={animation}
        />

      </section>

      {/* FOOTER */}
      <footer className="mt-12 text-center text-xs text-[#E8C99D]/60">
        Made with love at Party Studio
      </footer>

    </main>
  );
}
