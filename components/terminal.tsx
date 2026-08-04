"use client"

import { useEffect, useRef, useState } from "react"
import { siteConfig } from "@/lib/site"

const PROMPT = "$"

const demoLines = [
  { prompt: PROMPT, text: "whoami", output: "sergio — full stack developer · madrid" },
  { prompt: PROMPT, text: "cat stack.json", output: null },
  { prompt: PROMPT, text: "cat projects.md | head -5", output: "→ 6 shipped, 2 in progress" },
  { prompt: PROMPT, text: "./contact.sh", output: `→ ${siteConfig.url}#contact` },
]

const stackOutput = `{
  "languages": ["TypeScript", "JavaScript", "Python"],
  "frontend": ["Next.js", "React", "Tailwind"],
  "backend":  ["Node", "FastAPI", "Postgres"],
  "infra":    ["Docker", "GitHub Actions", "Linux"]
}`

const COMMANDS: Record<string, () => string[]> = {
  help: () => ["whoami | stack | projects | contact | cv | about | clear | social"],
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
    "orwee            [done]  frontend y producto",
    "finzen           [wip]   finanzas personales",
    "meta ads rep.    [paused] ia anti-fraude",
  ],
  contact: () => [`email ${siteConfig.email}`, `whatsapp ${siteConfig.phone}`, `linkedin ${siteConfig.linkedin}`],
  about: () => ["sergio romero, full stack developer.", "apasionado por la tecnologia.", "cada error te hace mas fuerte."],
  social: () => [`github ${siteConfig.github}`, `linkedin ${siteConfig.linkedin}`],
  cv: () => { if (typeof window !== "undefined") window.open(siteConfig.cv, "_blank"); return ["abriendo cv.pdf..."] },
}

