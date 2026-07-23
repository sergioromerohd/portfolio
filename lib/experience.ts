export type Experience = {
  role: string
  company: string
  period: string
  location: string
  bullets: string[]
  tech: string[]
}

export const experiences: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2024 — presente",
    location: "Madrid (remoto)",
    bullets: [
      "Diseño y desarrollo de productos SaaS con Next.js, Node y Postgres.",
      "Self-hosting de infraestructura: Docker, Nginx Proxy Manager, CI desde GitHub.",
      "Integraciones con APIs bancarias, OpenAI y servicios cloud.",
    ],
    tech: ["Next.js", "TypeScript", "Postgres", "Docker", "GitHub Actions"],
  },
  {
    role: "Desarrollador Full Stack",
    company: "Proyectos propios",
    period: "2022 — 2024",
    location: "Madrid",
    bullets: [
      "Filmoteca IMDB, app full stack con autenticación y filtros avanzados.",
      "CPAD (proyectos DAM): CRUDs, APIs REST, despliegue en VPS.",
      "Integración con IMDB API pública y MongoDB.",
    ],
    tech: ["Node", "Express", "MongoDB", "EJS", "JavaScript"],
  },
]
