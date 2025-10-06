"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import contentData from "@/data/content.json"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  content: typeof contentData.en
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar")

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "en" || savedLang === "ar")) {
      setLanguage(savedLang)
    }
  }, [])

  useEffect(() => {
    // Save language preference and update document direction
    localStorage.setItem("language", language)
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language])

  const content = contentData[language]
  const isRTL = language === "ar"

  return (
    <LanguageContext.Provider value={{ language, setLanguage, content, isRTL }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
