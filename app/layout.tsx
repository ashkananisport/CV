import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { LanguageProvider } from "@/contexts/language-context" // Import LanguageProvider

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ahmad Jaber Ashkanani | FIFA Sports Agent & International Sports Director",
  description:
    "Professional portfolio of Ahmad Jaber Ashkanani - Educational teacher, Sports director, International lecturer, and FIFA sports agent from Kuwait.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <Suspense fallback={null}>
            {children}
            <Analytics />
          </Suspense>
        </LanguageProvider>
      </body>
    </html>
  )
}
