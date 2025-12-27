import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Linkedin, Github, MessageSquare, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { SectionHeader } from "@/components/ui/section-header";
import { convertToWebPath } from "@/lib/yaml-parser";

const WHATSAPP_NUMBER = "5535988171660";
const WHATSAPP_DISPLAY = "+55 35 98817-1660";
const CONTACT_EMAIL = "gustavobarbosa7744@gmail.com";
const WHATSAPP_QR_CODE_PATH = "C:\\Users\\gustavo.barbosa\\Documents\\Minha Page\\images\\Verification Code between +55 35 8817-1660 and +55 35 8817-1660.png";

const socialLinks = [
  { 
    icon: Linkedin, 
    name: "LinkedIn", 
    href: "https://www.linkedin.com/in/gustavo-barbosa-868976236/",
    description: "Conecte-se profissionalmente"
  },
  { 
    icon: Github, 
    name: "GitHub", 
    href: "https://github.com/Gusta765",
    description: "Veja meus projetos open source"
  },
  { 
    icon: Mail, 
    name: "Email", 
    href: `mailto:${CONTACT_EMAIL}`,
    description: CONTACT_EMAIL
  },
  { 
    icon: MessageCircle, 
    name: "WhatsApp", 
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    description: WHATSAPP_DISPLAY
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const whatsappQrSrc = convertToWebPath(WHATSAPP_QR_CODE_PATH);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xkonnywk", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast({
          title: "Mensagem enviada!",
          description: "Obrigado pelo contato. Retornarei em breve.",
        });

        setFormData({ name: "", email: "", message: "" });
        return;
      }

      let errorDescription = "Não foi possível enviar sua mensagem. Tente novamente em instantes.";

      try {
        const data = await response.json();
        if (Array.isArray(data?.errors) && data.errors.length > 0) {
          errorDescription = data.errors
            .map((err: { message?: string }) => err?.message)
            .filter(Boolean)
            .join(" ");
        } else if (typeof data?.error === "string" && data.error.trim()) {
          errorDescription = data.error;
        }
      } catch (err) {
        void err;
      }

      toast({
        title: "Falha ao enviar mensagem",
        description: errorDescription,
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Falha ao enviar mensagem",
        description: "Erro de rede ao enviar sua mensagem. Verifique sua conexão e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-16 md:pt-20">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-accent/5 py-16 md:py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              Contato
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Vamos conversar?
            </h1>
            <p className="text-xl text-muted-foreground">
              Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de colaboração.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SectionHeader
                title="Envie uma mensagem"
                description="Preencha o formulário e retornarei o mais breve possível."
              />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Descreva seu projeto ou como posso ajudar..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar mensagem
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Social & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <SectionHeader
                  title="Outras formas de contato"
                  description="Você também pode me encontrar nas redes sociais ou enviar um email diretamente."
                />

                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <social.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {social.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{social.description}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* QR Code Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-6 rounded-xl bg-muted/50 border border-border"
              >
                <h4 className="font-semibold text-foreground mb-4">WhatsApp</h4>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-lg bg-card border border-border overflow-hidden">
                    <img
                      src={whatsappQrSrc}
                      alt="QR Code do WhatsApp"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Escaneie o QR Code para iniciar uma conversa no WhatsApp ({WHATSAPP_DISPLAY})
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                        Ou clique aqui
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
