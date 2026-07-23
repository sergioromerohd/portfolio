export type Project = {
  title: string
  tagline: string
  description: string
  tech: string[]
  url?: string
  status?: "shipped" | "wip" | "paused"
  image?: string
}

const ABOUT = "https://about.dbblab.es"

export const projects: Project[] = [
  {
    title: "ACTUA 2.0",
    tagline: "Analisis de sonometria y actas",
    description:
      "Plataforma web para analisis de sonometria y generacion de actas tecnicas/policiales automatizadas. Usada por tecnicos y fuerzas del orden.",
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    url: "https://actua2.dbblab.es/",
    status: "shipped",
    image: "/actua.png",
  },
  {
    title: "IRMA",
    tagline: "Monitorizacion IoT de vibraciones",
    description:
      "Landing + recursos del sistema IRMA: monitorizacion inteligente de vibraciones industriales en tiempo real, con dashboard analitico y alertas.",
    tech: ["Next.js", "React", "IoT", "MQTT"],
    url: `${ABOUT}/irma`,
    status: "shipped",
    image: "/setablancaSF.png",
  },
  {
    title: "ACTUA 2.0 Landing",
    tagline: "Landing y FAQ del producto",
    description:
      "Landing comercial y recursos tecnicos (FAQ/Tutorial) de ACTUA 2.0 para uso policial y pericial.",
    tech: ["Next.js", "React"],
    url: `${ABOUT}/actua`,
    status: "shipped",
    image: "/actua-playmobil-v2.png",
  },
  {
    title: "CIA",
    tagline: "Cursos de inspecciones acusticas",
    description:
      "Landing de CIA con informacion de niveles, metodologia y FAQ. Producto de formacion vinculado a DBBasico.",
    tech: ["Next.js", "React"],
    url: `${ABOUT}/cia`,
    status: "shipped",
    image: "/dbbasico.png",
  },
  {
    title: "Irma APP",
    tagline: "Monitoreo IoT en tiempo real",
    description:
      "Aplicacion movil para medicion de vibraciones en tiempo real e historico. Dashboard analitico, visualizacion de datos y alertas inteligentes.",
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
