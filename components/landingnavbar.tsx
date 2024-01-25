"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

function LandingNavbar() {
  const { isSignedIn } = useAuth();
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link className="flex items-center" href="/">
        <div className="relative h-8 w-8 mr-4"></div>
        <h1 className={cn("font-bold text-orange-500 text-2xl")}>CiteIt</h1>
      </Link>
      <div className="flex w-1/6  justify-between ">
        <div className="flex items-center gap-x-2 ">
          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <Button
              variant="outline"
              className="rounded-full bg-orange-500 text-white"
            >
              Sign in
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-x-2 ">
          <Link href={isSignedIn ? "/dashboard" : "sign-up"}>
            <Button
              variant="outline"
              className="rounded-full bg-orange-500 text-white"
            >
              Get started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default LandingNavbar;
