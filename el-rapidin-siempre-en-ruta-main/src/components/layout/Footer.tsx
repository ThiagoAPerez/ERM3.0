import { motion } from "framer-motion";
import { Instagram, MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    servicios: [
      { label: "Restaurantes", href: "/negocios" },
      { label: "Tiendas", href: "/tiendas" },
      { label: "Mensajería", href: "/servicios/paqueteria" },
      { label: "Motocarguero", href: "/servicios/motocarguero" },
    ],
    empresa: [
      { label: "Sobre Nosotros", href: "/" },
      { label: "Únete a nuestro equipo", href: "/#empleo" },
      { label: "Registra tu Negocio", href: "/registrar-negocio" },
      { label: "Contacto", href: "/#contacto" },
    ],
    legal: [
      { label: "Términos y Condiciones", href: "/terminos-condiciones" },
      { label: "Política de Privacidad", href: "/politicas-privacidad" },
      { label: "Cookies", href: "/cookies" },
      { label: "Nuestros Clientes", href: "/opiniones" },
    ],
    social: [
      { icon: Instagram, href: "https://instagram.com/this_is_rapidin", label: "Instagram" },
      { icon: MessageCircle, href: "https://wa.me/573107214521", label: "WhatsApp" },
      { icon: Mail, href: "mailto:elrapidinmarinilla@gmail.com", label: "Email" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <motion.a
              href="/"
              className="inline-flex items-center gap-3 group mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-emphasis flex items-center justify-center font-display font-bold text-emphasis-foreground text-lg">
                  R
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-foreground tracking-tight">
                  EL RAPIDÍN
                </span>
                <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
                  Siempre en Ruta
                </span>
              </div>
            </motion.a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Delivery y logística profesional para Marinilla y la región del Oriente Antioqueño.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {links.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent/20 flex items-center justify-center text-muted-foreground hover:text-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Servicios</h4>
            <ul className="space-y-3">
              {links.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {links.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} EL RAPIDÍN. Todos los derechos reservados.
          </p>
          <p className="text-muted-foreground text-sm">
            Hecho con ❤️ en Marinilla, Antioquia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
