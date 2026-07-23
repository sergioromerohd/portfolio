"use client"

import { useState } from "react"
import { Mail, MessageCircle, MapPin, Phone, Send } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SectionHeader } from "@/components/stack"
import { siteConfig } from "@/lib/site"

const methods = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Mensaje directo",
    href: `https://wa.me/${siteConfig.whatsapp}`,
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: siteConfig.location,
    href: "https://maps.google.com/?q=Madrid,Spain",
  },
] as const

export function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [data, setData] = useState({ name: "", email: "", subject: "", message: "" })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, [e.target.id]: e.target.value }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const text = `[Portfolio] ${data.subject}\nDe: ${data.name} <${data.email}>\n\n${data.message}`
    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`
    window.open(url, "_blank", "noopener,noreferrer")
    setTimeout(() => {
      setSubmitting(false)
      toast.success("Abriendo WhatsApp…", {
        description: "Te responderé lo antes posible.",
      })
      setData({ name: "", email: "", subject: "", message: "" })
    }, 600)
  }

  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="container">
        <SectionHeader
          tag="// 04"
          title="Contacto"
          subtitle="¿Tienes un proyecto en mente? Escríbeme. Respondo en menos de 24h."
        />

        <div className="grid lg:grid-cols-5 gap-4">
          {/* Methods */}
          <div className="lg:col-span-2 space-y-2">
            {methods.map((m) => {
              const Icon = m.icon
              return (
                <a
                  key={m.label}
                  href={m.href}
                  target={m.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="bento flex items-center gap-3 !p-4 hover:!border-primary/40"
                >
                  <div className="p-2 rounded-md bg-muted text-primary">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono text-muted-foreground">
                      {m.label}
                    </div>
                    <div className="text-sm text-foreground truncate">
                      {m.value}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>

          {/* Form */}
          <Card className="lg:col-span-3 bg-card border-border">
            <CardContent className="p-6">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-mono">nombre</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={onChange}
                      placeholder="Ada Lovelace"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-mono">email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={onChange}
                      placeholder="ada@ejemplo.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-xs font-mono">asunto</Label>
                  <Input
                    id="subject"
                    value={data.subject}
                    onChange={onChange}
                    placeholder="¿En qué puedo ayudarte?"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs font-mono">mensaje</Label>
                  <Textarea
                    id="message"
                    value={data.message}
                    onChange={onChange}
                    rows={5}
                    placeholder="Cuéntame sobre el proyecto…"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {submitting ? (
                    "Abriendo WhatsApp…"
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar por WhatsApp
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
