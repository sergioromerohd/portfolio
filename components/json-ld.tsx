import { siteConfig } from "@/lib/site"

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: "Full Stack Developer",
    knowsAbout: [
      "TypeScript",
      "JavaScript",
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
    ],
    sameAs: [siteConfig.github, siteConfig.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madrid",
      addressCountry: "ES",
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
