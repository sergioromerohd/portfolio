import Image from "next/image"
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
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
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
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Right: bento (terminal + photo) */}
        <div className="grid gap-4 animate-fade-up [animation-delay:200ms] opacity-0">
          <Terminal />
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 relative aspect-square rounded-lg border border-border overflow-hidden bg-card">
              <Image
                src="/SergioRomero.jpg"
                alt="Sergio Romero"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 33vw, 200px"
                priority
              />
            </div>
            <div className="col-span-2 flex flex-col justify-center rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground"> ubicacion </p>
              <p className="text-sm font-mono">{siteConfig.location}</p>
              <p className="text-sm text-muted-foreground mt-3"> rol </p>
              <p className="text-sm font-mono">Full Stack Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
