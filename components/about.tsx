"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -inset-4 rounded-xl bg-[#FFDAB9] opacity-20 blur-xl"></div>
            <Card className="relative overflow-hidden rounded-xl border-none shadow-xl">
              <CardContent className="p-0">
                <Image
                  src="/cacara.png"
                  alt="Sergio Romero"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded-xl"
                />
              </CardContent>
            </Card>
          </motion.div>

          <div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6 text-[#FFDAB9] inline-block"
            >
              Sobre Mí
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg mb-4 text-muted-foreground">
              Me llamo Sergio Romero y soy DESARROLLADOR
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg mb-4 text-muted-foreground">
              Desde pequeño he sido el culo inquieto que le ha gustado entender el funcionamiento de ciertas cosas, y la INFORMATICA no ha sido una excepción. Soy muy CURIOSO y eso me lleva a investigar y APRENDER sobre muchísimos campos; cuanto más aprendo, más me equivoco, pero es esto lo que me hace ponerme retos y ser capaz de buscarme la vida para SOLUCIONAR PROBLEMAS.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg mb-6 text-muted-foreground">
            Socialmente se me podría llamar como: "El que es IMPOSIBLE que te caiga mal"; soy una persona muy EMPATICA y abierta, y siempre intento dar lo mejor de mí para que el que tengo al lado esté cómodo.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button className="bg-[#FFDAB9] text-black hover:bg-[#FFDAB9]/80"
              onClick={() => {
                //nav to url lk
                window.open("https://www.linkedin.com/in/sergioromerohd/", "_blank")
              }}
              >Más Sobre Mí</Button>
              <Button variant="outline" className="border-[#FFDAB9] text-[#FFDAB9] hover:bg-[#FFDAB9]/10"
              onClick={() => {
                const element = document.getElementById("experience");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              >
                Ver Experiencia
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
