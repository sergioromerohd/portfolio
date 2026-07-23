import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Stack } from "@/components/stack"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { AIWorkflow } from "@/components/ai-workflow"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Experience />
      <AIWorkflow />
      <Contact />
      <Footer />
    </>
  )
}
