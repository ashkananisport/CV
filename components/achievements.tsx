"use client"

import { useEffect, useRef, useState } from "react"
import { Award, GraduationCap, Trophy, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import ImageLightbox from "./image-lightbox"

const iconMap = [Award, GraduationCap, Trophy, Users]

export default function Achievements() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { content, language } = useLanguage()

  const itemsPerPage = 4
  const totalCerts = content.achievements.certifications.length
  const maxIndex = Math.max(0, totalCerts - itemsPerPage)

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

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

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
                className={`group relative overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() =>
                  setLightboxImage({
                    src: achievement.image || "/placeholder.svg",
                    alt: achievement.title,
                  })
                }
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

          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`absolute ${language === "ar" ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center`}
              aria-label="Previous"
            >
              {language === "ar" ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`absolute ${language === "ar" ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center`}
              aria-label="Next"
            >
              {language === "ar" ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
            </button>

            {/* Slider Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{
                  transform: `translateX(${language === "ar" ? "" : "-"}${currentIndex * (100 / itemsPerPage)}%)`,
                }}
              >
                {content.achievements.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Certificate Image */}
                    <div
                      className="aspect-[3/4] overflow-hidden bg-muted cursor-pointer"
                      onClick={() =>
                        setLightboxImage({
                          src: cert.image || "/placeholder.svg?height=400&width=300",
                          alt: cert.title,
                        })
                      }
                    >
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
                      <p className="text-sm text-muted-foreground mb-2">{cert.organization}</p>
                      <div className="flex items-center justify-between">
                        <div className="bg-primary/10 px-3 py-1.5 rounded-md">
                          <p className="text-sm text-primary font-bold">{cert.date}</p>
                        </div>
                        {cert.score && (
                          <span className="text-sm bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-bold">
                            {cert.score}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hover Details */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="text-white">
                        <h4 className="font-serif text-xl font-bold mb-2">{cert.title}</h4>
                        <p className="text-sm text-white/90 mb-2">{cert.organization}</p>
                        <div className="flex items-center gap-2">
                          <div className="bg-primary px-3 py-1.5 rounded-md">
                            <p className="text-base font-bold">{cert.date}</p>
                          </div>
                          {cert.score && (
                            <span className="text-sm bg-white text-primary px-3 py-1.5 rounded-md font-bold">
                              {cert.score}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "bg-primary w-8" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ImageLightbox Component */}
      <ImageLightbox
        src={lightboxImage?.src || ""}
        alt={lightboxImage?.alt || ""}
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </section>
  )
}
