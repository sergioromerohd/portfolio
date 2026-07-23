"use client"

import { useEffect, useState } from "react"

const lines = [
  { prompt: "$", text: "whoami", output: "sergio — full stack developer · madrid" },
  { prompt: "$", text: "cat stack.json", output: null }, // se imprime multilinea
  { prompt: "$", text: "cat projects.md | head -5", output: "→ 6 shipped, 2 in progress" },
  { prompt: "$", text: "./contact.sh", output: "→ cv.sergioromerohd.com#contact" },
]

const stackOutput = `{
  "languages": ["TypeScript", "JavaScript", "Python"],
  "frontend": ["Next.js", "React", "Tailwind"],
  "backend":  ["Node", "FastAPI", "Postgres"],
  "infra":    ["Docker", "GitHub Actions", "Linux"]
}`

export function Terminal() {
  const [shown, setShown] = useState(0)
  const [typed, setTyped] = useState("")
  const [phase, setPhase] = useState<"typing" | "output" | "stack" | "done">("typing")
  const [stackShown, setStackShown] = useState("")

  // main sequence
  useEffect(() => {
    if (shown >= lines.length) {
      setPhase("done")
      return
    }
    const line = lines[shown]
    if (phase === "typing") {
      if (typed.length < line.text.length) {
        const t = setTimeout(() => setTyped(line.text.slice(0, typed.length + 1)), 35)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => {
          if (line.text === "cat stack.json") {
            setPhase("stack")
          } else {
            setPhase("output")
          }
        }, 250)
        return () => clearTimeout(t)
      }
    }
    if (phase === "output") {
      const t = setTimeout(() => {
        setTyped("")
        setShown((s) => s + 1)
        setPhase("typing")
      }, 1200)
      return () => clearTimeout(t)
    }
    if (phase === "stack") {
      if (stackShown.length < stackOutput.length) {
        const t = setTimeout(() => setStackShown(stackOutput.slice(0, stackShown.length + 1)), 4)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => {
          setTyped("")
          setStackShown("")
          setShown((s) => s + 1)
          setPhase("typing")
        }, 1500)
        return () => clearTimeout(t)
      }
    }
  }, [shown, typed, phase, stackShown])

  return (
    <div className="rounded-lg border border-border bg-card shadow-2xl shadow-primary/5 overflow-hidden">
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs font-mono text-muted-foreground">
          sergio@portfolio ~ /home
        </span>
      </div>

      <div className="p-6 font-mono text-sm md:text-[0.9rem] leading-relaxed min-h-[280px]">
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} className="mb-1">
            <div>
              <span className="text-primary">{l.prompt}</span>{" "}
              <span className="text-foreground">{l.text}</span>
            </div>
            {l.text === "cat stack.json" ? null : l.output ? (
              <div className="text-muted-foreground pl-4">{l.output}</div>
            ) : null}
          </div>
        ))}

        {/* stack multiline output */}
        {lines[shown]?.text === "cat stack.json" && phase === "stack" && (
          <div className="text-muted-foreground pl-4 whitespace-pre">{stackShown}</div>
        )}

        {/* current line */}
        {phase !== "done" && shown < lines.length && (
          <div>
            <div>
              <span className="text-primary">{lines[shown].prompt}</span>{" "}
              <span className="text-foreground">{typed}</span>
              <span className="inline-block w-2 h-4 bg-primary align-middle ml-0.5 animate-caret-blink" />
            </div>
          </div>
        )}

        {phase === "done" && (
          <div className="mt-2">
            <span className="text-primary">$</span>{" "}
            <span className="inline-block w-2 h-4 bg-primary align-middle ml-0.5 animate-caret-blink" />
          </div>
        )}
      </div>
    </div>
  )
}
