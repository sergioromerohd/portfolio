import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { PersonJsonLd } from "@/components/json-ld"

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://cv.sergioromerohd.com"),
  title: {
    default: "Sergio Romero — Full Stack Developer",
    template: "%s — Sergio Romero",
  },
  description:
    "Full Stack Developer especializado en TypeScript, Next.js, Node y arquitecturas cloud. Construyo productos que la gente usa.",
  keywords: [
    "Sergio Romero",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Madrid",
    "Portfolio",
  ],
  authors: [{ name: "Sergio Romero", url: "https://cv.sergioromerohd.com" }],
  creator: "Sergio Romero",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://cv.sergioromerohd.com",
    siteName: "Sergio Romero",
    title: "Sergio Romero — Full Stack Developer",
    description:
      "Full Stack Developer especializado en TypeScript, Next.js, Node y arquitecturas cloud.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sergioromerohd",
    title: "Sergio Romero — Full Stack Developer",
    description:
      "Full Stack Developer especializado en TypeScript, Next.js, Node y arquitecturas cloud.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <PersonJsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster
            theme="dark"
            position="bottom-right"
            richColors
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
