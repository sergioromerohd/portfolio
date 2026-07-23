// Single source of truth para datos del sitio.
// Si cambia algo de tu info, edita aqui y se propaga.

export const siteConfig = {
  name: "Sergio Romero",
  handle: "sergioromerohd",
  title: "Sergio Romero — Full Stack Developer",
  description:
    "Full Stack Developer en Madrid. Construyo productos con TypeScript, Next.js, Node y cloud. Disponible para proyectos freelance y colaboraciones.",
  url: "https://cv.sergioromerohd.com",
  ogImage: "/og.png",
  email: "sergio.romero.hombre@gmail.com",
  phone: "+34696589554",
  whatsapp: "34696589554",
  location: "Madrid, España",
  github: "https://github.com/sergioromerohd",
  linkedin: "https://www.linkedin.com/in/sergioromerohd/",
  cv: "/cv.pdf",
  social: [
    { name: "GitHub", url: "https://github.com/sergioromerohd", handle: "@sergioromerohd" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/sergioromerohd/", handle: "in/sergioromerohd" },
    { name: "Email", url: "mailto:sergio.romero.hombre@gmail.com", handle: "sergio.romero.hombre@gmail.com" },
    { name: "WhatsApp", url: "https://wa.me/34696589554", handle: "+34 696 58 95 54" },
  ],
} as const

export const stack = {
  languages: ["TypeScript", "JavaScript", "Python", "SQL"],
  frontend: ["Next.js", "React", "React Native", "Tailwind CSS"],
  backend: ["Node.js", "Express", "FastAPI", "PostgreSQL", "MongoDB", "MQTT", "Redis"],
  infra: ["Docker", "Nginx Proxy Manager", "Linux", "GitHub Actions"],
  tools: ["Git", "FlutterFlow", "Supabase", "Playwright"],
} as const

export type Stack = typeof stack
