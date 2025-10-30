"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Mail, Phone, MapPin, Instagram } from "lucide-react"
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
                <div className="flex gap-4">
                  <a
                    href={content.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={content.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                    aria-label="Twitter/X"
                  >
                    <XIcon className="h-5 w-5" />
                  </a>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Ashkanani Company Logo */}
                  <a
                      href="https://ashknanisport2025.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="partner-logo flex items-center justify-center h-15 w-20 border-2 border-primary rounded-lg p-2 
                                bg-gray-900 transition-all duration-300 hover:scale-105 hover:bg-gray-800"
                      aria-label="Ashkanani Company"
                      title="Ashkanani Company"
                    >
                      <img 
                        src="/ashkanani-logo.png"
                        alt="Ashkanani Company" 
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </a>

                  
                  {/* Spark Sport Academy Logo */}
                  <a
                    href="https://sparksport.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-logo flex items-center justify-center h-15 w-15 border-2 border-primary rounded-lg p-1 bg-white/90 transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:opacity-100 opacity-90"
                    aria-label="Spark Sport Academy"
                    title="Spark Sport Academy"
                  >
                    <img 
                      src="/spark-logo.jpg"
                      alt="Spark Sport Academy" 
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </a>
                  
                  {/* Ashknani Company Logo */}
                  <a
                    href="https://Ashknani-comp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-logo flex items-center justify-center h-15 w-15 border-2 border-primary rounded-lg p-1 bg-white/90 transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:opacity-100 opacity-90"
                    aria-label="Ashknani Company"
                    title="Ashknani Company"
                  >
                    <img 
                      src="/Ashknani-comp.png"
                      alt="Ashknani Company" 
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </a>
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