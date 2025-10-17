"use client"

import { useEffect, useRef, useState } from "react"
import { Award, GraduationCap, Trophy, Users, ChevronLeft, ChevronRight, X, BookOpen, Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import ImageLightbox from "./image-lightbox"

const iconMap = [Award, GraduationCap, Trophy, Users]

export default function Achievements() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [coursesCurrentIndex, setCoursesCurrentIndex] = useState(0)
  const [appreciationCurrentIndex, setAppreciationCurrentIndex] = useState(0)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)
  const [activeTab, setActiveTab] = useState<"certifications" | "courses" | "appreciation">("certifications")
  const sectionRef = useRef<HTMLElement>(null)
  const { content, language } = useLanguage()

  const itemsPerPage = 4
  const totalCerts = content.achievements.certifications.length
  const totalCourses = content.achievements.courses.length
  const totalAppreciation = content.achievements.appreciation ? content.achievements.appreciation.length : 0
  const maxIndex = Math.max(0, totalCerts - itemsPerPage)
  const maxCoursesIndex = Math.max(0, totalCourses - itemsPerPage)
  const maxAppreciationIndex = Math.max(0, totalAppreciation - itemsPerPage)

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '15px' // Prevent layout shift
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [lightboxImage])

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

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + itemsPerPage))
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - itemsPerPage))
  }

  const handleCoursesNext = () => {
    setCoursesCurrentIndex((prev) => Math.min(maxCoursesIndex, prev + itemsPerPage))
  }

  const handleCoursesPrevious = () => {
    setCoursesCurrentIndex((prev) => Math.max(0, prev - itemsPerPage))
  }

  const handleAppreciationNext = () => {
    setAppreciationCurrentIndex((prev) => Math.min(maxAppreciationIndex, prev + itemsPerPage))
  }

  const handleAppreciationPrevious = () => {
    setAppreciationCurrentIndex((prev) => Math.max(0, prev - itemsPerPage))
  }

  const openLightbox = (image: string, alt: string) => {
    setLightboxImage({ src: image, alt })
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  return (
    <section id="achievements" ref={sectionRef} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
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
                className={`relative overflow-hidden rounded-lg bg-card shadow-lg cursor-pointer ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => openLightbox(achievement.image || "/placeholder.svg", achievement.title)}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={achievement.image || "/placeholder.svg"}
                    alt={achievement.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/90 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="mb-4">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-white/90">{achievement.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-muted p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("certifications")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "certifications"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {content.achievements.certificationsTitle}
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "courses"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {content.achievements.coursesTitle}
            </button>
            <button
              onClick={() => setActiveTab("appreciation")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "appreciation"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {content.achievements.appreciationTitle || "شهادات التقدير"}
            </button>
          </div>
        </div>

        {/* Certifications Tab */}
        {activeTab === "certifications" && (
          <div
            className={`transition-all duration-100 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`absolute ${language === "ar" ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center`}
                aria-label="Previous"
              >
                {language === "ar" ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className={`absolute ${language === "ar" ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center`}
                aria-label="Next"
              >
                {language === "ar" ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              </button>

              {/* Slider Container */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-100 ease-in-out gap-6"
                  style={{
                    transform: `translateX(${language === "ar" ? "" : "-"}${currentIndex * (100 / itemsPerPage)}%)`,
                  }}
                >
                  {content.achievements.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] relative overflow-hidden rounded-lg bg-white shadow-md"
                    >
                      {/* Certificate Image */}
                      <div
                        className="aspect-[3/4] overflow-hidden bg-muted cursor-pointer"
                        onClick={() => openLightbox(cert.image || "/placeholder.svg", cert.title)}
                      >
                        <img
                          src={cert.image || "/placeholder.svg"}
                          alt={cert.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

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
                    className={`w-2 h-2 rounded-full transition-all duration-100 ${
                      currentIndex === index ? "bg-primary w-8" : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div
            className={`transition-all duration-100 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={handleCoursesPrevious}
                disabled={coursesCurrentIndex === 0}
                className={`absolute ${language === "ar" ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center`}
                aria-label="Previous"
              >
                {language === "ar" ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
              </button>

              <button
                onClick={handleCoursesNext}
                disabled={coursesCurrentIndex >= maxCoursesIndex}
                className={`absolute ${language === "ar" ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center`}
                aria-label="Next"
              >
                {language === "ar" ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              </button>

              {/* Slider Container */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-100 ease-in-out gap-6"
                  style={{
                    transform: `translateX(${language === "ar" ? "" : "-"}${coursesCurrentIndex * (100 / itemsPerPage)}%)`,
                  }}
                >
                  {content.achievements.courses.map((course, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] relative overflow-hidden rounded-lg bg-white shadow-md"
                    >
                      {/* Course Image */}
                      <div
                        className="aspect-[3/4] overflow-hidden bg-muted cursor-pointer"
                        onClick={() => openLightbox(course.image || "/placeholder.svg", course.title)}
                      >
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Course Details */}
                      <div className="p-4 bg-white">
                        <div className="flex items-center mb-3">
                          <div className="bg-primary/10 p-2 rounded-lg mr-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-serif text-lg font-bold text-foreground line-clamp-2">{course.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: maxCoursesIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCoursesCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-100 ${
                      coursesCurrentIndex === index ? "bg-primary w-8" : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Appreciation Tab */}
        {activeTab === "appreciation" && (
          <div
            className={`transition-all duration-100 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={handleAppreciationPrevious}
                disabled={appreciationCurrentIndex === 0}
                className={`absolute ${language === "ar" ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center`}
                aria-label="Previous"
              >
                {language === "ar" ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
              </button>

              <button
                onClick={handleAppreciationNext}
                disabled={appreciationCurrentIndex >= maxAppreciationIndex}
                className={`absolute ${language === "ar" ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center`}
                aria-label="Next"
              >
                {language === "ar" ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              </button>

              {/* Slider Container */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-100 ease-in-out gap-6"
                  style={{
                    transform: `translateX(${language === "ar" ? "" : "-"}${appreciationCurrentIndex * (100 / itemsPerPage)}%)`,
                  }}
                >
                  {content.achievements.appreciation && content.achievements.appreciation.map((item, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] relative overflow-hidden rounded-lg bg-white shadow-md"
                    >
                      {/* Appreciation Image */}
                      <div
                        className="aspect-[3/4] overflow-hidden bg-muted cursor-pointer"
                        onClick={() => openLightbox(item.image || "/placeholder.svg", item.title)}
                      >
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Appreciation Details */}
                      <div className="p-4 bg-white">
                        <div className="flex items-center mb-3">
                          <div className="bg-primary/10 p-2 rounded-lg mr-3">
                            <Star className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-serif text-lg font-bold text-foreground line-clamp-2">{item.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item.organization}</p>
                        <div className="bg-primary/10 px-3 py-1.5 rounded-md inline-block">
                          <p className="text-sm text-primary font-bold">{item.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: maxAppreciationIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setAppreciationCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-100 ${
                      appreciationCurrentIndex === index ? "bg-primary w-8" : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors md:w-14 md:h-14"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 md:w-7 md:h-7" />
          </button>
          
          <div 
            className="relative w-full max-w-5xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center bg-black/20 rounded-lg p-2 md:p-4">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded"
                onError={(e) => {
                  // If image fails to load, show a placeholder
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
            
            {/* Image title at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 className="text-xl font-bold text-center">{lightboxImage.alt}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}