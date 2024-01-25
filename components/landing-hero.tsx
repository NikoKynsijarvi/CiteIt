"use client";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import TypewriterComponent from "typewriter-effect";

function LandingHero() {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-orange-500 font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The best AI tool for</h1>
        <div className=" text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500 ">
          <TypewriterComponent
            options={{
              strings: ["Article summaries.", "Notes.", "Citations."],
              loop: true,
              autoStart: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingHero;
