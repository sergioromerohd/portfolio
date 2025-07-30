"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github, Play, Info, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects = [
    {
      title: "ACTUA 2.0",
      subtitle: "Plataforma de Actas De mediciones Sonoras",
      description: "plataforma enfocada en el uso policial y judicial para la gestión de actas de mediciones sonoras, permitiendo la creación, edición y almacenamiento seguro de actas digitales.",
      image: "/dbbasico.png",
      tags: ["React", "Node.js", "PostgreSQL", "bruel", "cesva"],
      demoUrl: "https://dbbasico.es/",
      repoUrl: "https://dbbasico.es/",
      featured: true,
      status: "En Desarrollo"
    },
    {
      title: "Menu QR Negocio",
      subtitle: "Plataforma de Gestión Digital",
      description: "Una plataforma completa para dar de alta y gestionar menús digitales QR para restaurantes y negocios, permitiendo gestión de pedidos y pagos en línea completamente configurable por el usuario.",
      image: "/logoqr.png",
      tags: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "Stripe API"],
      demoUrl: "https://menu-qr-lac.vercel.app/",
      repoUrl: "#",
      featured: true,
      status: "En Producción"
    },
    {
      title: "Irma APP",
      subtitle: "Monitoreo IoT en Tiempo Real",
      description: "Aplicación móvil desarrollada para el monitoreo y medición de vibraciones en tiempo real e histórico. Incluye dashboard analítico con visualización de datos y alertas inteligentes.",
      image: "/irma.png",
      tags: ["React Native", "Node.js", "MongoDB", "MQTT", "IoT"],
      demoUrl: "https://dbbasico.es/",
      repoUrl: "https://dbbasico.es/",
      featured: true,
      status: "En Desarrollo"
    },
    {
      title: "Meta ADS IA Reporter",
      subtitle: "Automatización con Inteligencia Artificial",
      description: "Herramienta de automatización para reportes de campañas publicitarias fraudulentas en Facebook Ads, utilizando IA para detectar patrones sospechosos y generar reportes automáticos.",
      image: "/phising.webp",
      tags: ["Python", "SQLite", "Selenium", "Machine Learning", "AI"],
      demoUrl: "#",
      repoUrl: "#",
      featured: false,
      status: "Completado"
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Producción":
        return "bg-green-500"
      case "En Desarrollo":
        return "bg-blue-500"
      case "Completado":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span 
              className="inline-block px-6 py-3 rounded-full text-sm font-semibold mb-4"
              style={{ 
                backgroundColor: "var(--primary-gold)",
                color: "white"
              }}
            >
              Portfolio
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Proyectos Destacados
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Una selección de mis trabajos más recientes y significativos, desde aplicaciones web hasta soluciones móviles innovadoras.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
             Destacar que la mayoria no son de codigo abierto, para cualquier consulta o ver más detalles, no dudes en contactarme.
          </motion.p>        </div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -15, scale: 1.02 }}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative"
            >
              <Card className="overflow-hidden border-none shadow-xl h-full flex flex-col bg-card/50 backdrop-blur-sm hover-lift">
                {/* Image Container */}
                <div className="relative overflow-hidden h-64">
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      {project.status}
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500">
                        <Star className="w-3 h-3 fill-current" />
                        Destacado
                      </div>
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Hover Actions */}
                  <AnimatePresence>
                    {hoveredProject === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 z-10"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Button
                            size="sm"
                            className="gradient-primary text-white hover:opacity-90 rounded-full shadow-lg"
                            asChild
                          >
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <Play className="w-4 h-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        </motion.div>
                        
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full"
                            asChild
                          >
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              Código
                            </a>
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Content */}
                <CardContent className="flex-1 flex flex-col p-6 space-y-4">
                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: "var(--primary-gold)" }}>
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tagIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: tagIndex * 0.1 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="font-normal text-xs px-2 py-1 bg-muted/50 hover:bg-muted transition-colors"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons (Mobile) */}
                  <div className="flex gap-2 md:hidden">
                    <Button
                      size="sm"
                      className="gradient-primary text-white hover:opacity-90 rounded-full flex-1"
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
                      className="rounded-full"
                      asChild
                    >
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 py-3 font-semibold border-2 hover:bg-muted/50"
              style={{ borderColor: "var(--primary-gold)" }}
              onClick={() => window.open("https://github.com/sergioromerohd?tab=repositories", "_blank")}
            >
              <Github className="w-5 h-5 mr-2" />
              Ver Más Proyectos en GitHub
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-30"
              style={{
                backgroundColor: "var(--primary-gold)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 2, 1]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
