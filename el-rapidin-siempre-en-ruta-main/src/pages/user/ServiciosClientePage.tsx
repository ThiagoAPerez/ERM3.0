import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, ShoppingBag, Package, Truck, ArrowRight, Clock, Shield, MapPin } from "lucide-react";

const ServiciosClientePage = () => {
  const services = [
    {
      id: "restaurantes",
      icon: Store,
      title: "Restaurantes",
      description: "Pide comida de tus restaurantes favoritos con entrega rápida",
      features: ["Variedad de opciones", "Entrega caliente", "Seguimiento en vivo"],
      color: "from-accent to-emphasis",
      bgColor: "bg-accent/10",
      href: "/negocios",
    },
    {
      id: "tiendas",
      icon: ShoppingBag,
      title: "Tiendas",
      description: "Compra en supermercados, farmacias y más sin salir de casa",
      features: ["Productos frescos", "Compras seguras", "Entrega a domicilio"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      href: "/tiendas",
    },
    {
      id: "paqueteria",
      icon: Package,
      title: "Mensajería",
      description: "Envío de paquetes de un punto a otro de forma segura",
      features: ["Recogida a domicilio", "Seguimiento en tiempo real", "Seguro incluido"],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      href: "/servicios/paqueteria",
    },
    {
      id: "motocarguero",
      icon: Truck,
      title: "Motocarguero",
      description: "Transporte de carga mediana con moto adaptada",
      features: ["Hasta 50kg de carga", "Precios competitivos", "Cobertura amplia"],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      href: "/servicios/motocarguero",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Entregas Rápidas",
      description: "Recibe tus pedidos en minutos, no horas",
    },
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Tus productos llegan en perfectas condiciones",
    },
    {
      icon: MapPin,
      title: "Cobertura Total",
      description: "Llegamos a toda la región del Oriente Antioqueño",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">
          Nuestros Servicios
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Todo lo que necesitas, a un clic de distancia. Elige el servicio que más se adapte a tus necesidades.
        </p>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
      >
        {benefits.map((benefit) => (
          <Card key={benefit.title} className="glass border-border/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Link to={service.href}>
              <Card className="glass border-border/50 hover:border-accent/50 transition-all duration-300 group overflow-hidden h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}>
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-display font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button variant="hero" className="w-full group/btn">
                    Explorar
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServiciosClientePage;
