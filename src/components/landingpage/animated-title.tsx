"use client"

import { useState, useEffect, useRef } from "react"

export default function AnimatedTitle() {
  const [displayedText, setDisplayedText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fullText = "Welcome to DormParty: The Omegle for College Students"
  const words = fullText.split(" ")

  useEffect(() => {
    // Clear any existing interval when component mounts or unmounts
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    if (currentWordIndex <= words.length) {
      intervalRef.current = setInterval(() => {
        if (currentWordIndex === words.length) {
          setIsComplete(true)
          if (intervalRef.current) clearInterval(intervalRef.current)
          return
        }

        setDisplayedText((prev) => {
          const newText = prev + (prev ? " " : "") + words[currentWordIndex]
          return newText
        })
        setCurrentWordIndex((prev) => prev + 1)
      }, 300) // Adjust speed here - lower number = faster
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [currentWordIndex, words])

  // Function to apply gradient to "DormParty", "Omegle", and "Students"
  const renderText = () => {
    if (!displayedText) return null

    const parts = displayedText.split(" ")
    return parts.map((part, index) => {
      if (
        part === "DormParty:" ||
        part === "Omegle" ||
        part === "Students"
      ) {
        // Remove colon from DormParty for gradient, keep colon white
        if (part === "DormParty:") {
          return (
            <span
              key={index}
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 font-bold"
            >
              {" DormParty"}
              <span className="text-white">:</span>
            </span>
          )
        }
        return (
          <span
            key={index}
            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 font-bold"
          >
            {index === 0 ? "" : " "}
            {part}
          </span>
        )
      }
      return (
        <span key={index}>
          {index === 0 ? "" : " "}
          {part}
        </span>
      )
    })
  }

  // Blinking cursor effect
  const renderCursor = () => {
    if (isComplete) return null
    return <span className="inline-block w-1 h-12 bg-purple-500 ml-1 animate-blink"></span>
  }

  return (
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mt-6 mb-8">
      {renderText()}
      {renderCursor()}
    </h1>
  )
}