"use client"

import Link from "next/link"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { Terminal } from "@/components/terminal"
import { siteConfig } from "@/lib/site"

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
}

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: identity */}
        <div className="space-y-6 animate-fade-up">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>disponible para proyectos</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            Hola, soy <span className="text-gradient">{siteConfig.name}</span>.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl text-pretty">
            {siteConfig.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_-4px] hover:shadow-primary/50"
            >
              Ver proyectos
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-card text-foreground font-medium text-sm hover:border-primary/40 transition-colors"
            >
              Contactar
            </Link>
          </div>

          <div className="flex items-center gap-4 pt-4">
            {siteConfig.social.slice(0, 3).map((s) => {
              const Icon = socialIcons[s.name as keyof typeof socialIcons]
              return (
                <Link
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="text-muted-foreground hover:text-primary transition-colors hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Right: terminal only */}
        <div className="animate-fade-up [animation-delay:200ms] opacity-0">
          <Terminal />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground opacity-60">scroll</span>
        <div className="w-5 h-8 rounded-full border border-border flex items-start p-1">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-scroll-dot" />
        </div>
      </div>
    </section>
  )
}
