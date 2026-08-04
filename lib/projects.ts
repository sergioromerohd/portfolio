export type Project = {
  title: string
  tagline: string
  description: string
  tech: string[]
  url?: string
  status?: "shipped" | "wip" | "paused"
  image?: string
  role?: string
  context?: string
}

const ABOUT = "https://about.dbblab.es"

export const projects: Project[] = [
  {
    title: "ACTUA 2.0",
    tagline: "Analisis de sonometria y actas",
    description:
      "Producto completo para análisis de sonometría y generación de actas técnicas y policiales automatizadas. Lo desarrollé de principio a fin: diseño, aplicación, lógica, despliegue y mantenimiento. Se utiliza en contextos profesionales, policiales y periciales.",
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    url: "https://actua2.dbblab.es/",
    status: "shipped",
    image: "/actua.png",
    role: "Desarrollo integral · Full stack · Producto en producción",
    context: "DBBasico",
  },
  {
    title: "IRMA",
    tagline: "Monitorizacion IoT de vibraciones",
    description:
      "Sistema IoT para monitorización inteligente de vibraciones industriales en tiempo real. Incluye aplicación móvil, dashboard, históricos, visualización de datos y alertas. He construido la herramienta completa y su despliegue.",
    tech: ["React Native", "Next.js", "Node.js", "MongoDB", "MQTT", "IoT"],
    url: `${ABOUT}/irma`,
    status: "shipped",
    image: "/setablancaSF.png",
    role: "Desarrollo integral · IoT · Producto en producción",
    context: "DBBasico",
  },
  {
    title: "ACTUA 2.0 Landing",
    tagline: "Landing y FAQ del producto",
    description:
      "Landing comercial y recursos técnicos de ACTUA 2.0, con FAQ y tutoriales para explicar un producto especializado a técnicos, cuerpos policiales y perfiles periciales.",
    tech: ["Next.js", "React"],
    url: `${ABOUT}/actua`,
    status: "shipped",
    image: "/actua-playmobil-v2.png",
  },
  {
    title: "CIA",
    tagline: "Cursos de inspecciones acusticas",
    description:
      "Landing de CIA con información de niveles, metodología y FAQ. Producto de formación vinculado a DBBasico.",
    tech: ["Next.js", "React"],
    url: `${ABOUT}/cia`,
    status: "shipped",
    image: "/dbbasico.png",
  },
  {
    title: "Irma APP",
    tagline: "Monitoreo IoT en tiempo real",
    description:
      "Aplicación móvil para medición de vibraciones en tiempo real e histórico, conectada al ecosistema IoT de IRMA. Incluye dashboard analítico, visualización de datos y alertas inteligentes.",
    tech: ["React Native", "Node.js", "MongoDB", "MQTT"],
    url: "https://dbbasico.es/",
    status: "wip",
    image: "/irma.png",
  },
  {
    title: "Meta ADS IA Reporter",
    tagline: "Automatizacion contra campanas fraudulentas",
    description:
      "Herramienta de automatizacion para reportes de campanas publicitarias fraudulentas en Facebook Ads, usando IA para detectar patrones sospechosos.",
    tech: ["Python", "SQLite", "Selenium"],
    url: "#",
    status: "paused",
    image: "/phising.webp",
  },
  {
    title: "Finzen",
    tagline: "Agregador financiero personal",
    description:
      "SaaS que consolida cuentas bancarias, inversion y cripto en una vista unica. Backend en Node, Postgres, BYOK para conectar bancos via Salt Edge.",
    tech: ["Next.js", "TypeScript", "Postgres", "Docker"],
    url: "#",
    status: "wip",
  },
]
