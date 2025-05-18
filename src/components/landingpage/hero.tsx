import Image from "next/image"
import { Video, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatusBadge from "./status-badge"
import Link from "next/link"
import UniversityLogoScroll from "../UniversityLogoScroll"
import AnimatedTitle from "./animated-title"

export default function Hero() {
  return (
    <section className="relative z-10 min-h-[90vh] flex flex-col justify-center items-center pt-16 pb-8 px-4">
      <div className="container mx-auto flex flex-col items-center">
        {/* Main content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center mb-16">
          <StatusBadge />

          <AnimatedTitle />

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 animate-fade-in-delay">
            Video chat with random students from different schools. Make new friends, have fun conversations, and expand
            your college network - all in a safe environment exclusive to verified college students.
          </p>

          <Button className="bg-purple-600 hover:bg-purple-700 h-14 px-8 text-lg font-medium transition-all duration-300 transform hover:scale-105 animate-fade-in-delay-2">
            Start Video Calling
          </Button>
        </div>

        {/* Video preview */}
        <div className="relative w-full max-w-5xl h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-2xl shadow-purple-900/30 animate-fade-in-delay-3 border border-purple-800/30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black/90 z-10 rounded-xl"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative w-20 h-20 bg-purple-700 rounded-full flex items-center justify-center animate-pulse">
                  <Video className="h-10 w-10" />
                </div>
              </div>
              <h3 className="text-2xl font-bold">Live Video Chat</h3>
              <p className="text-gray-300 max-w-md mx-auto px-4">
                Connect instantly with students from top universities across the country
              </p>
            </div>
          </div>
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/60"></div>
            <Image
              src="/placeholder.svg?height=500&width=800"
              alt="College students having fun"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Stats section */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 mb-4 px-4">
          {[
            { value: "10K+", label: "Active Users" },
            { value: "500+", label: "Universities" },
            { value: "1M+", label: "Connections" },
            { value: "4.8", label: "Star Rating" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 bg-black/40 backdrop-blur-sm rounded-lg border border-purple-800/30"
            >
              <div className="text-2xl md:text-3xl font-bold text-purple-400">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Link href="#features">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <ChevronDown className="h-6 w-6" />
            </Button>
          </Link>
        </div>
        <UniversityLogoScroll />
      </div>
    </section>
  )
}
