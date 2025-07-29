"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "DBBasico",
      period: "01/24 - Presente",
      description:
        "Desarrollo y soporte ti de aplicaciones web y móviles. Implementación de soluciones de monitoreo y medición de vibraciones en tiempo real.",
      skills: ["React Native", "Node.js", "MongoDB", "MQTT"],
    },
    {
      title: "Web Developer, Maquetador - Freelance",
      company: "orwee",
      period: "12/24 - Presente",
      description:
        "Desarrollo y maquetacion de la aplicacion web de orwee.io, una plataforma de informacion DEFI del ecosistema blockchain.",
      skills: ["flutterflow", "Node.js", "PostgreSQL", "Tailwind CSS"],
    },
    {
      title: "Tenant developer - Practicas",
      company: "BBVA NEXT",
      period: "02/23 - 06/23",
      description:
        "Colaboración en la migración de la plataforma de tenants interno del bbva a GO. Gestión de la creación de tenants y soporte a usuarios internos.",
      skills: ["GO", "JAVA", "Docker", "Kubernetes"],
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
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-[#FFDAB9] inline-block"
          >
            Experiencia Profesional
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Mi trayectoria profesional en el desarrollo web
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative border-l-2 border-muted pl-6 ml-6 md:ml-0 space-y-10"
          >
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={itemVariants} className="relative">
                <div className="absolute w-4 h-4 rounded-full bg-[#FFDAB9] -left-[30px] top-1.5"></div>
                <Card className="border shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <Badge variant="outline" className="w-fit">
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-lg font-medium text-muted-foreground">{exp.company}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
