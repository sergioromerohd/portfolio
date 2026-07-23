import Image from "next/image"
import { SectionHeader } from "@/components/stack"

const stats = [
  { value: "3+", label: "años exp." },
  { value: "12+", label: "proyectos" },
  { value: "3", label: "empresas" },
  { value: "24/7", label: "disponible" },
]

export function About() {
  return (
    <section id="about" className="py-24 border-t border-border">
      <div className="container">
        <SectionHeader
          tag="// 00"
          title="Sobre mi"
          subtitle="Innovacion a traves del codigo."
        />

        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8 items-start">
          <div className="relative aspect-[4/5] rounded-lg border border-border overflow-hidden bg-card">
            <Image
              src="/SergioRomero.jpg"
              alt="Sergio Romero"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Me llamo <strong className="text-foreground">Sergio Romero</strong> y soy un desarrollador full stack apasionado por la tecnologia y la innovacion.
              </p>
              <p>
                Desde pequeño he sido el tipico curioso que desmonta todo para entender como funciona. La <strong className="text-foreground">informatica</strong> no fue la excepcion, y esa curiosidad me llevo a convertirme en un solucionador de problemas nato.
              </p>
              <p>
                Mi filosofia es simple: cuanto mas aprendo, mas me equivoco, pero cada error me hace mas fuerte y me impulsa a buscar <strong className="text-foreground">soluciones creativas</strong> a desafios complejos.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-border bg-card/80 p-3 text-center hover:border-primary/30 transition-colors"
                >
                  <p className="text-xl font-bold text-primary font-mono">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Quick tags */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "Rol", v: "Full Stack Developer" },
                { k: "Ubicacion", v: "Madrid, España" },
                { k: "Stack", v: "Next.js / Node / IoT" },
                { k: "Intereses", v: "DeFi, Cloud, IA" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-lg border border-border bg-card p-3"
                >
                  <p className="text-xs text-muted-foreground">{item.k}</p>
                  <p className="text-sm font-mono text-foreground">{item.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
