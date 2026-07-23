"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (h > 0) setPct(window.scrollY / h)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 bg-transparent pointer-events-none">
      <div
        className="h-full rounded-r-full transition-[width] duration-100 ease-out"
        style={{
          width: `${pct * 100}%`,
          background: "linear-gradient(90deg, #2dd4bf, #34d399, #a3e635, #eab308)",
        }}
      />
    </div>
  )
}
