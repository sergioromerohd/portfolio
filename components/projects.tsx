"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const projects = [
    {
      title: "Menu QR Negocio",
      description:
        "Una plataforma para dar de alta y gestionar menús digitales QR para restaurantes y negocios, permitiendo gestionar pedidos y pagos en línea, configurable por el usuario.",
      image: "https://sdmntpritalynorth.oaiusercontent.com/files/00000000-c91c-6246-8ac1-7188df4ede43/raw?se=2025-05-05T11%3A55%3A14Z&sp=r&sv=2024-08-04&sr=b&scid=2f6650cc-b6ea-5647-be77-024dcc37b8f7&skoid=54ae6e2b-352e-4235-bc96-afa2512cc978&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-05T06%3A20%3A54Z&ske=2025-05-06T06%3A20%3A54Z&sks=b&skv=2024-08-04&sig=76WHG3urk%2BIYhX41GhjkDOqp4Y6A1SMChf5XRXohhEk%3D",
      tags: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
      demoUrl: "https://menu-qr-lac.vercel.app/",
      repoUrl: "#",
    },
    {
      title: "Irma APP",
      description:
        "Aplicacion Movil bajo DBBasico para el monitoreo y mediciones de vibraciones en tiempo real o historico.",
      image: "/irma.png",
      tags: ["React Native", "Node.js", "MongoDB", "MQTT"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      title: "Meta ADS IA Reporter",
      description:
        "automatización de reportes de campañas publicitarias fraudulentas en Facebook Ads, utilizando IA para detectar patrones y generar reportes.",
      image: "https://sdmntprukwest.oaiusercontent.com/files/00000000-b1ac-6243-bdd0-bdd0d057bc72/raw?se=2025-05-05T12%3A01%3A29Z&sp=r&sv=2024-08-04&sr=b&scid=9dfe50a3-006b-5b6a-94a5-2f1d87320dd2&skoid=54ae6e2b-352e-4235-bc96-afa2512cc978&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-04T18%3A37%3A10Z&ske=2025-05-05T18%3A37%3A10Z&sks=b&skv=2024-08-04&sig=0sePtkFSdy5xMZKEwv1i%2Bk0TEgSeZJhRj4y4Xhm1%2B8o%3D",
      tags: ["python", "sqlite", "selenium", "IA"],
      demoUrl: "#",
      repoUrl: "#",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-[#FFDAB9] inline-block"
          >
            Proyectos Destacados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Una selección de mis trabajos más recientes y significativos
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="group"
            >
              <Card className="overflow-hidden border-none shadow-lg h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center p-4">
                    <div className="flex gap-4 mb-4">
                      <Button
                        size="sm"
                        variant="default"
                        className="rounded-full bg-[#FFDAB9] text-black hover:bg-[#FFDAB9]/80"
                        asChild
                      >
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full bg-background/80 backdrop-blur-sm"
                        asChild
                      >
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Código
                        </a>
                      </Button>
                    </div>
                  </div>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Button size="lg" variant="outline" onClick={() => window.open("https://github.com/sergioromerohd?tab=repositories", "_blank")}>
            Ver Más Proyectos
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
