"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="relative z-20 container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            DormParty<span className="text-purple-500">.live</span>
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white hover:bg-purple-900/50">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="#features">
            <Button variant="ghost" className="text-white hover:bg-purple-900/50 hover:text-purple-300">
              Features
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="ghost" className="text-white hover:bg-purple-900/50 hover:text-purple-300">
              How It Works
            </Button>
          </Link>
          <Link href="#video-demo">
            <Button variant="ghost" className="text-white hover:bg-purple-900/50 hover:text-purple-300">
              Demo
            </Button>
          </Link>
          <Link href="#get-started">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
          </Link>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full mt-2 px-4 py-2 bg-gray-900/95 backdrop-blur-sm border border-purple-900/30 rounded-lg shadow-lg z-30 animate-fade-in">
          <nav className="flex flex-col space-y-3 py-3">
            <Link href="#features" onClick={closeMenu}>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-purple-900/50 hover:text-purple-300"
              >
                Features
              </Button>
            </Link>
            <Link href="#how-it-works" onClick={closeMenu}>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-purple-900/50 hover:text-purple-300"
              >
                How It Works
              </Button>
            </Link>
            <Link href="#video-demo" onClick={closeMenu}>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-purple-900/50 hover:text-purple-300"
              >
                Demo
              </Button>
            </Link>
            <div className="pt-2 border-t border-purple-900/30">
              <Link href="#get-started" onClick={closeMenu}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
