import { ScrollProgress } from "@/components/scroll-progress"
import { SectionReveal } from "@/components/section-reveal"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Stack } from "@/components/stack"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { AIWorkflow } from "@/components/ai-workflow"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { FloatingCV } from "@/components/floating-cv"

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <SectionReveal><About /></SectionReveal>
      <SectionReveal><Stack /></SectionReveal>
      <SectionReveal><Projects /></SectionReveal>
      <SectionReveal><Experience /></SectionReveal>
      <SectionReveal><AIWorkflow /></SectionReveal>
      <SectionReveal><Contact /></SectionReveal>
      <Footer />
      <FloatingCV />
    </>
  )
}
