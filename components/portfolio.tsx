"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ImageLightbox from "./image-lightbox"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string }[]>([])
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { content, language } = useLanguage()

  // تحديد عدد العناصر المعروضة حسب حجم الشاشة
  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1 // mobile
      if (window.innerWidth < 1024) return 2 // tablet
      return 3 // desktop
    }
    return 3 // default
  }

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage())
  const totalItems = content.portfolio.items.length
  const maxIndex = Math.max(0, totalItems - itemsPerPage)

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = getItemsPerPage()
      setItemsPerPage(newItemsPerPage)
      // إعادة تعيين الفهرس الحالي إذا تجاوز الحد الأقصى الجديد
      setCurrentIndex(prev => Math.min(prev, Math.max(0, totalItems - newItemsPerPage)))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [totalItems])

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
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleImageClick = (item: any) => {
    // إذا كان للعنصر مجموعة صور، استخدمها، وإلا استخدم الصورة الأساسية
    if (item.gallery && item.gallery.length > 0) {
      const galleryImages = item.gallery.map((img: string) => ({ src: img, alt: item.title }))
      setLightboxImages(galleryImages)
      setCurrentLightboxIndex(0)
      setLightboxImage(galleryImages[0])
    } else {
      const singleImage = { src: item.image || "/placeholder.svg", alt: item.title }
      setLightboxImages([singleImage])
      setCurrentLightboxIndex(0)
      setLightboxImage(singleImage)
    }
  }

  const handleLightboxNext = () => {
    const newIndex = (currentLightboxIndex + 1) % lightboxImages.length
    setCurrentLightboxIndex(newIndex)
    setLightboxImage(lightboxImages[newIndex])
  }

  const handleLightboxPrevious = () => {
    const newIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length
    setCurrentLightboxIndex(newIndex)
    setLightboxImage(lightboxImages[newIndex])
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    setLightboxImages([])
    setCurrentLightboxIndex(0)
  }

  return (
    <section id="portfolio" ref={sectionRef} className="py-16 md:py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4">
            {content.portfolio.title}
          </h2>
          <div className="w-16 md:w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`absolute ${language === "ar" ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 w-8 h-8 sm:w-10 sm:h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center`}
            aria-label="Previous"
          >
            {language === "ar" ? <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" /> : <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />}
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute ${language === "ar" ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 w-8 h-8 sm:w-10 sm:h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center`}
            aria-label="Next"
          >
            {language === "ar" ? <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" /> : <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />}
          </button>

          {/* Slider Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-3 sm:gap-6"
              style={{
                transform: `translateX(${language === "ar" ? "" : "-"}${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {content.portfolio.items.map((item, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group relative overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className="aspect-[3/4] overflow-hidden cursor-pointer"
                    onClick={() => handleImageClick(item)}
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* إذا كان هناك معرض صور، أضف مؤشراً بذلك */}
                    {item.gallery && item.gallery.length > 0 && (
                      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                        {item.gallery.length} {language === "ar" ? "صور" : "photos"}
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-4 sm:translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-primary px-3 py-1.5 rounded-md inline-block mb-3">
                    <p className="text-xs sm:text-sm font-bold">{item.period}</p>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
                  {item.details && Array.isArray(item.details) && (
                    <ul className="text-xs sm:text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 list-disc pl-5 space-y-1">
                      {item.details.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-primary w-4 sm:w-8" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Lightbox for Gallery with Navigation */}
      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          isOpen={!!lightboxImage}
          onClose={closeLightbox}
          onPrev={lightboxImages.length > 1 ? handleLightboxPrevious : undefined}
          onNext={lightboxImages.length > 1 ? handleLightboxNext : undefined}
          currentIndex={currentLightboxIndex}
          totalImages={lightboxImages.length}
        />
      )}
    </section>
  )
}