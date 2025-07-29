"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentText, setCurrentText] = useState("")
  
  const loadingTexts = [
    "Inicializando...",
    "Cargando experiencia...",
    "Configurando animaciones...",
    "¡Listo para impresionar!"
  ]

  useEffect(() => {
    let textIndex = 0
    const textInterval = setInterval(() => {
      if (textIndex < loadingTexts.length) {
        setCurrentText(loadingTexts[textIndex])
        textIndex++
      }
    }, 600)

    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2800)

    return () => {
      clearInterval(textInterval)
      clearTimeout(loadingTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="text-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-20 h-20 mx-auto rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold"
              >
                SR
              </motion.div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8"
            >
              <motion.h2 
                key={currentText}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-medium text-foreground"
              >
                {currentText}
              </motion.h2>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="h-1 bg-muted rounded-full mx-auto overflow-hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="h-full w-1/3 gradient-primary rounded-full"
              />
            </motion.div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {typeof window !== "undefined" && [...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * (window?.innerWidth || 1200),
                    y: (window?.innerHeight || 800) + 10,
                    opacity: 0
                  }}
                  animate={{ 
                    y: -10,
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "linear"
                  }}
                  className="absolute w-1 h-1 rounded-full"
                  style={{ backgroundColor: "var(--primary-gold)" }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}