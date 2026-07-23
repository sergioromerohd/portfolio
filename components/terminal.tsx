"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { siteConfig } from "@/lib/site"

type Line = {
  type: "output" | "input"
  text: string
}

const PROMPT = "visitor@portfolio:~$"

const INTRO: Line[] = [
  { type: "output", text: "┌─────────────────────────────────────────────┐" },
  { type: "output", text: "│  portfolio.sergioromerohd.com — v2.0        │" },
  { type: "output", text: "│  kernel: next.js 15.5 | node 22             │" },
  { type: "output", text: "└─────────────────────────────────────────────┘" },
  { type: "output", text: "" },
  { type: "input", text: "whoami" },
  { type: "output", text: "sergio romero — full stack developer · madrid" },
  { type: "output", text: "" },
  { type: "input", text: "cat stack.json" },
  { type: "output", text: '["ts","js","python","next.js","react","react native","node","postgres","docker","mqtt","iot"]' },
  { type: "output", text: "" },
  { type: "input", text: "ls projects/" },
  { type: "output", text: "actua-2.0  irma  cia  irma-app  finzen  meta-ads-reporter" },
  { type: "output", text: "" },
  { type: "output", text: "escribe 'help' para ver comandos disponibles." },
]

const COMMANDS: Record<string, (args: string[]) => string[]> = {
  help: () => [
    "comandos:",
    "  whoami     — info",
    "  stack      — tecnologias",
    "  projects   — lista proyectos",
    "  contact    — contacto",
    "  cv         — descargar cv",
    "  clear      — limpiar",
    "  about      — sobre mi",
    "  social     — links",
    "  exit       — salir",
  ],
  whoami: () => [
    "sergio romero — full stack developer",
    "madrid, españa · disponible",
    "3+ años · 12+ proyectos · iot / web3 / defi",
  ],
  stack: () => [
    "languages   ts, js, python, sql",
    "frontend    next.js, react, react native, tailwind",
    "backend     node, express, fastapi, postgres, mongo, mqtt, redis",
    "infra       docker, nginx, linux, gh actions",
    "tools       git, flutterflow, supabase, playwright",
  ],
  projects: () => [
    "actua 2.0      — sonometria y actas        [prod]",
    "irma           — iot vibraciones           [prod]",
    "cia            — cursos acusticos          [prod]",
    "irma app       — monitoreo en tiempo real  [wip]",
    "meta ads rep.  — ia anti-fraude            [paused]",
    "finzen         — agregador financiero      [wip]",
  ],
  contact: () => [
    `email     ${siteConfig.email}`,
    `whatsapp  ${siteConfig.phone}`,
    `linkedin  ${siteConfig.linkedin}`,
    `github    ${siteConfig.github}`,
  ],
  about: () => [
    "sergio romero, desarrollador full stack.",
    "apasionado por la tecnologia y la innovacion.",
    "filosofia: cada error te hace mas fuerte.",
  ],
  social: () => [
    `github   → ${siteConfig.github}`,
    `linkedin → ${siteConfig.linkedin}`,
  ],
  cv: () => {
    if (typeof window !== "undefined") window.open(siteConfig.cv, "_blank")
    return ["abriendo cv.pdf..."]
  },
  clear: () => [],
}

