import { motion } from "framer-motion";
import { UtensilsCrossed, ShoppingBag, Package, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: UtensilsCrossed,
    title: "Restaurantes",
    description: "Delivery de tus restaurantes favoritos. Comida caliente, a tiempo, siempre.",
    color: "accent",
    features: ["Menús completos", "Tracking en vivo", "Múltiples restaurantes"],
  },
  {
    icon: ShoppingBag,
    title: "Tiendas",
    description: "Supermercados, ropa, electrónicos y más. Lo que necesites, te lo llevamos.",
    color: "emphasis",
    features: ["Supermercados", "Tiendas locales", "Compras personalizadas"],
  },
  {
    icon: Package,
    title: "Mensajería",
    description: "Envíos locales rápidos y seguros. Documentos, paquetes y más.",
    color: "accent",
    features: ["Documentos", "Paquetes pequeños", "Envíos express"],
  },
  {
    icon: Truck,
    title: "Motocarguero",
    description: "Transporte de carga ligera para negocios y particulares.",
    color: "emphasis",
    features: ["Carga ligera", "Mudanzas pequeñas", "Servicio comercial"],
  },
];

const ServicesSection = () => {
  return (
    <section id="servicios" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            Nuestros Servicios
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Todo lo que necesitas,
            <br />
            <span className="text-gradient-brand">en una sola plataforma</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Desde comida hasta paquetería, cubrimos todas tus necesidades de delivery y logística.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full glass rounded-2xl p-6 card-hover border border-transparent hover:border-accent/30 transition-all duration-300">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-${service.color}/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className={`w-7 h-7 text-${service.color}`} />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link to="/servicios">
            <Button variant="hero" size="lg">
              Explorar Todos los Servicios
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
