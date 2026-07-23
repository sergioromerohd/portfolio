"use client"

import { Download } from "lucide-react"
import { siteConfig } from "@/lib/site"

export function FloatingCV() {
  return (
    <a
      href={siteConfig.cv}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
    >
      <Download className="w-4 h-4" />
      <span className="hidden sm:inline">CV</span>
    </a>
  )
}
