import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SectionHeader } from "@/components/stack"
import { Card, CardContent } from "@/components/ui/card"
import { projects } from "@/lib/projects"

export function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-border">
      <div className="container">
        <SectionHeader
          tag="// 02"
          title="Proyectos"
          subtitle="Cosas que he construido y están en producción (o lo estarán pronto)."
        />

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <Card
              key={p.title}
              className="bg-card border-border hover:border-primary/40 transition-colors group"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {p.title}
                      </h3>
                      {p.status === "wip" && (
                        <span className="chip text-[10px]">wip</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {p.tagline}
                    </p>
                  </div>
                  {p.url && (
                    <Link
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                      aria-label={`Abrir ${p.title}`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  )}
                </div>

                <p className="text-sm text-foreground/90 leading-relaxed">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
