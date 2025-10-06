"use client"

import Hero from "@/components/hero"
import About from "@/components/about"
import Portfolio from "@/components/portfolio"
import Achievements from "@/components/achievements"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Portfolio />
      <Achievements />
      <Contact />
    </main>
  )
}
