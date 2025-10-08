"use client"

import dynamic from "next/dynamic"

// تعطيل SSR لكل المكونات التي تعتمد على اللغة
const Navigation = dynamic(() => import("@/components/navigation"), { ssr: false })
const Hero = dynamic(() => import("@/components/hero"), { ssr: false })
const About = dynamic(() => import("@/components/about"), { ssr: false })
const Portfolio = dynamic(() => import("@/components/portfolio"), { ssr: false })
const Achievements = dynamic(() => import("@/components/achievements"), { ssr: false })
const Contact = dynamic(() => import("@/components/contact"), { ssr: false })

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
