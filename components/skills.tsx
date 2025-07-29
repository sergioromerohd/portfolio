"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Code, Database, Globe, Layout, Server, Smartphone, Terminal, Figma, GitBranch, Cloud, ChevronRight } from "lucide-react"

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

  const skillCategories = [
    {
      name: "Frontend Development",
      icon: Layout,
      color: "from-blue-500 to-cyan-500",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      description: "Creación de interfaces modernas y responsivas"
    },
    {
      name: "Backend Development",
      icon: Server,
      color: "from-green-500 to-emerald-500",
      technologies: ["Node.js", "Express", "Python", "Django"],
      description: "APIs robustas y arquitecturas escalables"
    },
    {
      name: "Base de Datos",
      icon: Database,
      color: "from-orange-500 to-amber-500",
      technologies: ["PostgreSQL", "MongoDB", "Redis", "SQLite"],
      description: "Diseño y optimización de bases de datos"
    },
    {
      name: "Desarrollo Móvil",
      icon: Smartphone,
      color: "from-purple-500 to-violet-500",
      technologies: ["React Native", "Flutter", "Expo", "App Store"],
      description: "Apps nativas multiplataforma"
    },
    {
      name: "DevOps & Cloud",
      icon: Cloud,
      color: "from-red-500 to-pink-500",
      technologies: ["Docker", "AWS", "CI/CD", "Nginx"],
      description: "Despliegue y automatización"
    },
    {
      name: "Control de Versiones",
      icon: GitBranch,
      color: "from-gray-500 to-slate-500",
      technologies: ["Git", "GitHub", "GitLab", "Bitbucket"],
      description: "Gestión de código colaborativo"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    },
  }

  const techStackVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const techItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  }

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-background to-muted/20" />
      
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
              Habilidades Técnicas
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Tecnologías que domino
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Un conjunto diverso de habilidades técnicas que me permiten desarrollar soluciones completas y escalables
          </motion.p>
        </div>

        {/* Skills Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {skillCategories.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              onHoverStart={() => setHoveredSkill(index)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl glass hover-lift border border-border/50 transition-all duration-300">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${skill.color} mb-6 text-white shadow-lg`}>
                  <skill.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {skill.description}
                </p>

                {/* Technologies */}
                <motion.div
                  initial="hidden"
                  animate={hoveredSkill === index ? "visible" : "hidden"}
                  variants={techStackVariants}
                  className="space-y-2"
                >
                  <div className="flex items-center text-sm font-medium text-foreground mb-2">
                    <ChevronRight className="w-4 h-4 mr-1" style={{ color: "var(--primary-gold)" }} />
                    Tecnologías:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        variants={techItemVariants}
                        className="px-3 py-1 text-xs rounded-full font-medium"
                        style={{ 
                          backgroundColor: "var(--primary-gold)",
                          color: "white"
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Hover overlay */}
                <AnimatePresence>
                  {hoveredSkill === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-5 pointer-events-none`}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-foreground">
            Stack Tecnológico Principal
          </h3>
          
          <motion.div 
            variants={techStackVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
          >
            {[
              "React", "Next.js", "Node.js", "TypeScript", "Python", "Django",
              "PostgreSQL", "MongoDB", "Docker", "AWS", "React Native", 
              "Tailwind CSS", "Express.js", "Git", "Linux"
            ].map((tech, index) => (
              <motion.div
                key={index}
                variants={techItemVariants}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl glass hover-lift font-medium text-foreground border border-border/30 cursor-pointer transition-all duration-300"
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-20"
              style={{ 
                backgroundColor: "var(--primary-gold)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
