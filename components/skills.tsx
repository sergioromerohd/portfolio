"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Database, Globe, Layout, Server, Smartphone, Terminal, Figma, GitBranch, Cloud } from "lucide-react"

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const skills = [
    { name: "Frontend", icon: Layout, color: "from-blue-500 to-cyan-500" },
    { name: "Backend", icon: Server, color: "from-green-500 to-emerald-500" },
    { name: "Bases de Datos", icon: Database, color: "from-orange-500 to-amber-500" },
    { name: "Desarrollo Móvil", icon: Smartphone, color: "from-purple-500 to-violet-500" },
    { name: "DevOps", icon: Cloud, color: "from-red-500 to-pink-500" },
    { name: "Control de Versiones", icon: GitBranch, color: "from-gray-500 to-slate-500" },
    { name: "Diseño UI/UX", icon: Figma, color: "from-indigo-500 to-blue-500" },
    { name: "APIs", icon: Globe, color: "from-yellow-500 to-amber-500" },
    { name: "aquitectura", icon: Code, color: "from-pink-500 to-rose-500" },
    { name: "Metodologías Ágiles", icon: Terminal  , color: "from-teal-500 to-cyan-500" },
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-[#FFDAB9] inline-block"
          >
            Mis Habilidades
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Un conjunto diverso de habilidades técnicas que me permiten desarrollar soluciones completas
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="bg-card hover:bg-card/80 rounded-xl p-6 h-full flex flex-col items-center justify-center text-center transition-all duration-300 shadow-lg hover:shadow-xl border border-border">
                <div className={`p-4 rounded-full bg-gradient-to-br ${skill.color} mb-4 text-white`}>
                  <skill.icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-lg mb-2">{skill.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              "React Native",
              "Next.js",
              "Node.js",
              "Express.js",
              "MongoDB",
              "PostgreSQL",
              "python",
              "Django",
              "Java",
              "Spring Boot",
              "Tailwind CSS",
              "Arduino",
              "Flutter Flow",
              
            ].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-muted text-sm font-medium hover:bg-primary/10 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
