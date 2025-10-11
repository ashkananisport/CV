"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Briefcase, GraduationCap, Award, Users } from "lucide-react"
import ImageLightbox from "./image-lightbox"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { content, language } = useLanguage()

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

  const iconMap = {
    Briefcase,
    Users,
    GraduationCap,
    Award,
  }

  const sections = [
    {
      icon: iconMap[content.about.sections.currentPositions.icon as keyof typeof iconMap],
      title: content.about.sections.currentPositions.title,
      items: content.about.sections.currentPositions.items,
    },
    {
      icon: iconMap[content.about.sections.professionalRoles.icon as keyof typeof iconMap],
      title: content.about.sections.professionalRoles.title,
      items: content.about.sections.professionalRoles.items,
    },
    {
      icon: iconMap[content.about.sections.educationalBackground.icon as keyof typeof iconMap],
      title: content.about.sections.educationalBackground.title,
      items: content.about.sections.educationalBackground.items,
    },
    {
      icon: iconMap[content.about.sections.qualifications.icon as keyof typeof iconMap],
      title: content.about.sections.qualifications.title,
      items: content.about.sections.qualifications.items,
    },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {content.about.title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div
          className={`grid lg:grid-cols-2 gap-12 md:gap-16 items-start transition-all duration-300 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Image Grid - Using images from JSON */}
          <div className="grid grid-cols-2 gap-4 lg:sticky lg:top-24">
            <div className="space-y-4">
              <div
                className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg cursor-pointer"
                onClick={() =>
                  setLightboxImage({
                    src: content.about.images[0],
                    alt: "Ahmad Ashkanani Professional",
                  })
                }
              >
                <img
                  src={content.about.images[0] || "/placeholder.svg"}
                  alt="Ahmad Ashkanani Professional"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div
                className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg cursor-pointer"
                onClick={() =>
                  setLightboxImage({
                    src: content.about.images[1],
                    alt: "Ahmad at Conference",
                  })
                }
              >
                <img
                  src={content.about.images[1] || "/placeholder.svg"}
                  alt="Ahmad at Conference"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Organized Content Sections */}
          <div className="space-y-8">
            {sections.map((section, sectionIndex) => {
              const Icon = section.icon
              return (
                <div
                  key={sectionIndex}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-foreground/80 leading-relaxed">
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                        <span className="text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}

            {/* CTA Button */}
            <div className="pt-4 text-center lg:text-left">
              <a
                href="#contact"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
              >
                {content.about.cta}
              </a>
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        src={lightboxImage?.src || ""}
        alt={lightboxImage?.alt || ""}
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </section>
  )
}
