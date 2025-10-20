"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X, ExternalLink, Youtube } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useSearchParams } from "next/navigation"

export default function MediaGallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [videoCurrentIndex, setVideoCurrentIndex] = useState(0)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; images?: string[]; index?: number } | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [activeTab, setActiveTab] = useState<"gallery" | "videos">("gallery")
  const sectionRef = useRef<HTMLElement>(null)
  const { content, language } = useLanguage()

  // استخدام البيانات من context
  const galleryData = content.media.gallery
  const videosData = content.media.videos

  const totalImages = galleryData.length
  const totalVideos = videosData.length
  
  // حساب الحد الأقصى للفهرس بناءً على عدد العناصر في الصفحة
  const maxIndex = Math.max(0, totalImages - itemsPerPage)
  const maxVideoIndex = Math.max(0, totalVideos - itemsPerPage)
  const searchParams = useSearchParams()

  // تحقق من وجود معلمة التبويب في URL
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam !== null) {
      const tabIndex = parseInt(tabParam)
      if (tabIndex === 0) setActiveTab("gallery")
      else if (tabIndex === 1) setActiveTab("videos")
    }
  }, [searchParams])

  // تحديث عدد العناصر في الصفحة بناءً على حجم الشاشة
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) { // sm breakpoint
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) { // lg breakpoint
        setItemsPerPage(2)
      } else {
        setItemsPerPage(4)
      }
    }

    // استدعاء أولي
    updateItemsPerPage()

    // إضافة مستمع الأحداث
    window.addEventListener('resize', updateItemsPerPage)
    
    // تنظيف
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  // إعادة تعيين الفهرس عند تغيير عدد العناصر في الصفحة
  useEffect(() => {
    setCurrentIndex(0)
    setVideoCurrentIndex(0)
  }, [itemsPerPage])

  // منع التمرير عند فتح نافذة الصورة المكبرة
  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '15px' // منع تحول التخطيط
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
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1
      return nextIndex <= maxIndex ? nextIndex : prev
    })
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleVideoNext = () => {
    setVideoCurrentIndex((prev) => {
      const nextIndex = prev + 1
      return nextIndex <= maxVideoIndex ? nextIndex : prev
    })
  }

  const handleVideoPrevious = () => {
    setVideoCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const openLightbox = (src: string, alt: string) => {
    setLightboxImage({ src, alt })
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  return (
    <section id="media-gallery" ref={sectionRef} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {content.media.title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {activeTab === "gallery" ? content.media.galleryDescription : content.media.videosDescription}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-muted p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "gallery"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {content.media.galleryTitle}
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "videos"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {content.media.videosTitle}
            </button>
          </div>
        </div>

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
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
                  className="flex transition-transform duration-100 ease-in-out gap-0 sm:gap-6"
                  style={{
                    transform: `translateX(${language === "ar" ? "" : "-"}${currentIndex * (100 / itemsPerPage)}%)`,
                  }}
                >
                  {galleryData.map((item) => (
                    <div
                      key={item.id}
                      className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-24px)] relative overflow-hidden rounded-lg shadow-md group cursor-pointer"
                      onClick={() => openLightbox(item.src, item.description)}
                    >
                      {/* Image - Increased height */}
                      <div className="aspect-[3/5] overflow-hidden">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      
                      {/* Caption - Always visible */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-white/90 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalImages }).map((_, index) => (
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

        {/* Videos Tab */}
        {activeTab === "videos" && (
          <div
            className={`transition-all duration-100 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={handleVideoPrevious}
                disabled={videoCurrentIndex === 0}
                className={`absolute ${language === "ar" ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center`}
                aria-label="Previous"
              >
                {language === "ar" ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
              </button>

              <button
                onClick={handleVideoNext}
                disabled={videoCurrentIndex >= maxVideoIndex}
                className={`absolute ${language === "ar" ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center`}
                aria-label="Next"
              >
                {language === "ar" ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              </button>

              {/* Slider Container */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-100 ease-in-out gap-0 sm:gap-6"
                  style={{
                    transform: `translateX(${language === "ar" ? "" : "-"}${videoCurrentIndex * (100 / itemsPerPage)}%)`,
                  }}
                >
                  {videosData.map((video) => (
                    <a
                      key={video.id}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-24px)] relative overflow-hidden rounded-lg shadow-md group hover:shadow-lg transition-all duration-300"
                    >
                      <div className="p-6 bg-card h-full flex flex-col">
                        {/* YouTube Icon */}
                        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 group-hover:bg-red-200 transition-colors">
                          <Youtube className="w-8 h-8 text-red-600" />
                        </div>
                        
                        {/* Video Info */}
                        <h3 className="font-serif text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                          {video.description}
                        </p>
                        
                        {/* Date and Watch Button */}
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            {video.date}
                          </span>
                          <div className="flex items-center text-primary font-medium text-sm">
                            <ExternalLink className="w-4 h-4 ml-1" />
                            <span>{language === "ar" ? "مشاهدة" : "Watch"}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalVideos }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setVideoCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-100 ${
                      videoCurrentIndex === index ? "bg-primary w-8" : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Lightbox */}
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
                  // إذا فشل تحميل الصورة، عرض placeholder
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