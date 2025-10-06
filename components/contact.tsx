"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"

export default function Contact() {
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
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {content.contact.title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{content.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
                {content.contact.info.title}
              </h3>
              <div className="space-y-6">
                <a
                  href="mailto:a7made16@gmail.com"
                  className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{content.contact.info.email}</p>
                    <p className="text-foreground/70">a7made16@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:0096599891858"
                  className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{content.contact.info.phone}</p>
                    <p className="text-foreground/70" dir="ltr">
                      +965 99891858
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

            {/* Social Media */}
            <div>
              <h4 className="font-serif text-xl font-bold text-foreground mb-4">{content.contact.social}</h4>
              <div className="flex gap-4">
                <a
                  href="https://heydrop.me/9STwYnsW3wPbAE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="/professional-sports-director-at-desk-with-awards.jpg"
                alt="Ahmad Ashkanani Office"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <form className="space-y-6 bg-card p-8 rounded-lg shadow-lg">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    {content.contact.form.firstName}
                  </label>
                  <Input id="firstName" placeholder={content.contact.form.firstNamePlaceholder} className="w-full" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    {content.contact.form.lastName}
                  </label>
                  <Input id="lastName" placeholder={content.contact.form.lastNamePlaceholder} className="w-full" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {content.contact.form.email}
                </label>
                <Input id="email" type="email" placeholder={content.contact.form.emailPlaceholder} className="w-full" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  {content.contact.form.phone}
                </label>
                <Input id="phone" type="tel" placeholder={content.contact.form.phonePlaceholder} className="w-full" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {content.contact.form.message}
                </label>
                <Textarea
                  id="message"
                  placeholder={content.contact.form.messagePlaceholder}
                  rows={6}
                  className="w-full resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-medium"
              >
                {content.contact.form.submit}
              </Button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border text-center">
          <p className="text-foreground/60 text-sm">{content.contact.footer}</p>
        </div>
      </div>
    </section>
  )
}
