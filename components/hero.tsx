"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Download, Code, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Enhanced canvas setup
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Improved Matrix effect with professional colors
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}<>/\\()[]";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    type Drop = {
      x: number;
      y: number;
      value: string;
      speed: number;
      brightness: number;
      trail: Array<{ y: number; brightness: number; value: string }>;
    };

    const drops: Drop[] = [];

    // Initialize drops with trail effect
    for (let i = 0; i < columns; i++) {
      drops.push({
        x: i * fontSize,
        y: Math.random() * canvas.height,
        value: chars[Math.floor(Math.random() * chars.length)],
        speed: 0.5 + Math.random() * 1,
        brightness: 0.1 + Math.random() * 0.3,
        trail: []
      });
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseInfluence = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseInfluence = 100;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      // Professional gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.95)");
      gradient.addColorStop(0.5, "rgba(17, 24, 39, 0.8)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.95)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;

      // Draw drops with enhanced trail effect
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        // Add current position to trail
        drop.trail.unshift({ 
          y: drop.y, 
          brightness: drop.brightness,
          value: drop.value 
        });
        
        // Limit trail length
        if (drop.trail.length > 20) {
          drop.trail.pop();
        }

        // Draw trail
        drop.trail.forEach((segment, index) => {
          const alpha = (1 - index / drop.trail.length) * segment.brightness;
          ctx.fillStyle = `rgba(201, 168, 118, ${alpha})`;
          ctx.fillText(segment.value, drop.x, segment.y);
        });

        // Mouse interaction effect
        const distance = Math.sqrt(
          Math.pow(mouseX - drop.x, 2) + Math.pow(mouseY - drop.y, 2)
        );
        
        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence;
          drop.speed += force * 2;
          drop.brightness = Math.min(1, drop.brightness + force * 0.5);
        } else {
          drop.speed = Math.max(0.5, drop.speed * 0.99);
          drop.brightness = Math.max(0.1, drop.brightness * 0.99);
        }

        // Update position
        drop.y += drop.speed;

        // Random character change
        if (Math.random() > 0.995) {
          drop.value = chars[Math.floor(Math.random() * chars.length)];
        }

        // Reset when off screen
        if (drop.y > canvas.height + 100) {
          drop.y = -20;
          drop.trail = [];
          drop.speed = 0.5 + Math.random() * 1;
          drop.brightness = 0.1 + Math.random() * 0.3;
        }
      }

      // Reduce mouse influence over time
      mouseInfluence = Math.max(0, mouseInfluence - 2);
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Enhanced Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-40"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {typeof window !== "undefined" && [...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * (window?.innerWidth || 1200),
              y: -20,
              scale: 0
            }}
            animate={{ 
              y: (window?.innerHeight || 800) + 20,
              scale: [0, 1, 1, 0],
              rotate: [0, 360],
              x: [
                null, 
                Math.random() * (window?.innerWidth || 1200)
              ]
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: "var(--primary-gold)" }}
          />
        ))}
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container relative z-10 mx-auto max-w-6xl text-center px-4"
      >
        {/* Professional Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4" style={{ color: "var(--primary-gold)" }} />
            <span className="text-sm font-medium text-muted-foreground">
              Full Stack Developer & Tech Innovator
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Sergio
            </span>
            <br />
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(135deg, var(--primary-gold) 0%, #D4AF37 100%)`
              }}
            >
              Romero
            </span>
          </h1>
        </motion.div>

        {/* Animated Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <div className="text-xl sm:text-2xl md:text-3xl font-mono text-gray-300 h-20 flex items-center justify-center">
            <TypeAnimation
              sequence={[
                'console.log("Backend Engineer");',
                1500,
                'SELECT skills FROM developer WHERE name="Sergio";',
                1500,
                'System.out.println("Full Stack Architect");',
                1500,
                'docker compose up --build microservices',
                1500,
                'const expertise = ["Node.js", "React", "Python"];',
                1500,
                'print("Innovation through code")',
                1500,
              ]}
              wrapper="span"
              speed={65}
              style={{ display: "inline-block" }}
              repeat={Infinity}
            />
          </div>
        </motion.div>

        {/* Professional Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-10"
        >
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Desarrollador apasionado por crear soluciones tecnológicas innovadoras que 
            transforman ideas en experiencias digitales excepcionales.
          </p>
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="gradient-primary text-white hover:opacity-90 rounded-full px-8 py-3 font-semibold shadow-lg hover-lift"
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <Code className="w-5 h-5 mr-2" />
              Ver Proyectos
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-2 text-white hover:bg-white/10 rounded-full px-8 py-3 font-semibold backdrop-blur-sm"
              style={{ borderColor: "var(--primary-gold)" }}
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/cv.pdf";
                link.download = "sergio_romero_cv.pdf";
                link.target = "_blank";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              Descargar CV
            </Button>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex justify-center space-x-6"
        >
          <motion.a
            href="https://github.com/sergioromerohd"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full glass hover-lift"
          >
            <Github className="h-6 w-6 text-white" />
            <span className="sr-only">GitHub</span>
          </motion.a>
          
          <motion.a
            href="https://www.linkedin.com/in/sergioromerohd/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full glass hover-lift"
          >
            <Linkedin className="h-6 w-6 text-white" />
            <span className="sr-only">LinkedIn</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={() => {
            const element = document.getElementById("about");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="p-3 rounded-full glass hover-lift"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <ArrowDown className="h-5 w-5 text-white" />
          <span className="sr-only">Scroll Down</span>
        </motion.button>
      </motion.div>
    </section>
  );
}
