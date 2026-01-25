import { motion } from "framer-motion";
import { Star, Quote, Users, ThumbsUp, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const OpinionesPage = () => {
  const stats = [
    { icon: Users, label: "Clientes satisfechos", value: "15,000+" },
    { icon: ThumbsUp, label: "Calificación promedio", value: "4.8/5" },
    { icon: Award, label: "Negocios afiliados", value: "500+" },
  ];

  const opiniones = [
    {
      id: 1,
      nombre: "María García",
      negocio: "La Burger House",
      rating: 5,
      comentario: "Excelente servicio, la comida llegó caliente y el domiciliario fue muy amable. ¡Definitivamente volveré a pedir!",
      fecha: "Hace 2 días",
      avatar: "MG",
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      negocio: "Sushi Express",
      rating: 5,
      comentario: "Increíble la rapidez del servicio. El sushi llegó fresco y bien presentado. El mejor servicio de delivery que he usado.",
      fecha: "Hace 3 días",
      avatar: "CR",
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      negocio: "Pizza Napoli",
      rating: 4,
      comentario: "Muy buena pizza, llegó en el tiempo prometido. El único detalle fue que faltó una salsa, pero el resto perfecto.",
      fecha: "Hace 1 semana",
      avatar: "AM",
    },
    {
      id: 4,
      nombre: "Juan Pérez",
      negocio: "El Corral",
      rating: 5,
      comentario: "Siempre uso El Rapidín para mis pedidos. Confiable, rápido y los domiciliarios son muy profesionales.",
      fecha: "Hace 1 semana",
      avatar: "JP",
    },
    {
      id: 5,
      nombre: "Laura Sánchez",
      negocio: "Crepes & Waffles",
      rating: 5,
      comentario: "La experiencia fue perfecta de principio a fin. La app es muy fácil de usar y el seguimiento en tiempo real es genial.",
      fecha: "Hace 2 semanas",
      avatar: "LS",
    },
    {
      id: 6,
      nombre: "Diego López",
      negocio: "Frisby",
      rating: 4,
      comentario: "Buen servicio en general. El pollo llegó crujiente y caliente. Recomendado para cuando no quieres cocinar.",
      fecha: "Hace 2 semanas",
      avatar: "DL",
    },
    {
      id: 7,
      nombre: "Patricia Hernández",
      negocio: "Subway",
      rating: 5,
      comentario: "Me encanta que puedo personalizar mi pedido y siempre llega exactamente como lo pedí. ¡Excelente!",
      fecha: "Hace 3 semanas",
      avatar: "PH",
    },
    {
      id: 8,
      nombre: "Roberto Díaz",
      negocio: "Wok",
      rating: 5,
      comentario: "La comida asiática que pedí estaba deliciosa. El empaque mantuvo todo en perfecto estado. Súper recomendado.",
      fecha: "Hace 1 mes",
      avatar: "RD",
    },
  ];

  const StarDisplay = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-accent text-accent"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Nuestros <span className="text-accent">Clientes</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Miles de personas confían en El Rapidín para sus entregas. 
              Descubre lo que dicen sobre nosotros.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card text-center p-6">
                  <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-7 h-7 text-accent" />
                  </div>
                  <p className="text-3xl font-display font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Opinions Grid */}
        <section className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-display font-bold text-foreground mb-8 text-center"
          >
            Opiniones recientes
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opiniones.map((opinion, index) => (
              <motion.div
                key={opinion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-card h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 text-accent/30 mb-4" />
                    
                    {/* Comment */}
                    <p className="text-foreground/90 mb-4 leading-relaxed">
                      "{opinion.comentario}"
                    </p>
                    
                    {/* Rating */}
                    <div className="mb-4">
                      <StarDisplay rating={opinion.rating} />
                    </div>
                    
                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-accent">
                          {opinion.avatar}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">
                          {opinion.nombre}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {opinion.negocio} · {opinion.fecha}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              ¿Ya probaste El Rapidín?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Únete a miles de clientes satisfechos y disfruta de la mejor 
              experiencia en entregas a domicilio.
            </p>
            <a
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors"
            >
              Crear cuenta gratis
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OpinionesPage;
