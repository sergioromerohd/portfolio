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
          subtitle="Lo que he hecho profesionalmente. Lo importante: productos en producción, no demos."
        />

        <div className="space-y-0 max-w-3xl">
          {experiences.map((e, i) => (
            <div key={i} className="timeline-item">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold">{e.role}</h3>
                <span className="text-muted-foreground">@</span>
                <span className="font-mono text-sm text-primary">{e.company}</span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  {e.period}
                </span>
                <span>·</span>
                <span>{e.location}</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
                {e.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-primary shrink-0">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {e.tech.map((t) => (
                  <span key={t} className="chip text-[10px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