export function Terminal() {
  const [shown, setShown] = useState(0)
  const [typed, setTyped] = useState("")
  const [phase, setPhase] = useState<"typing" | "output" | "stack" | "done">("typing")
  const [stackShown, setStackShown] = useState("")
  const [interactive, setInteractive] = useState(false)
  const [input, setInput] = useState("")
  const [userLines, setUserLines] = useState<{ type: string; text: string }[]>([])
  // typewriter for command output
  const [cmdOutput, setCmdOutput] = useState<string[]>([])
  const [cmdIdx, setCmdIdx] = useState(0)
  const [cmdChar, setCmdChar] = useState(0)
  const [cmdActive, setCmdActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const histRef = useRef<string[]>([])
  const histIdx = useRef(-1)

  // scroll
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight }, [userLines, input])

  // demo sequence (original logic untouched)
  useEffect(() => {
    if (phase === "done") return
    if (shown >= demoLines.length) { setPhase("done"); return }
    const line = demoLines[shown]

    if (phase === "typing") {
      if (typed.length < line.text.length) {
        const t = setTimeout(() => setTyped(line.text.slice(0, typed.length + 1)), 35)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setPhase(line.text === "cat stack.json" ? "stack" : "output"), 250)
      return () => clearTimeout(t)
    }

    if (phase === "output") {
      const t = setTimeout(() => { setTyped(""); setShown((s) => s + 1); setPhase("typing") }, 1200)
      return () => clearTimeout(t)
    }

    if (phase === "stack") {
      if (stackShown.length < stackOutput.length) {
        const t = setTimeout(() => setStackShown(stackOutput.slice(0, stackShown.length + 1)), 4)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => { setTyped(""); setStackShown(""); setShown((s) => s + 1); setPhase("typing") }, 1500)
      return () => clearTimeout(t)
    }
  }, [shown, typed, phase, stackShown])

  const activate = () => {
    if (phase === "done" && !interactive) {
      setInteractive(true)
      setTimeout(() => inputRef.current?.focus(), 60)
    }
  }

  // typewriter for interactive command output
  useEffect(() => {
    if (!cmdActive || cmdIdx >= cmdOutput.length) {
      if (cmdActive && cmdIdx >= cmdOutput.length) {
        // persist output to userLines when done
        setUserLines((prev) => [...prev, ...cmdOutput.map((o) => ({ type: "output" as const, text: o }))])
        setCmdActive(false)
        setCmdOutput([])
        setCmdIdx(0)
        setCmdChar(0)
      }
      return
    }
    const line = cmdOutput[cmdIdx]
    if (cmdChar < line.length) {
      const t = setTimeout(() => setCmdChar((c) => c + 1), 12)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => { setCmdIdx((i) => i + 1); setCmdChar(0) }, 80)
    return () => clearTimeout(t)
  }, [cmdActive, cmdIdx, cmdChar, cmdOutput])

  const run = (cmd: string) => {
    const t = cmd.trim()
    if (!t) return
    histRef.current.push(t)
    histIdx.current = -1
    setUserLines((prev) => [...prev, { type: "input", text: `${PROMPT} ${t}` }])

    const fn = COMMANDS[t.toLowerCase()]
    let out: string[] = []
    if (fn) {
      if (t === "clear") { setUserLines([]); setInput(""); return }
      out = fn()
    } else if (t === "exit") {
      setUserLines([]); setInteractive(false); setInput(""); return
    } else if (t === "sudo") {
      out = ["nice try. permission denied."]
    } else {
      out = [`zsh: command not found: ${t}`, "prueba 'help'"]
    }

    // start typewriter for output
    setCmdOutput(out)
    setCmdIdx(0)
    setCmdChar(0)
    setCmdActive(true)
    setInput("")
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") run(input)
    else if (e.key === "ArrowUp") {
      e.preventDefault()
      const h = histRef.current
      if (!h.length) return
      histIdx.current = Math.min(histIdx.current + 1, h.length - 1)
      setInput(h[h.length - 1 - histIdx.current])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (histIdx.current <= 0) { histIdx.current = -1; setInput(""); return }
      histIdx.current--
      setInput(histRef.current[histRef.current.length - 1 - histIdx.current])
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card shadow-2xl shadow-primary/5 overflow-hidden" onClick={activate}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs font-mono text-muted-foreground">
          sergio@portfolio ~ /home{interactive && <span className="text-primary ml-2">● LIVE</span>}
        </span>
      </div>

      <div ref={bodyRef} className="p-6 font-mono text-sm leading-relaxed h-[320px] overflow-y-auto">
        {/* Demo sequence */}
        {demoLines.slice(0, shown).map((l, i) => (
          <div key={i} className="mb-1">
            <div><span className="text-primary">{l.prompt}</span> <span className="text-foreground">{l.text}</span></div>
            {l.text === "cat stack.json" ? null : l.output ? <div className="text-muted-foreground pl-4">{l.output}</div> : null}
          </div>
        ))}

        {demoLines[shown]?.text === "cat stack.json" && phase === "stack" && (
          <div className="text-muted-foreground pl-4 whitespace-pre">{stackShown}</div>
        )}

        {/* Current typing line */}
        {phase !== "done" && shown < demoLines.length && (
          <div>
            <span className="text-primary">{demoLines[shown].prompt}</span>{" "}
            <span className="text-foreground">{typed}</span>
            <span className="inline-block w-2 h-4 bg-primary align-middle ml-0.5 animate-caret-blink" />
          </div>
        )}

        {/* User interactive lines */}
        {userLines.map((l, i) => (
          <div key={i} className={l.type === "input" ? "text-primary/90" : "text-foreground/80"}>{l.text}</div>
        ))}

        {/* Typewriter output for interactive commands */}
        {cmdActive && cmdOutput.slice(0, cmdIdx).map((line, i) => (
          <div key={i} className="text-foreground/80">{line}</div>
        ))}
        {cmdActive && cmdIdx < cmdOutput.length && (
          <div className="text-foreground/80">
            {cmdOutput[cmdIdx].slice(0, cmdChar)}
            <span className="inline-block w-2 h-4 bg-primary align-middle ml-0.5 animate-caret-blink" />
          </div>
        )}

        {/* Done state */}
        {phase === "done" && !interactive && (
          <div className="flex items-center gap-1.5">
            <span className="text-primary">{PROMPT}</span>{" "}
            <span className="inline-block w-2 h-4 bg-primary align-middle animate-caret-blink" />
            <span className="text-xs text-muted-foreground opacity-30 ml-3">click para interactuar</span>
          </div>
        )}

        {/* Interactive input */}
        {interactive && !cmdActive && (
          <div className="flex items-center">
            <span className="text-primary shrink-0">{PROMPT}&nbsp;</span>
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
              className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm caret-primary" autoFocus spellCheck={false} />
          </div>
        )}
      </div>
    </div>
  )
}
