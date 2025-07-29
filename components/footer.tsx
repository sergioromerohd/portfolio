"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-muted/50 py-10 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="text-2xl font-bold text-[#FFDAB9]">
              Sergio Romero
            </Link>
            <p className="text-muted-foreground mt-2">Desarrollador Full Stack</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 md:mt-0"
          >
            <nav className="flex flex-wrap justify-center gap-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Inicio
              </Link>
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                Sobre Mí
              </Link>
              <Link href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">
                Habilidades
              </Link>
              <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Proyectos
              </Link>
              <Link href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">
                Experiencia
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </Link>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 md:mt-0"
          >
            <Button variant="outline" size="icon" className="rounded-full" onClick={scrollToTop}>
              <ArrowUp className="w-4 h-4" />
              <span className="sr-only">Volver arriba</span>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground"
        >
          <p>© {new Date().getFullYear()} Sergio Romero. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </footer>
  )
}
