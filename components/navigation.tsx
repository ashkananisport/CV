"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { content, language } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDropdown = (href: string) => {
    setOpenDropdown(openDropdown === href ? null : href)
  }

  const handleSubItemClick = (href: string, subItem: string, tabIndex: number) => {
    // إغلاق القائمة
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
    
    // إنشاء URL مع معلمات التبويب
    const url = new URL(window.location.href)
    url.hash = href
    url.searchParams.set('tab', tabIndex.toString())
    
    // الانتقال إلى الرابط الجديد
    router.push(url.toString())
    
    // الانتظار قليلاً ثم التمرير إلى القسم
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const navLinks = [
    { href: "#home", label: content.navigation.home },
    { href: "#about", label: content.navigation.about },
    { 
      href: "#portfolio", 
      label: content.navigation.portfolio,
      subItems: content.portfolio.items.map((item: any, index: number) => ({
        title: item.title,
        index
      }))
    },
    { 
      href: "#media-gallery", 
      label: content.navigation.gallery,
      subItems: [
        { title: content.media.galleryTitle, index: 0 },
        { title: content.media.videosTitle, index: 1 }
      ]
    },
    { 
      href: "#achievements", 
      label: content.navigation.achievements
    },
    { href: "#contact", label: content.navigation.contact },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Profile Picture - Left Side - Using profile image from JSON */}
          <div className="flex-shrink-0">
            <a href="#home" className="relative z-10">
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-lg">
                <Image
                  src={content.siteInfo.navbarLogo || "/placeholder.svg"}
                  alt="Ahmad Jaber Ashkanani"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </a>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Language Switcher - Right Side */}
          <div className="hidden md:block flex-shrink-0">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.href} className="w-full">
                  <div className="flex items-center justify-between w-full">
                    <a
                      href={link.href}
                      className="text-base font-medium text-foreground/80 hover:text-primary transition-colors flex-grow py-2"
                      onClick={(e) => {
                        e.preventDefault()
                        setIsMobileMenuOpen(false)
                        setOpenDropdown(null)
                        const element = document.querySelector(link.href)
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                    >
                      {link.label}
                    </a>
                    {link.subItems && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleDropdown(link.href)}
                      >
                        {openDropdown === link.href ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                  
                  {link.subItems && openDropdown === link.href && (
                    <div className="pl-4 py-2 space-y-2 border-l border-border">
                      {link.subItems.map((subItem: any, index: number) => (
                        <button
                          key={index}
                          className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                          onClick={() => handleSubItemClick(link.href, subItem.title, subItem.index)}
                        >
                          {subItem.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}