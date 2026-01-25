import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, BarChart3, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: TrendingUp,
    title: "Aumenta tus ventas",
    description: "Llega a más clientes sin inversión en logística propia.",
  },
  {
    icon: Users,
    title: "Repartidores propios",
    description: "Personal capacitado y comprometido con tu marca.",
  },
  {
    icon: BarChart3,
    title: "Dashboard completo",
    description: "Métricas en tiempo real de ventas, pedidos y más.",
  },
  {
    icon: Shield,
    title: "Pagos seguros",
    description: "Recibe tus pagos de forma segura y puntual.",
  },
];

const ForBusinessSection = () => {
  return (
    <section id="negocios" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-card" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">Para Negocios</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Haz crecer tu negocio
              <br />
              <span className="text-gradient-brand">con nosotros</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Únete a la red de comercios más grande de la región. Te ofrecemos tecnología de punta, logística
              profesional y un equipo comprometido con el éxito de tu negocio.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-accent/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">{benefit.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/registrar-negocio">
                <Button variant="hero" size="lg">
                  Registrar mi Negocio
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Dashboard Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
              {/* Header */}
              <div className="bg-secondary/50 border-b border-border px-6 py-4 flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/70" />
                  <div className="w-3 h-3 rounded-full bg-emphasis/70" />
                  <div className="w-3 h-3 rounded-full bg-success/70" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-sm text-muted-foreground">Dashboard - EL RAPIDÍN</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Ventas Hoy", value: "$2.4M", change: "+12%" },
                    { label: "Pedidos", value: "127", change: "+8%" },
                    { label: "Rating", value: "4.9", change: "★" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-secondary/50 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                      <div className="flex items-baseline gap-2">
                        <span className="number-display text-xl text-foreground">{stat.value}</span>
                        <span className="text-xs text-success">{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart Placeholder */}
                <div className="h-32 bg-secondary/30 rounded-lg flex items-end justify-around px-4 pb-4 gap-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      className="w-full bg-gradient-to-t from-accent to-emphasis rounded-t-sm"
                    />
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground mb-2">Pedidos Recientes</div>
                  {[
                    { id: "#4521", status: "En camino", time: "2 min" },
                    { id: "#4520", status: "Entregado", time: "15 min" },
                  ].map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between bg-secondary/30 rounded-lg px-3 py-2"
                    >
                      <span className="text-sm font-medium text-foreground">{order.id}</span>
                      <span className={`text-xs ${order.status === "Entregado" ? "text-success" : "text-emphasis"}`}>
                        {order.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{order.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-xl px-4 py-2 shadow-lg"
            >
              <span className="text-sm font-semibold">+24% ventas</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ForBusinessSection;
