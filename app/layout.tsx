import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { LanguageProvider } from "@/contexts/language-context"

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
    "Professional portfolio of Ahmad Jaber Ashkanani - FIFA certified sports agent, international sports director, educational leader, and founder of Spark Sport Academy in Kuwait. Representing 166+ athletes across multiple sports.",
  keywords: [
    "FIFA sports agent",
    "sports director Kuwait",
    "Ahmad Ashkanani",
    "Spark Sport Academy",
    "sports management",
    "football agent",
    "Kuwait sports",
    "international sports director",
    "sports education",
    "Gulf Cup 26",
  ],
  authors: [{ name: "Ahmad Jaber Ashkanani" }],
  creator: "Ahmad Jaber Ashkanani",
  publisher: "Ahmad Jaber Ashkanani",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ahmad-ashkanani.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },
  openGraph: {
    title: "Ahmad Jaber Ashkanani | FIFA Sports Agent & International Sports Director",
    description:
      "FIFA certified sports agent and international sports director from Kuwait. Founder of Spark Sport Academy, representing 166+ athletes across multiple sports.",
    url: "https://ahmad-ashkanani.vercel.app",
    siteName: "Ahmad Jaber Ashkanani Portfolio",
    images: [
      {
        url: "/ahmad-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmad Jaber Ashkanani - FIFA Sports Agent",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ar_KW"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Jaber Ashkanani | FIFA Sports Agent",
    description: "FIFA certified sports agent and international sports director from Kuwait",
    images: ["/ahmad-profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ahmad Jaber Ashkanani",
              jobTitle: "FIFA Sports Agent & International Sports Director",
              description:
                "FIFA certified sports agent, international sports director, and founder of Spark Sport Academy",
              url: "https://ahmad-ashkanani.vercel.app",
              image: "/ahmad-profile.jpg",
              email: "a7made16@gmail.com",
              telephone: "+96599891858",
              address: {
                "@type": "PostalAddress",
                addressCountry: "Kuwait",
              },
              sameAs: ["https://heydrop.me/9STwYnsW3wPbAE"],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "General Authority for Applied Education and Training",
              },
              worksFor: {
                "@type": "Organization",
                name: "Spark Sport Academy",
              },
              knowsAbout: [
                "Sports Management",
                "FIFA Regulations",
                "Sports Law",
                "Athlete Representation",
                "Sports Education",
                "Football Administration",
              ],
            }),
          }}
        />
      </head>
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
