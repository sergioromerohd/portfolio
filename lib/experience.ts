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
    company: "DBBasico",
    period: "01/24 — presente",
    location: "Madrid, España",
    bullets: [
      "Desarrollo integral de aplicaciones web y moviles especializadas en monitoreo IoT.",
      "Implementacion de dashboards analiticos para medicion de vibraciones industriales, PRL y mantenimiento predictivo.",
      "Desarrollo de aplicacion para analisis de grabaciones de sonido enfocada a policias y analistas de ruidos.",
    ],
    tech: ["React Native", "Node.js", "MongoDB", "MQTT", "IoT", "Docker"],
  },
  {
    role: "Web Developer & UI Designer — Freelance",
    company: "Orwee",
    period: "12/24 — presente",
    location: "Remoto",
    bullets: [
      "Desarrollo y diseno completo de la plataforma web orwee.io, una aplicacion DeFi del ecosistema blockchain.",
      "Adaptacion del diseño para moviles y tablets.",
      "Integracion de APIs blockchain para datos en tiempo real y funcionalidades de portfolio/chatbots.",
    ],
    tech: ["FlutterFlow", "Supabase", "JavaScript", "DeFi", "Blockchain"],
  },
  {
    role: "Tenant Developer — Practicas",
    company: "BBVA NEXT",
    period: "02/23 — 06/23",
    location: "Madrid, España",
    bullets: [
      "Colaboracion en la migracion de la plataforma interna de tenants de BBVA a tecnologias Go.",
      "Desarrollo de herramientas de automatizacion que redujeron el tiempo de despliegue en un 60%.",
      "Gestion de +50 tenants en entorno de produccion.",
    ],
    tech: ["Go", "Java", "Docker", "Kubernetes", "Cloud", "DevOps"],
  },
]
