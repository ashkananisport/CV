"use client"

import { useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ImageLightboxProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  currentIndex?: number
  totalImages?: number
}

export default function ImageLightbox({
  src,
  alt,
  isOpen,
  onClose,
  onPrev,
  onNext,
  currentIndex = 0,
  totalImages = 1,
}: ImageLightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) window.addEventListener("keydown", handleEscape)
    return () => {
      window.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* زر الإغلاق */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-300 z-50"
        aria-label="Close"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>

      {/* الصورة */}
      <div
        className="relative w-full max-w-4xl md:max-w-5xl lg:max-w-6xl max-h-[75vh] sm:max-h-[80vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full h-auto max-h-[70vh] sm:max-h-[75vh] object-contain rounded-lg shadow-2xl transition-transform duration-500"
        />

        {/* سهم لليسار */}
        {onPrev && totalImages > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-1.5 sm:p-2 md:p-3 rounded-full transition-colors duration-300 z-50"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
          </button>
        )}

        {/* سهم لليمين */}
        {onNext && totalImages > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-1.5 sm:p-2 md:p-3 rounded-full transition-colors duration-300 z-50"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
          </button>
        )}

        {/* عداد الصور */}
        {totalImages > 1 && (
          <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm md:text-base">
            {currentIndex + 1} / {totalImages}
          </div>
        )}
      </div>
    </div>
  )
}
