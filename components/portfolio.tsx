"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ImageLightbox from "./image-lightbox"
import { useSearchParams } from "next/navigation"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string }[]>([])
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { content, language } = useLanguage()
   const searchParams = useSearchParams()

  // تحقق من وجود معلمة التبويب في URL
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam !== null) {
      setActiveTab(parseInt(tabParam))
    }
  }, [searchParams])

  // Reset gallery index when tab changes
  useEffect(() => {
    setCurrentGalleryIndex(0)
  }, [activeTab])

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

  const handleImageClick = (item: any) => {
    if (item.gallery && item.gallery.length > 0) {
      const galleryImages = item.gallery.map((img: string) => ({ src: img, alt: item.title }))
      setLightboxImages(galleryImages)
      setCurrentLightboxIndex(currentGalleryIndex)
      setLightboxImage(galleryImages[currentGalleryIndex])
    } else {
      const singleImage = { src: item.image || "/placeholder.svg", alt: item.title }
      setLightboxImages([singleImage])
      setCurrentLightboxIndex(0)
      setLightboxImage(singleImage)
    }
  }

  const handleGalleryNext = () => {
    const activeItem = content.portfolio.items[activeTab]
    const galleryLength = activeItem.gallery ? activeItem.gallery.length : 1
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryLength)
  }

  const handleGalleryPrev = () => {
    const activeItem = content.portfolio.items[activeTab]
    const galleryLength = activeItem.gallery ? activeItem.gallery.length : 1
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryLength) % galleryLength)
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

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12">
          {content.portfolio.items.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeTab === index
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Active Tab Content - Side by Side Layout */}
        <div className="max-w-7xl mx-auto">
          {content.portfolio.items.map((item, index) => (
            <div
              key={index}
              className={`${activeTab === index ? "block" : "hidden"} transition-all duration-300`}
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Details Section - Smaller */}
                <div className="lg:w-2/5 bg-card p-6 md:p-8 rounded-xl shadow-lg">
                  <div className="mb-6">
                    <div className="bg-primary px-3 py-1.5 rounded-md inline-block mb-3">
                      <p className="text-sm font-bold">{item.period}</p>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground mb-6 text-lg">{item.description}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg md:text-xl mb-4">
                      {language === "ar" ? "التفاصيل" : "Details"}
                    </h4>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      {item.details && Array.isArray(item.details) && item.details.map((point, i) => (
                        <div 
                          key={i} 
                          className="bg-muted/30 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-all duration-200 hover:shadow-sm"
                        >
                          <div className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-base">{point}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image Gallery Slider - Enhanced */}
                <div className="lg:w-3/5 bg-card p-6 rounded-xl shadow-lg flex flex-col">
                  <div className="relative flex-grow">
                    {/* Enhanced Image Container */}
                    <div className="relative w-full h-full max-h-[500px] bg-gradient-to-br from-muted/20 to-muted/10 rounded-xl overflow-hidden shadow-inner">
                      <div
                        className="w-full h-full cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
                        onClick={() => handleImageClick(item)}
                      >
                        {item.gallery && item.gallery.length > 0 ? (
                          <img
                            src={item.gallery[currentGalleryIndex]}
                            alt={`${item.title} ${currentGalleryIndex + 1}`}
                            className="w-full h-full object-contain transition-opacity duration-300"
                          />
                        ) : (
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-contain transition-opacity duration-300"
                          />
                        )}
                      </div>

                      {/* Enhanced Navigation Arrows */}
                      {item.gallery && item.gallery.length > 1 && (
                        <>
                          <button
                            onClick={handleGalleryPrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/80 transition-all duration-300 hover:scale-110 shadow-lg"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={handleGalleryNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/80 transition-all duration-300 hover:scale-110 shadow-lg"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Thumbnail Preview */}
                  {item.gallery && item.gallery.length > 1 && (
                    <div className="flex justify-center mt-6 space-x-3">
                      {item.gallery.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentGalleryIndex(idx)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentGalleryIndex === idx 
                              ? "bg-primary scale-125 shadow-md" 
                              : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
                          }`}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
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