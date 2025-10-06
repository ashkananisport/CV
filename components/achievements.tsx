"use client"

import { useEffect, useRef, useState } from "react"
import { Award, GraduationCap, Trophy, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const iconMap = [Award, GraduationCap, Trophy, Users]

export default function Achievements() {
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
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="achievements" ref={sectionRef} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {content.achievements.title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        {/* Featured Achievements */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
          {content.achievements.featured.map((achievement, index) => {
            const Icon = iconMap[index]
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={achievement.image || "/placeholder.svg"}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/90 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-white/90">{achievement.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground mb-16">
            {content.achievements.certificationsTitle}
          </h3>

          {/* Certificate Gallery Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {content.achievements.certifications.map((cert, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-2xl transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${(index + 4) * 50}ms` }}
              >
                {/* Certificate Image */}
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={cert.image || "/placeholder.svg?height=400&width=300"}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Certificate Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Certificate Details */}
                <div className="p-4 bg-white">
                  <h4 className="font-serif text-lg font-bold text-foreground mb-2 line-clamp-2">{cert.title}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{cert.organization}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-primary font-semibold">{cert.date}</p>
                    {cert.score && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-semibold">
                        {cert.score}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover Details */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="text-white">
                    <h4 className="font-serif text-xl font-bold mb-2">{cert.title}</h4>
                    <p className="text-sm text-white/90 mb-1">{cert.organization}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{cert.date}</p>
                      {cert.score && (
                        <span className="text-sm bg-primary px-2 py-1 rounded-full font-semibold">{cert.score}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
