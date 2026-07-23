import { stack } from "@/lib/site"

const sections: { label: string; key: keyof typeof stack }[] = [
  { label: "languages", key: "languages" },
  { label: "frontend", key: "frontend" },
  { label: "backend", key: "backend" },
  { label: "infra", key: "infra" },
  { label: "tools", key: "tools" },
]

export function Stack() {
  return (
    <section id="stack" className="py-24 border-t border-border">
      <div className="container">
        <SectionHeader
          tag="// 01"
          title="Stack"
          subtitle="Las herramientas que uso a diario. Pragmatismo > hype."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {sections.map((s) => (
            <div key={s.key} className="bg-card p-6 space-y-3 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">./{s.label}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <ul className="space-y-1.5">
                {stack[s.key].map((item) => (
                  <li key={item} className="font-mono text-sm text-foreground flex items-center gap-2">
                    <span className="text-primary">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SectionHeader({
  tag,
  title,
  subtitle,
}: {
  tag: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <div className="font-mono text-xs text-primary mb-2">{tag}</div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-pretty">{subtitle}</p>
      )}
    </div>
  )
}
