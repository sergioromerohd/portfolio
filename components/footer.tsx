import Link from "next/link"
import { siteConfig } from "@/lib/site"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border">
      <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs">
          <span>$ echo</span>
          <span>© {year} {siteConfig.name}</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            github
          </Link>
          <Link
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            linkedin
          </Link>
          <Link
            href={siteConfig.cv}
            className="hover:text-primary transition-colors"
            download
          >
            cv.pdf
          </Link>
        </div>
      </div>
    </footer>
  )
}
