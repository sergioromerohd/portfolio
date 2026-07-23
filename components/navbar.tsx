"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const links = [
  { href: "#about", label: "sobre mí" },
  { href: "#stack", label: "stack" },
  { href: "#projects", label: "proyectos" },
  { href: "#experience", label: "experiencia" },
  { href: "#ai-workflow", label: "ia" },
  { href: "#contact", label: "contacto" },
]

export function Navbar() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState("")

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6)

      // detect which section is in view
      for (const l of links) {
        const el = document.querySelector(l.href)
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top < 200 && r.bottom > 100) {
            setActive(l.href)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        visible
          ? "translate-y-0 bg-background/70 backdrop-blur-xl border-b border-border shadow-[0_1px_0_0] shadow-border/30"
          : "-translate-y-full",
      )}
    >
      <div className="container flex items-center justify-between h-14">
        <Link href="#" className="font-mono text-sm text-primary hover:text-primary/80 transition-colors">
          <span className="text-muted-foreground">$</span> sergio<span className="text-muted-foreground">.dev</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "px-3 py-1.5 text-xs font-mono rounded-md transition-colors",
                active === l.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* mobile: compact */}
        <div className="md:hidden flex items-center gap-2">
          {links.slice(0, 4).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors px-1"
            >
              {l.label.split(" ")[0]}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
