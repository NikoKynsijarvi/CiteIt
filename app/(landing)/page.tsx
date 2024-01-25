"use client";
import LandingNavbar from "@/components/landingnavbar";
import LandingHero from "@/components/landing-hero";
import { useEffect } from "react";

const LandingPage = () => {
  useEffect(() => {
    localStorage.removeItem("currentChat");
  });
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
    </div>
  );
};

export default LandingPage;
