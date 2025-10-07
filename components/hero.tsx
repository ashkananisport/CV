"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { content } = useLanguage()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/70 to-secondary/90 z-10" />
        <img
          src={content.hero.slider}
          alt="Sports Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Hero Content */}
      <div
        className={`relative z-20 text-center px-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Profile Picture */}
        <div className="mb-6 md:mb-8">
          <img
            src={content.hero.pic} 
            alt="Profile"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-primary mx-auto object-cover object-top"
          />
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-6 tracking-tight">
          {content.hero.name}
          <br />
          <span className="text-primary">{content.hero.surname}</span>
        </h1>
        <div className="space-y-2 md:space-y-3">
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light">{content.hero.title1}</p>
          <p className="text-base sm:text-lg md:text-xl text-white/80 font-light">{content.hero.title2}</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/70" />
      </a>
    </section>
  )
}