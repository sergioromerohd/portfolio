"use client"

import { useState } from "react"
import { Mail, MessageCircle, MapPin, Phone, Send, Copy, Check } from "lucide-react"
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
    href: undefined,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Mensaje directo",
    href: `https://wa.me/${siteConfig.whatsapp}`,
  },
  {
    icon: Phone,
    label: "Telefono",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: MapPin,
    label: "Ubicacion",
    value: siteConfig.location,
    href: "https://maps.google.com/?q=Madrid,Spain",
  },
] as const

export function Contact() {
  const [sending, setSending] = useState(false)
  const [copied, setCopied] = useState(false)
  const [data, setData] = useState({ name: "", email: "", subject: "", message: "" })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, [e.target.id]: e.target.value }))
  }

  const sendWhatsApp = () => {
    const text = `[Portfolio] ${data.subject}\nDe: ${data.name} <${data.email}>\n\n${data.message}`
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer")
    toast.success("Abriendo WhatsApp...")
  }

  const sendEmail = async () => {
    setSending(true)
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_KEY",
          from_name: data.name,
          replyto: data.email,
          subject: `[Portfolio] ${data.subject}`,
          message: `${data.message}\n\n--\nDe: ${data.name} <${data.email}>`,
        }),
      })
      if (res.ok) {
        toast.success("Mensaje enviado. Te respondere pronto.")
        setData({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error()
      }
    } catch {
      // fallback to mailto
      const body = `${data.message}\n\n--\n${data.name} <${data.email}>`
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`[Portfolio] ${data.subject}`)}&body=${encodeURIComponent(body)}`
      toast.success("Abriendo tu cliente de correo...")
    }
    setSending(false)
  }

  const handleMethodClick = (m: (typeof methods)[number]) => {
    if (!m.href) {
      navigator.clipboard.writeText(m.value)
      setCopied(true)
      toast.success("Email copiado al portapapeles")
      setTimeout(() => setCopied(false), 2000)
    } else if (m.href.startsWith("http")) {
      window.open(m.href, "_blank", "noopener,noreferrer")
    } else {
      window.location.href = m.href
    }
  }

  return (
    <section id="contact" className="py-24 border-t border-border bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
      <div className="container">
        <SectionHeader
          tag="// 04"
          title="Contacto"
          subtitle="¿Tienes un proyecto en mente? Escribeme. Respondo en menos de 24h."
        />

        <div className="grid lg:grid-cols-5 gap-4">
          {/* Methods */}
          <div className="lg:col-span-2 space-y-2">
            {methods.map((m) => {
              const Icon = m.icon
              return (
                <button
                  key={m.label}
                  onClick={() => handleMethodClick(m)}
                  className="bento flex items-center gap-3 !p-4 hover:!border-primary/40 w-full text-left cursor-pointer hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="p-2 rounded-md bg-muted text-primary">
                    {copied && !m.href ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono text-muted-foreground">{m.label}</div>
                    <div className="text-sm text-foreground truncate">{m.value}</div>
                  </div>
                  {!m.href && !copied && (
                    <Copy className="w-3.5 h-3.5 text-muted-foreground opacity-50" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Form */}
          <Card className="lg:col-span-3 bg-card/80 backdrop-blur-sm border-border">
            <CardContent className="p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-mono">nombre</Label>
                    <Input id="name" value={data.name} onChange={onChange} placeholder="Ada Lovelace" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-mono">email</Label>
                    <Input id="email" type="email" value={data.email} onChange={onChange} placeholder="ada@ejemplo.com" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-xs font-mono">asunto</Label>
                  <Input id="subject" value={data.subject} onChange={onChange} placeholder="¿En que puedo ayudarte?" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs font-mono">mensaje</Label>
                  <Textarea id="message" value={data.message} onChange={onChange} rows={5} placeholder="Cuentame sobre el proyecto..." required />
                </div>

                {/* Two buttons: WhatsApp (primary) + Email (secondary) */}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={sendWhatsApp}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_-4px] hover:shadow-primary/50"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    type="button"
                    onClick={sendEmail}
                    disabled={sending}
                    variant="outline"
                    className="flex-1 border-border hover:border-primary/40 transition-all"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {sending ? "Enviando..." : "Email"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
