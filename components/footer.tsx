"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUp, Heart, Github, Linkedin, Mail, MapPin, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerSections = [
    {
      title: "Navegación",
      links: [
        { label: "Inicio", href: "#" },
        { label: "Sobre Mí", href: "#about" },
        { label: "Habilidades", href: "#skills" },
        { label: "Proyectos", href: "#projects" },
        { label: "Experiencia", href: "#experience" },
        { label: "Contacto", href: "#contact" }
      ]
    },
    {
      title: "Servicios",
      links: [
        { label: "Desarrollo Web", href: "#" },
        { label: "Aplicaciones Móviles", href: "#" },
        { label: "Consultoría Técnica", href: "#" },
        { label: "DevOps & Cloud", href: "#" }
      ]
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/sergioromerohd",
      label: "GitHub",
      color: "hover:text-gray-400"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/sergioromerohd/",
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    {
      icon: Mail,
      href: "mailto:sergio.romero.hombre@gmail.com",
      label: "Email",
      color: "hover:text-red-400"
    }
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Link href="/" className="inline-block mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3"
                >
                  <div 
                    className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-lg"
                  >
                    SR
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Sergio Romero</h3>
                    <p className="text-sm" style={{ color: "var(--primary-gold)" }}>
                      Full Stack Developer
                    </p>
                  </div>
                </motion.div>
              </Link>
              
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Desarrollador apasionado por crear soluciones tecnológicas innovadoras. 
                Especializado en aplicaciones web y móviles de alto rendimiento.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: "var(--primary-gold)" }} />
                  Madrid, España
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: "var(--primary-gold)" }} />
                  sergio.romero.hombre@gmail.com
                </div>
              </div>
            </motion.div>

            {/* Footer Sections */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (sectionIndex + 1) * 0.2 }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">
                  {section.title}
                </h4>
                <nav className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.div key={linkIndex}>
                      <Link 
                        href={link.href} 
                        className="block text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        <motion.span
                          whileHover={{ x: 3 }}
                          className="inline-block"
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            ))}
          </div>

         
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="container mx-auto px-4 py-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400"
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                
              </div>
              
              <div className="flex items-center gap-4 text-xs">
                <span>Uso de los datos de forma comercial no permitido</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span>Sergio Romero</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-20"
            style={{
              backgroundColor: "var(--primary-gold)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
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
    </footer>
  )
}
