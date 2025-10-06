"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className="font-medium"
    >
      {language === "en" ? "العربية" : "English"}
    </Button>
  )
}
