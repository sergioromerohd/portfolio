import Image from "next/image"
import { SectionHeader } from "@/components/stack"

export function About() {
  return (
    <section id="about" className="py-24 border-t border-border">
      <div className="container">
        <SectionHeader
          tag="// 00"
          title="Sobre mi"
          subtitle="Me gusta entender cómo funcionan las cosas y construirlas de verdad."
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
                Me llamo <strong className="text-foreground">Sergio Romero</strong>. Soy desarrollador y una persona bastante inquieta: me gusta estar con el ordenador, cacharrear y convertir una idea en algo que pueda utilizarse de verdad.
              </p>
              <p>
                Desde pequeño he sido el típico curioso que desmonta cosas para entender cómo funcionan. La <strong className="text-foreground">informática</strong> no fue una excepción. Esa curiosidad me llevó al desarrollo full stack, al IoT y ahora también al mundo DevSecOps.
              </p>
              <p>
                Mi filosofía es bastante simple: cuanto más aprendo, más me equivoco; y cada error me obliga a entender mejor el problema. Me gusta trabajar de extremo a extremo, desde la primera pantalla hasta el despliegue y el mantenimiento de un producto.
              </p>
            </div>

            <div className="border-l-2 border-primary/40 pl-4 text-sm text-muted-foreground">
              <p>Ahora estoy centrado en desarrollo, DevSecOps y en seguir aprendiendo dentro de un equipo nuevo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
