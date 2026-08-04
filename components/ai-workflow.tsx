import { Sparkles } from "lucide-react"
import { SectionHeader } from "@/components/stack"

export function AIWorkflow() {
  return (
    <section id="ai-workflow" className="py-24 border-t border-border bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
      <div className="container">
        <SectionHeader
          tag="// 05"
          title="Cómo uso la IA"
          subtitle="La uso como herramienta de trabajo, no como sustituto del criterio técnico."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Contexto antes que prompts",
              description:
                "Antes de pedir código, intento entender el problema, dividirlo y dejar claras las restricciones. La IA ayuda más cuando el contexto está bien preparado.",
              tags: ["Contexto", "Planificación", "Iteración"],
            },
            {
              title: "Prototipos que se pueden probar",
              description:
                "La utilizo para explorar una idea y llegar antes a una primera versión. Después toca probarla, simplificarla y asumir las decisiones que el código necesita.",
              tags: ["MVP", "Feedback", "Producto"],
            },
            {
              title: "Revisión humana",
              description:
                "Puede señalar errores, proponer alternativas o ayudar a leer una base de código. La responsabilidad de revisar, probar y decidir sigue siendo mía.",
              tags: ["Tests", "Revisión", "Criterio"],
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
