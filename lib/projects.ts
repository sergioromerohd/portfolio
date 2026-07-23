// Source of truth para proyectos. Edita aquí, no en el JSX.

export type Project = {
  title: string
  tagline: string
  description: string
  tech: string[]
  url?: string
  status?: "shipped" | "wip"
}

export const projects: Project[] = [
  {
    title: "Finzen",
    tagline: "Agregador financiero personal",
    description:
      "SaaS que consolida cuentas bancarias, inversión y cripto en una vista única. Backend en Node, Postgres, BYOK para conectar bancos via Salt Edge.",
    tech: ["Next.js", "TypeScript", "Postgres", "Docker"],
    status: "wip",
  },
  {
    title: "Irma Actúa FAQ",
    tagline: "Chatbot RAG para asociación",
    description:
      "Asistente que responde preguntas sobre servicios sociales de la asociación Irma Actúa usando búsqueda semántica sobre documentación propia.",
    tech: ["Next.js", "OpenAI", "Vector DB"],
    url: "https://github.com/sergioromerohd/irmaActuaFaq",
  },
  {
    title: "Filmoteca IMDB",
    tagline: "Catálogo personal de películas",
    description:
      "CRUD full stack con autenticación, calificaciones y filtros avanzados sobre la API pública de IMDB. Stack JAM con foco en SEO.",
    tech: ["Node", "Express", "MongoDB", "EJS"],
    url: "https://github.com/sergioromerohd/Filmoteca-imdb",
  },
  {
    title: "Hosting Nordic",
    tagline: "Self-hosted stack en Debian",
    description:
      "Setup documentado de servicios autoalojados con Docker, Nginx Proxy Manager y CI desde GitHub. Plantillas y recetas reutilizables.",
    tech: ["Docker", "NPM", "GitHub Actions"],
  },
]
