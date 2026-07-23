"use client"

import { useEffect, useRef, useState } from "react"
import { siteConfig } from "@/lib/site"

type Line = {
  type: "prompt" | "output" | "input"
  text: string
}

const INTRO: Line[] = [
  { type: "output", text: "┌─────────────────────────────────────────────┐" },
  { type: "output", text: "│  portfolio.sergioromerohd.com — v2.0        │" },
  { type: "output", text: "│  kernel: next.js 15.5.21 | node 22          │" },
  { type: "output", text: "└─────────────────────────────────────────────┘" },
  { type: "output", text: "" },
  { type: "prompt", text: "whoami" },
  { type: "output", text: "sergio romero — full stack developer · madrid" },
  { type: "output", text: "" },
  { type: "prompt", text: "cat stack.json" },
  { type: "output", text: '["ts","js","python","next.js","react","react native","node","postgres","docker","mqtt","iot"]' },
  { type: "output", text: "" },
  { type: "prompt", text: "ls projects/" },
  { type: "output", text: "actua-2.0  irma  cia  irma-app  finzen  meta-ads-reporter" },
  { type: "output", text: "" },
  { type: "output", text: "escribe 'help' para ver comandos disponibles." },
]

const COMMANDS: Record<string, (args: string[]) => string[]> = {
  help: () => [
    "comandos disponibles:",
    "  whoami     — info personal",
    "  stack      — tech stack",
    "  projects   — lista de proyectos",
    "  contact    — email / whatsapp / linkedin",
    "  cv         — descargar cv",
    "  clear      — limpiar pantalla",
    "  about      — sobre mí",
    "  social     — github / linkedin",
    "  exit       — volver al modo demo",
  ],
  whoami: () => [
    "sergio romero — full stack developer",
    "madrid, españa · disponible para proyectos",
    "3+ años exp · 12+ proyectos · iot / web3 / defi",
  ],
  stack: () => [
    "languages   ts, js, python, sql",
    "frontend    next.js 15, react 19, react native, tailwind",
    "backend     node, express, fastapi, postgres, mongo, mqtt, redis",
    "infra       docker, nginx, linux, github actions",
    "tools       git, flutterflow, supabase, playwright",
  ],
  projects: () => [
    "actua 2.0        analisis de sonometria y actas       [prod]",
    "irma             monitorizacion iot de vibraciones    [prod]",
    "cia              cursos de inspecciones acusticas     [prod]",
    "actua landing    landing + faq del producto           [prod]",
    "irma app         monitoreo iot en tiempo real         [wip]",
    "meta ads reporter  ia contra campanas fraudulentas    [paused]",
    "finzen           agregador financiero personal         [wip]",
  ],
  contact: () => [
    `email     ${siteConfig.email}`,
    `whatsapp  ${siteConfig.phone}`,
    `linkedin  ${siteConfig.linkedin}`,
    `github    ${siteConfig.github}`,
  ],
  about: () => [
    "me llamo sergio romero y soy un desarrollador full stack",
    "apasionado por la tecnologia y la innovacion.",
    "",
    "mi filosofia: cuanto mas aprendo, mas me equivoco,",
    "pero cada error me hace mas fuerte.",
  ],
  social: () => [
    `github   → ${siteConfig.github}`,
    `linkedin → ${siteConfig.linkedin}`,
  ],
  cv: () => {
    if (typeof window !== "undefined") window.open(siteConfig.cv, "_blank")
    return ["abriendo cv.pdf en otra pestaña..."]
  },
  clear: () => [],
}

