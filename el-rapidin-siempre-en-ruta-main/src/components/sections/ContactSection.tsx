import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, MessageCircle, Mail, MapPin, ArrowUpRight } from "lucide-react";

const contactInfo = {
  instagram: "@this_is_rapidin",
  instagramUrl: "https://instagram.com/this_is_rapidin",
  whatsapp: "3107214521",
  whatsappUrl: "https://wa.me/573107214521",
  email: "elrapidinmarinilla@gmail.com",
  location: "Marinilla, Antioquia",
};

const ContactSection = () => {
  return (
    <section id="contacto" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-background to-background" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
              Contacto
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              ¿Listo para empezar?
              <br />
              <span className="text-gradient-brand">Hablemos</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Estamos aquí para ayudarte. Contáctanos por cualquiera de nuestros canales.
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Instagram */}
            <motion.a
              href={contactInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group glass rounded-2xl p-6 card-hover border border-transparent hover:border-accent/30"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                Instagram
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-muted-foreground text-sm">{contactInfo.instagram}</p>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href={contactInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group glass rounded-2xl p-6 card-hover border border-transparent hover:border-success/30"
            >
              <div className="w-12 h-12 rounded-xl bg-success flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-success-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                WhatsApp
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-muted-foreground text-sm">{contactInfo.whatsapp}</p>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${contactInfo.email}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group glass rounded-2xl p-6 card-hover border border-transparent hover:border-accent/30"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                Email
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-muted-foreground text-sm text-ellipsis overflow-hidden">
                {contactInfo.email.split('@')[0]}
                <br />
                @{contactInfo.email.split('@')[1]}
              </p>
            </motion.a>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-2xl p-6 border border-border/50"
            >
              <div className="w-12 h-12 rounded-xl bg-emphasis flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-emphasis-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                Ubicación
              </h3>
              <p className="text-muted-foreground text-sm">{contactInfo.location}</p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="glass rounded-3xl p-8 md:p-12 border border-border/50">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                ¿Tienes una pregunta específica?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Escríbenos por WhatsApp y te responderemos lo más pronto posible.
              </p>
              <Button
                variant="hero"
                size="xl"
                asChild
              >
                <a
                  href={contactInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Escribir por WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
