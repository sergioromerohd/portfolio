import Link from "next/link"
import { Github, Linkedin, FileText, ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t border-border py-16 mt-24 bg-gradient-to-b from-transparent to-muted/10">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand + CTA */}
          <div className="space-y-3">
            <p className="font-mono text-primary text-sm">
              <span className="text-muted-foreground">$</span> sergio<span className="text-muted-foreground">.dev</span>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Desarrollador full stack, IoT y DevSecOps. Me gusta construir cosas útiles y entender cómo funcionan por dentro.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              ¿Hablamos?
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Sitemap */}
          <div className="space-y-2">
            <p className="text-xs font-mono text-muted-foreground mb-3">navegacion</p>
            <div className="grid grid-cols-2 gap-1">
              {[
                { href: "#about", label: "Sobre mí" },
                { href: "#stack", label: "Stack" },
                { href: "#projects", label: "Proyectos" },
                { href: "#experience", label: "Experiencia" },
                { href: "#ai-workflow", label: "IA" },
                { href: "#contact", label: "Contacto" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-muted-foreground">links</p>
            <div className="space-y-2">
              <Link
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Link>
              <Link
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Link>
              <Link
                href={siteConfig.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <FileText className="w-4 h-4" />
                Descargar CV
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Construido con Next.js y café.
          </p>
        </div>
      </div>
    </footer>
  )
}
