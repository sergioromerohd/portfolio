"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { SectionHeader } from "@/components/stack"
import { projects } from "@/lib/projects"

const tabs = [
  { key: "all", label: "todo" },
  { key: "shipped", label: "prod" },
  { key: "wip", label: "wip" },
]

export function Projects() {
  const [filter, setFilter] = useState("all")

  const filtered = filter === "all"
    ? projects
    : projects.filter((p) => p.status === filter)

  return (
    <section id="projects" className="py-24 border-t border-border">
      <div className="container">
        <SectionHeader
          tag="// 02"
          title="Proyectos"
          subtitle="Seleccion de trabajos recientes. La mayoria son productos en produccion, no demos."
        />

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
                filter === t.key
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <div
              key={p.title}
              className="card-glow rounded-lg border border-border bg-card p-6 space-y-4 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    {p.status === "wip" && (
                      <span className="chip text-[10px]">wip</span>
                    )}
                    {p.status === "paused" && (
                      <span className="chip text-[10px]">paused</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {p.tagline}
                  </p>
                </div>
                {p.url && p.url !== "#" && (
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
