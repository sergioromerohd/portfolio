import { Sparkles } from "lucide-react"
import { SectionHeader } from "@/components/stack"

export function AIWorkflow() {
  return (
    <section id="ai-workflow" className="py-24 border-t border-border bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
      <div className="container">
        <SectionHeader
          tag="// 05"
          title="Desarrollo con IA"
          subtitle="Adaptado al desarrollo moderno. La IA no es el futuro, es el presente."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Harness Engineering",
              description:
                "Planificacion y desarrollo de software asistido por IA. Prompt engineering, context management y validacion iterativa.",
              tags: ["Claude", "ChatGPT", "Copilot"],
            },
            {
              title: "Prototipado Rapido",
              description:
                "Generacion de MVPs y pruebas de concepto en horas, no semanas. Iteracion acelerada con feedback inmediato.",
              tags: ["v0.dev", "Bolt.new", "Cursor"],
            },
            {
              title: "Code Review & Refactor",
              description:
                "Uso de IA para detectar anti-patrones, sugerir optimizaciones y mantener codigo limpio a escala.",
              tags: ["Static Analysis", "AI Linting"],
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-border bg-card/80 backdrop-blur-sm p-6 space-y-4 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_40px_-12px] hover:shadow-primary/20 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="chip text-[10px]">
                    {tag}
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
