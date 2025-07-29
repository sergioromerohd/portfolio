"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, MapPin, ExternalLink, Award, TrendingUp } from "lucide-react"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null)

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "DBBasico",
      location: "Madrid, España",
      period: "01/24 - Presente",
      type: "Tiempo Completo",
      description:
        "Desarrollo integral de aplicaciones web y móviles especializadas en monitoreo IoT. Implementación de soluciones en tiempo real para medición de vibraciones industriales con dashboard analítico avanzado.",
      achievements: [
        "Desarrollé sistema de monitoreo en tiempo real que procesó +1M de datos por día",
        "Optimicé rendimiento de la aplicación móvil reduciendo tiempo de carga en 40%",
        "Implementé arquitectura microservicios escalable con Docker"
      ],
      skills: ["React Native", "Node.js", "MongoDB", "MQTT", "IoT", "Docker"],
      current: true
    },
    {
      title: "Web Developer & UI Designer - Freelance",
      company: "Orwee",
      location: "Remote",
      period: "12/24 - Presente", 
      type: "Freelance",
      description:
        "Desarrollo y diseño completo de la plataforma web orwee.io, una aplicación DeFi del ecosistema blockchain. Responsable del frontend, backend y experiencia de usuario.",
      achievements: [
        "Diseñé y desarrollé plataforma DeFi desde cero con +500 usuarios activos",
        "Integré APIs blockchain para datos en tiempo real",
        "Implementé dashboard responsivo con Tailwind CSS"
      ],
      skills: ["FlutterFlow", "Node.js", "PostgreSQL", "Tailwind CSS", "Blockchain"],
      current: true
    },
    {
      title: "Tenant Developer - Prácticas",
      company: "BBVA NEXT",
      location: "Madrid, España",
      period: "02/23 - 06/23",
      type: "Prácticas",
      description:
        "Colaboración en la migración de la plataforma interna de tenants de BBVA a tecnologías Go. Gestión de infraestructura cloud y soporte técnico a equipos internos.",
      achievements: [
        "Participé en migración exitosa de sistema legacy a arquitectura moderna",
        "Desarrollé herramientas de automatización que redujo tiempo de despliegue 60%",
        "Gestioné +50 tenants en entorno de producción"
      ],
      skills: ["Go", "Java", "Docker", "Kubernetes", "Cloud", "DevOps"],
      current: false
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
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    },
  }

  const achievementVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const achievementItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      
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
              Trayectoria Profesional
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Experiencia Profesional
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Mi evolución profesional en el desarrollo de software y tecnologías emergentes
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-border to-transparent" />

            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className={`relative mb-16 ${
                  index % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12'
                } md:w-1/2`}
                onHoverStart={() => setHoveredExperience(index)}
                onHoverEnd={() => setHoveredExperience(null)}
              >
                {/* Timeline Dot */}
                <motion.div 
                  className="absolute left-8 md:left-auto md:-right-3 w-6 h-6 rounded-full border-4 border-background z-10"
                  style={{ backgroundColor: exp.current ? "var(--primary-gold)" : "var(--accent-blue)" }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  {exp.current && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-1 rounded-full"
                      style={{ backgroundColor: "var(--primary-gold)" }}
                    />
                  )}
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="ml-16 md:ml-0"
                >
                  <Card className="border-none shadow-xl bg-card/80 backdrop-blur-sm hover-lift overflow-hidden">
                    <CardHeader className="pb-4">
                      {/* Company & Period */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-5 h-5" style={{ color: "var(--primary-gold)" }} />
                          <span className="font-bold text-lg text-foreground">{exp.company}</span>
                          {exp.current && (
                            <motion.div
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="px-2 py-1 text-xs rounded-full bg-green-500 text-white font-medium"
                            >
                              Actual
                            </motion.div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </div>
                      </div>

                      {/* Title & Location */}
                      <CardTitle className="text-xl mb-2">{exp.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                          style={{ borderColor: "var(--primary-gold)" }}
                        >
                          {exp.type}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <motion.div
                        initial="hidden"
                        animate={hoveredExperience === index ? "visible" : "hidden"}
                        variants={achievementVariants}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Award className="w-4 h-4" style={{ color: "var(--primary-gold)" }} />
                          <span className="font-semibold text-sm">Logros Destacados:</span>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {exp.achievements.map((achievement, achIndex) => (
                            <motion.li
                              key={achIndex}
                              variants={achievementItemVariants}
                              className="flex items-start gap-2 text-muted-foreground"
                            >
                              <TrendingUp className="w-3 h-3 mt-1 flex-shrink-0" style={{ color: "var(--primary-gold)" }} />
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* Skills */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-semibold text-sm">Tecnologías:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skillIndex}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: skillIndex * 0.1 }}
                              whileHover={{ scale: 1.1 }}
                            >
                              <Badge 
                                variant="secondary" 
                                className="font-normal text-xs px-3 py-1 bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>

                    {/* Hover Glow Effect */}
                    <AnimatePresence>
                      {hoveredExperience === index && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-[var(--primary-gold)]/5 via-[var(--accent-blue)]/5 to-[var(--primary-gold)]/5 pointer-events-none"
                        />
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: "2+", label: "Años de experiencia" },
              { value: "3", label: "Empresas trabajadas" },
              { value: "10+", label: "Proyectos entregados" },
              { value: "100%", label: "Compromiso" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl glass hover-lift text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="text-2xl font-bold mb-2"
                  style={{ color: "var(--primary-gold)" }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-20"
              style={{
                backgroundColor: i % 2 === 0 ? "var(--primary-gold)" : "var(--accent-blue)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
