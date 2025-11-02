"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Mail, Phone, MapPin, Instagram, MessageCircle } from "lucide-react" // أضفنا MessageCircle هنا
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"
import ImageLightbox from "./image-lightbox"

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// أيقونة واتساب مخصصة
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const message = formData.get("message")

    const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${firstName} ${lastName}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Message:*%0A${message}`
    const whatsappUrl = `https://wa.me/${content.socialMedia.whatsapp}?text=${whatsappMessage}`

    window.open(whatsappUrl, "_blank")
  }

  // بيانات الشركات مع روابط انستغرام
  const companies = [
    {
      name: "Ashkanani Sport",
      url: "https://ashknanisport2025.vercel.app/",
      logo: "/ashkanani-logo.png",
      instagram: "https://www.instagram.com/ashkanani.sport/",
      isPrimary: true // علامة للشركة الرئيسية
    },
    {
      name: "Spark Sport Academy",
      url: "https://www.instagram.com/spark.sportkw/?hl=en",
      logo: "/spark-logo.jpg",
      instagram: "https://www.instagram.com/spark.sportkw/?hl=en"
    },
    {
      name: "Ashknani Company",
      url: "https://www.instagram.com/ashkanani.tournament?igsh=MWpmNWx3dGVqYXd4MQ%3D%3D",
      logo: "/Ashknani-comp.png",
      instagram: "https://www.instagram.com/ashkanani.tournament?igsh=MWpmNWx3dGVqYXd4MQ%3D%3D"
    }
  ]

  return (
    <>
      <section id="contact" ref={sectionRef} className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {content.contact.title}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto px-4">{content.contact.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div
              className={`space-y-8 transition-all duration-500 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
                  {content.contact.info.title}
                </h3>
                <div className="space-y-6">
                  <a
                    href={`mailto:${content.contact.info.emailValue}`}
                    className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{content.contact.info.email}</p>
                      <p className="text-foreground/70 break-all">{content.contact.info.emailValue}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${content.contact.info.phoneValue}`}
                    className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{content.contact.info.phone}</p>
                      <p className="text-foreground/70" dir="ltr">
                        {content.contact.info.phoneValue}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{content.contact.info.location}</p>
                      <p className="text-foreground/70">{content.contact.info.locationValue}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-4">
                  {content.contact.social}
                </h4>
                <div className="flex gap-4">
                  <a
                    href={content.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={content.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    aria-label="Twitter/X Profile"
                  >
                    <XIcon className="h-5 w-5" />
                  </a>
                  {/* إضافة أيقونة واتساب */}
                  <a
                    href={`https://wa.me/${content.socialMedia.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <button
                onClick={() => setLightboxOpen(true)}
                className="rounded-lg overflow-hidden shadow-xl cursor-pointer group block w-full"
                aria-label="View office image"
              >
                <img
                  src={content.siteInfo.contactOfficeImage || "/placeholder.svg"}
                  alt="Ahmad Ashkanani Office"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>
            </div>

            <div
              className={`transition-all duration-500 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 sm:p-8 rounded-lg shadow-lg">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                      {content.contact.form.firstName}
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder={content.contact.form.firstNamePlaceholder}
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                      {content.contact.form.lastName}
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder={content.contact.form.lastNamePlaceholder}
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {content.contact.form.email}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={content.contact.form.emailPlaceholder}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    {content.contact.form.phone}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={content.contact.form.phonePlaceholder}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {content.contact.form.message}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={content.contact.form.messagePlaceholder}
                    rows={6}
                    className="w-full resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base sm:text-lg font-medium"
                >
                  {content.contact.form.submit}
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <p className="text-foreground/60 text-xs sm:text-sm text-center md:text-left">{content.contact.footer}</p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {companies.map((company, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`partner-logo flex items-center justify-center rounded-lg p-2 transition-all duration-300 hover:scale-105 ${
                          company.isPrimary 
                            ? "h-15 w-20 md:h-15 md:w-20 border-2 border-primary bg-gray-900 hover:bg-gray-800 shadow-lg" 
                            : "h-15 w-20 md:h-15 md:w-20 border-2 border-primary bg-white/90 hover:bg-white/90 hover:opacity-100 opacity-90"
                        }`}
                        aria-label={company.name}
                        title={company.name}
                      >
                        <img 
                          src={company.logo}
                          alt={company.name} 
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                        />
                      </a>
                      
                      {/* رابط انستغرام أسفل اللوجو - يظهر دائماً على الموبايل وعند التمرير على سطح المكتب */}
                      <a
                        href={company.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-2 text-primary hover:text-primary/80 transition-colors ${
                          company.isPrimary ? "text-sm" : "text-xs"
                        }`}
                        aria-label={`${company.name} Instagram`}
                      >
                        <div className="flex items-center gap-1">
                          <Instagram className="h-3 w-3 md:h-4 md:w-4" />
                          <span>Instagram</span>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ImageLightbox
        src={content.siteInfo.contactOfficeImage || "/placeholder.svg"}
        alt="Ahmad Ashkanani Office"
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}