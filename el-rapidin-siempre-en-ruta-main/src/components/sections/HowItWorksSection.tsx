import { motion } from "framer-motion";
import { Search, ShoppingCart, Bike, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Busca",
    description: "Explora restaurantes, tiendas o selecciona el servicio que necesitas.",
  },
  {
    icon: ShoppingCart,
    step: "02",
    title: "Pide",
    description: "Agrega productos a tu carrito y confirma tu pedido en segundos.",
  },
  {
    icon: Bike,
    step: "03",
    title: "Rastreamos",
    description: "Sigue tu pedido en tiempo real. Siempre sabrás dónde está tu repartidor.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Recibe",
    description: "Recibe tu pedido en la puerta de tu casa. Rápido y sin complicaciones.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            Cómo Funciona
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Tan simple como
            <br />
            <span className="text-gradient-brand">1, 2, 3, 4</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-[2px]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full route-line origin-left"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center group"
              >
                {/* Step Number */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-card border-2 border-border group-hover:border-accent/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/10">
                    <step.icon className="w-8 h-8 text-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-emphasis flex items-center justify-center font-display font-bold text-sm text-emphasis-foreground">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
