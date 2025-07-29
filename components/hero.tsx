"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurar el tamaño del canvas para que ocupe toda la pantalla
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Caracteres para el efecto Matrix
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";

    // Columnas para las letras cayendo
    const fontSize = 15;
    const columns = Math.floor(canvas.width / fontSize);

    // Estructura para almacenar información de cada gota
    type Drop = {
      x: number;
      y: number;
      value: string;
      speed: number;
      brightness: number;
    };

    const drops: Drop[] = [];

    // Inicializar todas las gotas
    for (let i = 0; i < columns; i++) {
      drops.push({
        x: i * fontSize,
        y: Math.random() * canvas.height,
        value: chars[Math.floor(Math.random() * chars.length)],
        speed: 1 + Math.random() * 1.5,
        brightness: 0.1 + Math.random() * 0.2,
      });
    }

    // Posición del ratón
    let mouseX = 0;
    let mouseY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let mouseSpeed = 0;
    let lastMouseMoveTime = Date.now();

    // Estructura para letras alrededor del cursor
    type CursorChar = {
      x: number;
      y: number;
      value: string;
      opacity: number;
      size: number;
      velocityX: number;
      velocityY: number;
      lifespan: number; // Tiempo de vida en milisegundos
      createdAt: number; // Timestamp de creación
    };

    const cursorChars: CursorChar[] = [];

    // Función para generar un carácter aleatorio alrededor del cursor
    const generateCursorChar = (x: number, y: number, speed: number) => {
      // Posición aleatoria alrededor del cursor, más dispersa con mayor velocidad
      const dispersionFactor = 5 + speed * 2;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * dispersionFactor + 10;

      // Velocidad de movimiento basada en la velocidad del ratón
      const velocityMultiplier = 0.5 + speed / 50;

      return {
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        value: chars[Math.floor(Math.random() * chars.length)],
        opacity: 0.8 + Math.random() * 0.2,
        size: 10 + Math.random() * 10,
        velocityX: (Math.random() - 0.5) * 3 * velocityMultiplier,
        velocityY: (Math.random() - 0.5) * 3 * velocityMultiplier,
        lifespan: 1000 + Math.random() * 2000, // Entre 1 y 3 segundos
        createdAt: Date.now(),
      };
    };

    // Actualizar posición del ratón
    const handleMouseMove = (e: MouseEvent) => {
      // Calcular la velocidad del ratón
      const currentTime = Date.now();
      const timeDelta = currentTime - lastMouseMoveTime;

      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Calcular la distancia recorrida
      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calcular velocidad (píxeles por milisegundo)
      mouseSpeed = timeDelta > 0 ? distance / timeDelta : 0;

      // Convertir a una escala más manejable (0-100)
      mouseSpeed = Math.min(100, mouseSpeed * 20);

      // Generar caracteres basados en la velocidad
      const charsToAdd = Math.min(3, Math.floor(mouseSpeed / 30) + 1); // Máximo 3 caracteres por movimiento

      for (let i = 0; i < charsToAdd; i++) {
        cursorChars.push(generateCursorChar(mouseX, mouseY, mouseSpeed));
      }

      lastMouseMoveTime = currentTime;
    };

    // Manejar clics para crear explosiones de caracteres
    const handleClick = (e: MouseEvent) => {
      // Crear una explosión de caracteres (muchos más que con el movimiento normal)
      const explosionSize = 10 + Math.random() * 10;

      for (let i = 0; i < explosionSize; i++) {
        const char = generateCursorChar(e.clientX, e.clientY, 50);
        // Mayor velocidad y dispersión para la explosión
        char.velocityX *= 2;
        char.velocityY *= 2;
        cursorChars.push(char);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Función para dibujar el efecto Matrix
    const draw = () => {
      // Fondo semi-transparente para crear el efecto de desvanecimiento
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Dibujar las letras que caen (efecto Matrix original)
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        // Color de las letras - usando el tono #FFDAB9 con opacidad baja
        ctx.fillStyle = `rgba(255, 218, 185, ${drop.brightness})`;

        // Dibujar el caracter
        ctx.fillText(drop.value, drop.x, drop.y);

        // Actualizar posición Y
        drop.y += drop.speed;

        // Cambiar el caracter aleatoriamente a veces
        if (Math.random() > 0.98) {
          drop.value = chars[Math.floor(Math.random() * chars.length)];
        }

        // Enviar la gota de vuelta al principio después de que cruce la pantalla
        if (drop.y > canvas.height) {
          drop.y = 0;
          drop.x = i * fontSize;
          drop.value = chars[Math.floor(Math.random() * chars.length)];
          drop.speed = 1 + Math.random() * 1.5;
        }
      }

      // 2. Dibujar y actualizar los caracteres alrededor del cursor
      const currentTime = Date.now();

      for (let i = cursorChars.length - 1; i >= 0; i--) {
        const char = cursorChars[i];
        const age = currentTime - char.createdAt;

        // Calcular opacidad basada en la edad del carácter
        const lifePercent = age / char.lifespan;
        char.opacity = Math.max(0, 1 - lifePercent);

        // Actualizar posición
        char.x += char.velocityX;
        char.y += char.velocityY;

        // Reducir velocidad gradualmente
        char.velocityX *= 0.98;
        char.velocityY *= 0.98;

        // Dibujar el caracter
        ctx.font = `${char.size}px monospace`;
        ctx.fillStyle = `rgba(255, 218, 185, ${char.opacity})`;
        ctx.fillText(char.value, char.x, char.y);

        // Eliminar caracteres que han superado su tiempo de vida
        if (age > char.lifespan) {
          cursorChars.splice(i, 1);
        }
      }

      // Limitar la cantidad de caracteres para evitar problemas de rendimiento
      if (cursorChars.length > 500) {
        cursorChars.splice(0, cursorChars.length - 500);
      }
    };

    // Ejecutar la animación
    const interval = setInterval(draw, 35);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-4">
      {/* Canvas para el efecto Matrix */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-30"
      />

      <div className="container relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="mt-2 block text-[#FFDAB9]">Sergio Romero</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mt-4 text-xl sm:text-2xl md:text-3xl font-mono  h-16">
            <TypeAnimation
              sequence={[
                'console.log("Backend Developer");',
                1000,
                'db.execute("SELECT * FROM DevOps_Skills");',
                1000,
                'System.out.println("Node, spring, express");',
                1000,
                'docker run --name="Microservices Architect";',
                1000,
                'python3 -c "print(\'API Developer\')";',
                1000,
                'function() { return "Frontend Developer"; }',
                1000,
                'print("React, Next.js, React Native");',
                1000,
                'console.log("Full Stack Developer");',
                1000,
              ]}
              wrapper="span"
              speed={70}
              style={{ display: "inline-block" }}
              repeat={Infinity}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-[#FFDAB9] text-black hover:bg-[#FFDAB9]/80"
            onClick={() => {
              const element = document.getElementById("projects");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Ver Proyectos
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#FFDAB9] text-[#FFDAB9] hover:bg-[#FFDAB9]/10"
            onClick={() => {
              //open cv from assets /public
              // Create a link element

              const link = document.createElement("a");
              link.href = "/cv.pdf"; // Path to your CV file
              link.download = "sergio_romero_cv.pdf"; // Name for the downloaded file
              link.target = "_blank"; // Open in a new tab
              // Append to the body
              document.body.appendChild(link);
              // Trigger the download
              link.click();
              // Clean up and remove the link
              document.body.removeChild(link);
            }}
          >
            Descargar CV
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex justify-center space-x-6"
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#FFDAB9] hover:bg-[#FFDAB9]/10"
            onClick={() => {
              window.open("https://github.com/sergioromerohd", "_blank");
            }}
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#FFDAB9] hover:bg-[#FFDAB9]/10"
            onClick={() => {
              window.open("https://www.linkedin.com/in/sergioromerohd/", "_blank");
            }
            }
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Button>
          
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-10"
      >
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-[#FFDAB9] hover:bg-[#FFDAB9]/10 animate-bounce"
          onClick={() => {
            const element = document.getElementById("about");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <ArrowDown className="h-5 w-5" />
          <span className="sr-only">Scroll Down</span>
        </Button>
      </motion.div>
    </section>
  );
}
