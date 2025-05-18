"use client";

import Header from "@/components/landingpage/header";
import Hero from "./hero";

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white relative">
      {/* Dark themed background with more visual interest */}
      <div className="fixed inset-0 -z-10 bg-black">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0721] via-black to-[#0f0721] opacity-80"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiM5MzMzZWEiIGZpbGwtb3BhY2l0eT0iMC4wMiIgZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yIDBIMzZ2MWgtMXYtMXptLTIgMThoMXYxaC0xdi0xem0yIDBIMzZ2MWgtMXYtMXptMCAyaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yIDBIMzZ2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bTQtMTZoMXYxaC0xdi0xem0wIDE2aDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6Ii8+PHBhdGggZmlsbD0iIzkzMzNlYSIgZmlsbC1vcGFjaXR5PSIwLjA1IiBkPSJNMzQgMzZoMXYxaC0xdi0xem0wLThoMXYxaC0xdi0xem0wIDE4aDF2MWgtMXYtMXptMC0yaDF2MWgtMXYtMXptMC0xNmgxdjFoLTF2LTF6bTAtMmgxdjFoLTF2LTF6bTAtMmgxdjFoLTF2LTF6Ii8+PHBhdGggZmlsbD0iIzkzMzNlYSIgZmlsbC1vcGFjaXR5PSIwLjEiIGQ9Ik0zMiAyOGgxdjFoLTF2LTF6bTAgMmgxdjFoLTF2LTF6bTAgMmgxdjFoLTF2LTF6bTAgMmgxdjFoLTF2LTF6bTAgMmgxdjFoLTF2LTF6bTAgMmgxdjFoLTF2LTF6bTAgMmgxdjFoLTF2LTF6bTAgMmgxdjFoLTF2LTF6bTAgMmgxdjFoLTF2LTF6bTAgMmgxdjFoLTF2LTF6bTAgMmgxdjFoLTF2LTF6bTAgMmgxdjFoLTF2LTF6Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-900/10 blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-800/10 blur-[100px]"></div>

        {/* Subtle animated stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-purple-300 animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 5 + 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />
      </div>
  );
}