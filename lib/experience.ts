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
    role: "Desarrollador en equipo DevSecOps",
    company: "CSA",
    period: "04/07/2026 — presente",
    location: "Madrid, España",
    bullets: [
      "Incorporación a un equipo de desarrollo DevSecOps en consultoría tecnológica.",
      "Trabajo orientado a automatización, seguridad y optimización del ciclo de desarrollo y despliegue.",
    ],
    tech: ["DevSecOps", "Automatización", "Cloud", "Seguridad"],
  },
  {
    role: "Full Stack Developer",
    company: "DBBasico — Servicios de Acústica SL",
    period: "01/24 — 04/07/2026",
    location: "Madrid, España",
    bullets: [
      "Desarrollo principal de productos reales para medición acústica, análisis de sonometría y monitorización IoT.",
      "Trabajo de extremo a extremo: diseño, frontend, backend, lógica de negocio, datos, despliegue, soporte e I+D.",
      "Construcción de ACTUA e IRMA, utilizados en entornos profesionales acústicos, policiales y periciales.",
    ],
    tech: ["React Native", "Node.js", "MongoDB", "MQTT", "IoT", "Docker"],
  },
  {
    role: "Frontend Developer & UI Designer — colaboración",
    company: "Orwee",
    period: "12/24 — 04/07/2026",
    location: "Remoto",
    bullets: [
      "Desarrollo frontend de la herramienta orwee.io y adaptación de la experiencia para distintos dispositivos.",
      "Implementación de funcionalidades de usuarios, roles, favoritos, portfolios y métricas.",
      "Colaboración en una plataforma vinculada a Learning Heroes.",
    ],
    tech: ["FlutterFlow", "Supabase", "JavaScript", "DeFi", "Blockchain"],
  },
  {
    role: "Tenant Developer — Practicas",
    company: "BBVA NEXT",
    period: "02/23 — 06/23",
    location: "Madrid, España",
    bullets: [
      "Colaboración en la migración de la plataforma interna de tenants hacia tecnologías Go.",
      "Desarrollo de automatizaciones para agilizar despliegues y operaciones sobre entornos cloud.",
      "Trabajo con más de 50 tenants en un entorno de producción.",
    ],
    tech: ["Go", "Java", "Docker", "Kubernetes", "Cloud", "DevOps"],
  },
]
