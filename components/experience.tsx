import { Briefcase } from "lucide-react"
import { SectionHeader } from "@/components/stack"
import { experiences } from "@/lib/experience"

export function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-border">
      <div className="container">
        <SectionHeader
          tag="// 03"
          title="Experiencia"
          subtitle="Lo que he hecho profesionalmente. Lo importante: productos en produccion, no demos."
        />

        <div className="space-y-0 max-w-3xl">
          {experiences.map((e, i) => (
            <div key={i} className="timeline-item group">
              <div className="card-glow rounded-lg border border-border bg-card/80 p-5 space-y-3 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold">{e.role}</h3>
                  <span className="text-muted-foreground">@</span>
                  <span className="font-mono text-sm text-primary">{e.company}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {e.period}
                  </span>
                  <span>·</span>
                  <span>{e.location}</span>
                </div>
                <ul className="space-y-1.5 text-sm text-foreground/90">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-primary shrink-0">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {e.tech.map((t) => (
                    <span key={t} className="chip text-[10px] group-hover:border-primary/30 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
