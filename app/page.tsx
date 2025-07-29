import type { Metadata } from "next"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import LoadingScreen from "@/components/loading-screen"

export const metadata: Metadata = {
  title: "Sergio Romero",
  description:
    "Portfolio de Sergio Romero, Desarrollador Full Stack.",
  openGraph: {
    title: "Sergio Romero",
    description:
      "Portfolio de Sergio Romero, Desarrollador Full Stack.",
    url: "https://cv.sergioromerohd.com",
    siteName: "Sergio Romero",
    images: [
      {
        url: "https://i.ibb.co/B3xwB9H/unnamed-removebg-preview.png",
        width: 1200,
        height: 630,
      },
    ],

},

}
export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
