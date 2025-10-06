"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { content } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img
                  src="/professional-sports-director-in-formal-attire.jpg"
                  alt="Ahmad Ashkanani Professional"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img
                  src="/fifa-sports-agent-at-international-conference.jpg"
                  alt="Ahmad at Conference"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                {content.about.title}
              </h2>
              <div className="w-20 h-1 bg-primary" />
            </div>

            <div className="space-y-4 text-foreground/80 leading-relaxed">
              {content.about.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                {content.about.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
