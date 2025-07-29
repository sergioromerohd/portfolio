"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Heart, Target, Lightbulb } from "lucide-react"

export default function About() {
  const ref = useRef(null)
  const imageRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const traits = [
    {
      icon: User,
      title: "Desarrollador",
      description: "Apasionado por crear soluciones tecnológicas innovadoras"
    },
    {
      icon: Lightbulb,
      title: "Curioso",
      description: "Siempre investigando y aprendiendo nuevas tecnologías"
    },
    {
      icon: Target,
      title: "Orientado a Resultados",
      description: "Enfocado en resolver problemas y crear valor"
    },
    {
      icon: Heart,
      title: "Empático",
      description: "Creo en la colaboración y el trabajo en equipo"
    }
  ]

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 particles-bg opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Image Section */}
          <motion.div 
            ref={imageRef}
            variants={itemVariants} 
            className="relative order-2 lg:order-1"
          >
            <motion.div 
              style={{ y }}
              className="relative"
            >
              {/* Glowing background effect */}
              <div className="absolute -inset-8 rounded-2xl bg-gradient-to-r from-[var(--primary-gold)] via-[var(--accent-blue)] to-[var(--primary-gold)] opacity-20 blur-2xl animate-pulse" />
              
              <Card className="relative overflow-hidden rounded-2xl border-none shadow-2xl hover-lift">
                <CardContent className="p-0">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden"
                  >
                    <Image
                      src="/SergioRomero.jpg"
                      alt="Sergio Romero"
                      width={600}
                      height={600}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <div className="order-1 lg:order-2">
            <motion.div variants={itemVariants} className="mb-8">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                style={{ 
                  backgroundColor: "var(--primary-gold)",
                  color: "white"
                }}
              >
                Sobre Mí
              </motion.span>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Innovación a través del código
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 mb-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Me llamo <strong className="text-foreground">Sergio Romero</strong> y soy un desarrollador full stack apasionado por la tecnología y la innovación.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Desde pequeño he sido el típico curioso que desmonta todo para entender cómo funciona. La <strong className="text-foreground">informática</strong> no fue la excepción, y esa curiosidad me llevó a convertirme en un solucionador de problemas nato.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Mi filosofía es simple: cuanto más aprendo, más me equivoco, pero cada error me hace más fuerte y me impulsa a buscar <strong className="text-foreground">soluciones creativas</strong> a desafíos complejos.
              </p>
            </motion.div>

            {/* Traits Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {traits.map((trait, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-4 rounded-xl glass hover-lift"
                >
                  <trait.icon 
                    className="w-6 h-6 mb-2" 
                    style={{ color: "var(--primary-gold)" }}
                  />
                  <h3 className="font-semibold text-sm mb-1">{trait.title}</h3>
                  <p className="text-xs text-muted-foreground">{trait.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="gradient-primary text-white hover:opacity-90 rounded-full px-6 py-3 font-semibold shadow-lg"
                  onClick={() => {
                    window.open("https://www.linkedin.com/in/sergioromerohd/", "_blank")
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Más Sobre Mí
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  className="rounded-full px-6 py-3 font-semibold border-2 hover:bg-muted/50"
                  style={{ borderColor: "var(--primary-gold)" }}
                  onClick={() => {
                    const element = document.getElementById("experience");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Ver Experiencia
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "3+", label: "Años de experiencia" },
            { value: "15+", label: "Proyectos completados" },
            { value: "8+", label: "Tecnologías dominadas" },
            { value: "100%", label: "Dedicación" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl glass hover-lift"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                className="text-3xl font-bold mb-2"
                style={{ color: "var(--primary-gold)" }}
              >
                {stat.value}
              </motion.div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