const PROMPT = "visitor@portfolio:~$"

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState("")
  const [step, setStep] = useState(0) // 0=intro, 1=idle, 2=interactive
  const [historyIdx, setHistoryIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const commandHistory = useRef<string[]>([])

  // typewriter intro
  useEffect(() => {
    if (step !== 0) return
    let i = 0
    let charIdx = 0
    const interval = setInterval(() => {
      if (i >= INTRO.length) {
        clearInterval(interval)
        setStep(1) // done intro, ready for interaction
        return
      }
      const line = INTRO[i]
      const full = line.type === "prompt" ? `${PROMPT} ${line.text}` : line.text
      setLines((prev) => {
        const copy = [...prev]
        if (copy.length <= i) copy.push({ type: line.type, text: "" })
        copy[i] = { ...line, text: full.slice(0, charIdx + 1) }
        return copy
      })
      charIdx++
      if (charIdx >= full.length) {
        charIdx = 0
        i++
        // pause longer after prompt lines
        if (INTRO[Math.min(i, INTRO.length - 1)]?.type === "prompt") {
          clearInterval(interval)
          setTimeout(() => {
            let ci = 0
            const inner = setInterval(() => {
              const l = INTRO[i]
              if (!l) { clearInterval(inner); setStep(1); return }
              const f = l.type === "prompt" ? `${PROMPT} ${l.text}` : l.text
              setLines((prev) => {
                const copy = [...prev]
                copy[i] = { ...l, text: f.slice(0, ci + 1) }
                return copy
              })
              ci++
              if (ci >= f.length) { ci = 0; i++; clearInterval(inner); }
            }, 12)
          }, 600)
        } else {
          // small pause between lines
        }
      }
    }, 14)
    return () => clearInterval(interval)
  }, [])

  // auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [lines])

  const focusInput = () => {
    if (step >= 1) {
      setStep(2)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    commandHistory.current.push(trimmed)
    setHistoryIdx(-1)

    setLines((prev) => [
      ...prev,
      { type: "input", text: `${PROMPT} ${trimmed}` },
    ])

    const [name, ...args] = trimmed.split(/\s+/)
    const handler = COMMANDS[name.toLowerCase()]

    if (handler) {
      const output = handler(args)
      if (name === "clear") {
        setLines([])
        return
      }
      setLines((prev) => [
        ...prev,
        ...output.map((t) => ({ type: "output" as const, text: t })),
      ])
    } else if (name === "exit") {
      setLines([])
      setStep(1) // back to idle — user can click again
    } else if (trimmed === "sudo") {
      setLines((prev) => [...prev, { type: "output", text: "jaja nice try. permission denied." }])
    } else {
      setLines((prev) => [
        ...prev,
        { type: "output", text: `zsh: command not found: ${name}` },
        { type: "output", text: "prueba 'help' para ver comandos." },
      ])
    }
    setInput("")
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.current.length === 0) return
      const newIdx = historyIdx + 1 < commandHistory.current.length ? historyIdx + 1 : historyIdx
      setHistoryIdx(newIdx)
      setInput(commandHistory.current[commandHistory.current.length - 1 - newIdx] || "")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIdx <= 0) {
        setHistoryIdx(-1)
        setInput("")
        return
      }
      const newIdx = historyIdx - 1
      setHistoryIdx(newIdx)
      setInput(commandHistory.current[commandHistory.current.length - 1 - newIdx] || "")
    }
  }

  return (
    <div
      className="rounded-lg border border-border bg-card shadow-2xl shadow-primary/5 overflow-hidden cursor-text"
      onClick={focusInput}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs font-mono text-muted-foreground">
          sergio@portfolio ~ /home
          {step === 2 && <span className="text-primary ml-2">● LIVE</span>}
        </span>
      </div>

      {/* Body */}
      <div
        ref={containerRef}
        className="p-4 font-mono text-sm md:text-[0.9rem] leading-relaxed h-[320px] overflow-y-auto"
      >
        {lines.map((l, i) => (
          <div key={i} className={
            l.type === "output"
              ? "text-foreground/80 whitespace-pre-wrap"
              : l.type === "input"
                ? "text-primary/90"
                : "text-muted-foreground"
          }>
            {l.text}
          </div>
        ))}

        {/* Input line */}
        {step === 2 && (
          <div className="flex items-center text-primary mt-0.5">
            <span className="text-muted-foreground shrink-0">{PROMPT}&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm caret-primary"
              autoFocus
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
        )}

        {/* Blinking cursor when idle */}
        {step === 1 && (
          <div className="flex items-center mt-0.5">
            <span className="text-muted-foreground">{PROMPT}&nbsp;</span>
            <span className="inline-block w-2 h-4 bg-primary animate-[caret-blink_1s_step-end_infinite]" />
            <span className="text-xs text-muted-foreground ml-2 opacity-40">click para interactuar</span>
          </div>
        )}
      </div>
    </div>
  )
}
