"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Mail, MapPin, Phone, Send, MessageCircle, Calendar, Clock, Globe, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "sergio.romero.hombre@gmail.com",
      description: "Respuesta en 24h",
      color: "from-blue-500 to-cyan-500",
      action: () => window.open('mailto:sergio.romero.hombre@gmail.com')
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: "+34 696589554",
      description: "Llamadas y WhatsApp",
      color: "from-green-500 to-emerald-500",
      action: () => window.open('tel:+34696589554')
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Mensaje directo",
      description: "Respuesta inmediata",
      color: "from-green-400 to-green-600",
      action: () => window.open('https://wa.me/34696589554')
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: "Madrid, España",
      description: "Disponible para reuniones",
      color: "from-red-500 to-pink-500",
      action: () => window.open('https://maps.google.com/?q=Madrid,Spain')
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // WhatsApp integration
    const phone = '34696589554'
    const text = `🚀 Nuevo contacto desde el portfolio!

👤 Nombre: ${formData.name}
📧 Email: ${formData.email}
📝 Asunto: ${formData.subject}

💬 Mensaje:
${formData.message}

---
Enviado desde sergioromerohd.com`

    window.open(
      `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`,
      '_blank'
    )

    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "¡Mensaje enviado con éxito!",
        description: "Gracias por contactarme. Te responderé lo antes posible a través de WhatsApp.",
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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

  const methodVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const availabilityItems = [
    { icon: Clock, text: "Respuesta rápida garantizada" },
    { icon: Calendar, text: "Disponible para reuniones" },
    { icon: Globe, text: "Trabajo remoto y presencial" },
    { icon: CheckCircle, text: "Proyectos a largo plazo" }
  ]

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20" />
      
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
              Colaboremos Juntos
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              ¿Hablamos de tu proyecto?
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            ¿Tienes una idea brillante que necesita cobrar vida? Estoy aquí para convertir tu visión en realidad digital
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Card className="border-none shadow-xl bg-card/80 backdrop-blur-sm hover-lift">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Múltiples formas de conectar
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Elige la forma que más te convenga para iniciar nuestra conversación. 
                    Estoy disponible para proyectos freelance, colaboraciones o simplemente charlar sobre tecnología.
                  </p>
                </div>

                {/* Contact Methods */}
                <motion.div 
                  variants={methodVariants}
                  className="space-y-4"
                >
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ x: 5, scale: 1.02 }}
                      onClick={method.action}
                      className="flex items-center gap-4 p-4 rounded-xl glass hover-lift cursor-pointer group transition-all duration-300"
                    >
                      <div className={`p-3 rounded-full bg-gradient-to-br ${method.color} text-white group-hover:scale-110 transition-transform`}>
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-foreground">{method.label}</p>
                          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            {method.description}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{method.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Availability */}
                <div className="pt-6 border-t border-border/50">
                  <h4 className="font-semibold mb-4 text-foreground">Mi disponibilidad:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {availabilityItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <item.icon className="w-4 h-4" style={{ color: "var(--primary-gold)" }} />
                        {item.text}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-xl bg-card/80 backdrop-blur-sm hover-lift">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Envíame un mensaje
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Completa el formulario y te responderé a la brevedad a través de WhatsApp
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div 
                      className="space-y-2"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <Label htmlFor="name" className="text-sm font-medium">Nombre completo</Label>
                      <Input 
                        id="name" 
                        placeholder="Tu nombre" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className="transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-gold)]/20"
                        required 
                      />
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="tu@email.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-gold)]/20"
                        required 
                      />
                    </motion.div>
                  </div>

                  <motion.div 
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Label htmlFor="subject" className="text-sm font-medium">Asunto</Label>
                    <Input 
                      id="subject" 
                      placeholder="¿De qué quieres hablar?" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-gold)]/20"
                      required 
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Label htmlFor="message" className="text-sm font-medium">Mensaje</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Cuéntame sobre tu proyecto, ideas o cualquier consulta que tengas..." 
                      className="min-h-[120px] resize-none transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-gold)]/20"
                      value={formData.message}
                      onChange={handleInputChange}
                      required 
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full gradient-primary text-white hover:opacity-90 rounded-full py-3 font-semibold shadow-lg relative overflow-hidden"
                      disabled={isSubmitting}
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="submitting"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center gap-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            Enviando a WhatsApp...
                          </motion.div>
                        ) : (
                          <motion.div
                            key="default"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Enviar por WhatsApp
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Ripple effect */}
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-full"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 4, opacity: 0 }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    </Button>
                  </motion.div>
                </form>

                {/* Form Footer */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="text-xs text-muted-foreground text-center">
                    Al enviar este formulario, aceptas que me ponga en contacto contigo para discutir tu proyecto.
                    <br />
                    <span className="font-medium">Tiempo de respuesta promedio: &lt; 2 horas</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Disponible para nuevos proyectos
            </span>
          </div>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-30"
              style={{
                backgroundColor: "var(--primary-gold)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
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
