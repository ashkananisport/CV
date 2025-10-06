"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import Image from "next/image"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { content } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#home", label: content.navigation.home },
    { href: "#about", label: content.navigation.about },
    { href: "#portfolio", label: content.navigation.portfolio },
    { href: "#achievements", label: content.navigation.achievements },
    { href: "#contact", label: content.navigation.contact },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:grid grid-cols-3 items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex justify-start">
            <a href="#home" className="relative z-10">
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-lg">
                <Image src="/ahmad-profile.jpg" alt="Ahmad Jaber Ashkanani" fill className="object-cover" />
              </div>
            </a>
          </div>

          {/* Nav Links - Center */}
          <div className="flex justify-center items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Language Switcher - Right */}
          <div className="flex justify-end">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center justify-between h-16 md:hidden">
          {/* Logo */}
          <a href="#home" className="relative z-10">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-lg">
              <Image src="/ahmad-profile.jpg" alt="Ahmad Jaber Ashkanani" fill className="object-cover" />
            </div>
          </a>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
