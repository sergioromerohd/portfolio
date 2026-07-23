"use client"

import { useEffect, useRef, useState } from "react"
import { siteConfig } from "@/lib/site"

const PROMPT = "$"

const INTRO = [
  { type: "output" as const, text: "sergio@portfolio ~ /home" },
  { type: "output" as const, text: "" },
  { type: "input" as const, text: "whoami" },
  { type: "output" as const, text: "sergio — full stack developer · madrid" },
  { type: "output" as const, text: "" },
  { type: "input" as const, text: "cat stack.json" },
  { type: "output" as const, text: '["ts","js","python","next.js","react","react native","node","postgres","docker","mqtt","iot"]' },
  { type: "output" as const, text: "" },
  { type: "input" as const, text: "cat projects.md | head -5" },
  { type: "output" as const, text: "→ 6 shipped, 2 in progress" },
  { type: "output" as const, text: "" },
  { type: "input" as const, text: "./contact.sh" },
  { type: "output" as const, text: `→ ${siteConfig.url}#contact` },
  { type: "output" as const, text: "" },
  { type: "output" as const, text: "click en la terminal y escribe 'help' para jugar." },
]

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "comandos: whoami | stack | projects | contact | cv | about | clear | social",
  ],
  whoami: () => ["sergio romero — full stack developer · madrid · 3+ años exp"],
  stack: () => [
    "ts · js · python · sql",
    "next.js · react · react native · tailwind",
    "node · express · fastapi · postgres · mongo · mqtt · redis",
    "docker · nginx · linux · gh actions",
  ],
  projects: () => [
    "actua 2.0        [prod]  sonometria y actas",
    "irma             [prod]  iot vibraciones",
    "cia              [prod]  cursos acusticos",
    "actua landing    [prod]  landing + faq",
    "irma app         [wip]   monitoreo movil",
    "meta ads rep.    [paused] ia anti-fraude",
    "finzen           [wip]   agregador financiero",
  ],
  contact: () => [
    `email    ${siteConfig.email}`,
    `whatsapp ${siteConfig.phone}`,
    `linkedin ${siteConfig.linkedin}`,
  ],
  about: () => [
    "sergio romero, full stack developer.",
    "apasionado por la tecnologia. curioso por naturaleza.",
    "filosofia: cada error te hace mas fuerte.",
  ],
  social: () => [
    `github   ${siteConfig.github}`,
    `linkedin ${siteConfig.linkedin}`,
  ],
  cv: () => {
    if (typeof window !== "undefined") window.open(siteConfig.cv, "_blank")
    return ["abriendo cv.pdf..."]
  },
}

export function Terminal() {
  const [lines, setLines] = useState<{ type: string; text: string }[]>([])
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"typing" | "idle" | "active">("typing")
  const [cursor, setCursor] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<string[]>([])
  const histIdx = useRef(-1)

  // blink cursor
  useEffect(() => {
    const i = setInterval(() => setCursor((c) => !c), 530)
    return () => clearInterval(i)
  }, [])

  // scroll to bottom
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  // typewriter
  useEffect(() => {
    if (mode !== "typing") return
    let idx = 0

    const typeLine = () => {
      if (idx >= INTRO.length) {
        setMode("idle")
        return
      }
      const line = INTRO[idx]
      const visible = line.type === "input" ? `${PROMPT} ${line.text}` : line.text

      let i = 0
      const charInterval = setInterval(() => {
        setLines((prev) => {
          const copy = [...prev]
          copy[idx] = { type: line.type, text: visible.slice(0, i + 1) }
          return copy
        })
        i++
        if (i >= visible.length) {
          clearInterval(charInterval)
          idx++
          const delay = line.type === "input" ? 550 : 160
          setTimeout(typeLine, delay)
        }
      }, 18)
    }

    typeLine()
  }, [])

  // activate on click
  const activate = () => {
    if (mode === "idle") {
      setMode("active")
      setTimeout(() => inputRef.current?.focus(), 60)
    }
  }

  const run = (cmd: string) => {
    const t = cmd.trim()
    if (!t) return

    historyRef.current.push(t)
    histIdx.current = -1

    setLines((prev) => [...prev, { type: "input", text: `${PROMPT} ${t}` }])

    const handler = COMMANDS[t.toLowerCase()]
    if (handler) {
      if (t === "clear") { setLines([]); setInput(""); return }
      const out = handler()
      setLines((prev) => [...prev, ...out.map((o) => ({ type: "output" as const, text: o }))])
    } else if (t === "sudo") {
      setLines((prev) => [...prev, { type: "output", text: "nice try. permission denied." }])
    } else if (t === "exit") {
      setLines([])
      setMode("idle")
    } else {
      setLines((prev) => [
        ...prev,
        { type: "output", text: `zsh: command not found: ${t}` },
        { type: "output", text: "prueba 'help'" },
      ])
    }
    setInput("")
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") run(input)
    else if (e.key === "ArrowUp") {
      e.preventDefault()
      const h = historyRef.current
      if (!h.length) return
      histIdx.current = Math.min(histIdx.current + 1, h.length - 1)
      setInput(h[h.length - 1 - histIdx.current])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (histIdx.current <= 0) { histIdx.current = -1; setInput(""); return }
      histIdx.current--
      setInput(historyRef.current[historyRef.current.length - 1 - histIdx.current])
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card shadow-2xl shadow-primary/5 overflow-hidden" onClick={activate}>
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs font-mono text-muted-foreground">
          sergio@portfolio ~ /home
          {mode === "active" && <span className="text-primary ml-2">● LIVE</span>}
        </span>
      </div>

      {/* body */}
      <div ref={bodyRef} className="p-4 font-mono text-sm leading-relaxed h-[320px] overflow-y-auto">
        {lines.map((l, i) => (
          <div key={i} className={l.type === "input" ? "text-primary/90" : "text-foreground/80"}>
            {l.text}
          </div>
        ))}

        {mode === "active" && (
          <div className="flex items-center">
            <span className="text-primary shrink-0">{PROMPT}&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm caret-primary"
              autoFocus
              spellCheck={false}
            />
          </div>
        )}

        {mode === "idle" && (
          <div className="flex items-center gap-1.5">
            <span className="text-primary">{PROMPT}&nbsp;</span>
            <span className={cursor ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 80ms" }}>▋</span>
            <span className="text-xs text-muted-foreground opacity-30 ml-2">click para interactuar</span>
          </div>
        )}
      </div>
    </div>
  )
}