export function Terminal() {
  const [displayLines, setDisplayLines] = useState<{ type: string; text: string }[]>([])
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"typing" | "idle" | "interactive">("typing")
  const [historyIdx, setHistoryIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const commandHistory = useRef<string[]>([])
  const typingRef = useRef<number | null>(null)

  // build flat list of all characters to type
  const flatChars = INTRO.flatMap((line) => {
    const prefix = line.type === "input" ? PROMPT + " " : ""
    const full = prefix + line.text
    return full.split("").map((ch) => ({ ch, type: line.type }))
  })

  // typewriter effect
  useEffect(() => {
    if (mode !== "typing") return
    let i = 0
    let currentLineIdx = 0
    let currentText = ""

    const tick = () => {
      if (i >= flatChars.length) {
        setMode("idle")
        return
      }

      const { ch, type } = flatChars[i]
      currentText += ch

      // figure out which INTRO line we're on
      let charCount = 0
      let lineIdx = 0
      for (let j = 0; j < INTRO.length; j++) {
        const prefix = INTRO[j].type === "input" ? PROMPT + " " : ""
        const len = (prefix + INTRO[j].text).length
        if (i < charCount + len) { lineIdx = j; break }
        charCount += len
      }

      setDisplayLines((prev) => {
        const copy = [...prev]
        // ensure we have slots for all lines up to current
        while (copy.length <= lineIdx) copy.push({ type: INTRO[copy.length]?.type || "output", text: "" })
        copy[lineIdx] = { type, text: currentText }
        // keep only lines up to current
        return copy.slice(0, lineIdx + 1)
      })

      i++

      // pause longer after input lines complete
      const isEndOfInputLine =
        INTRO[lineIdx]?.type === "input" &&
        currentText.length === (PROMPT + " " + INTRO[lineIdx].text).length

      if (isEndOfInputLine) {
        typingRef.current = window.setTimeout(() => {
          currentText = ""
          i++ // skip to next line
          tick()
        }, 500)
      } else {
        typingRef.current = window.setTimeout(tick, 18)
      }
    }

    tick()

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current)
    }
  }, [])

  // auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [displayLines, input])

  const focusInput = useCallback(() => {
    if (mode === "idle") {
      setMode("interactive")
      setTimeout(() => inputRef.current?.focus(), 50)
    } else if (mode === "interactive") {
      inputRef.current?.focus()
    }
  }, [mode])

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    commandHistory.current.push(trimmed)
    setHistoryIdx(-1)

    setDisplayLines((prev) => [
      ...prev,
      { type: "input", text: PROMPT + " " + trimmed },
    ])

    const [name, ...args] = trimmed.split(/\s+/)
    const handler = COMMANDS[name.toLowerCase()]

    if (handler) {
      const output = handler(args)
      if (name === "clear") {
        setDisplayLines([])
        setInput("")
        return
      }
      setDisplayLines((prev) => [
        ...prev,
        ...output.map((t) => ({ type: "output" as const, text: t })),
      ])
    } else if (trimmed === "sudo") {
      setDisplayLines((prev) => [...prev, { type: "output", text: "jaja nice try. permission denied." }])
    } else if (name === "exit") {
      setDisplayLines([])
      setMode("idle")
    } else {
      setDisplayLines((prev) => [
        ...prev,
        { type: "output", text: `zsh: command not found: ${name}` },
        { type: "output", text: "prueba 'help'." },
      ])
    }
    setInput("")
  }, [])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const h = commandHistory.current
      if (h.length === 0) return
      const newIdx = Math.min(historyIdx + 1, h.length - 1)
      setHistoryIdx(newIdx)
      setInput(h[h.length - 1 - newIdx] || "")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIdx <= 0) { setHistoryIdx(-1); setInput(""); return }
      const newIdx = historyIdx - 1
      setHistoryIdx(newIdx)
      setInput(commandHistory.current[commandHistory.current.length - 1 - newIdx] || "")
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card shadow-2xl shadow-primary/5 overflow-hidden" onClick={focusInput}>
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs font-mono text-muted-foreground">
          sergio@portfolio ~ /home
          {mode === "interactive" && <span className="text-primary ml-2">● LIVE</span>}
        </span>
      </div>

      {/* body */}
      <div ref={containerRef} className="p-4 font-mono text-sm leading-relaxed h-[320px] overflow-y-auto">
        {displayLines.map((l, i) => (
          <div key={i} className={l.type === "input" ? "text-primary/90 whitespace-pre-wrap" : "text-foreground/80 whitespace-pre-wrap"}>
            {l.text}
          </div>
        ))}

        {mode === "interactive" && (
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
            />
          </div>
        )}

        {mode === "idle" && (
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
