"use client";

import Waitlist from "@/components/Waitlist";
import LandingPage from "@/components/landingpage/LandingPage";
import { useState } from "react";

export default function Home() {
  const [showWaitlist, setShowWaitlist] = useState(false);

  if (showWaitlist) {
    return (
      <div className="flex flex-col items-center justify-between min-h-screen bg-[#121212] text-white p-4 md:p-8 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col items-center w-full">
          <Waitlist />
        </main>
        {/* Contact Email - Non-overlapping Footer */}
        <div className="w-full text-center py-4 text-xs text-gray-500 mt-auto">
          <a href="mailto:dormroomsocial1@gmail.com" className="hover:text-[#A0FF00] transition-colors inline-block px-2 py-1">
            dormroomsocial1@gmail.com
          </a>
        </div>
      </div>
    );
  }

  // For LandingPage, just render it in an empty div (no extra styling)
  return (
    <div>
      <LandingPage />
    </div>
  );
}
