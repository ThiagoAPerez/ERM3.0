import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  Store,
  User,
  Phone,
  Star,
} from "lucide-react";

const PedidoDetallePage = () => {
  const { id } = useParams<{ id: string }>();

  // Mock order data
  const pedido = {
    id: id || "ORD-001",
    tipo: "negocio",
    nombreOrigen: "Restaurante El Buen Sabor",
    fecha: "2025-01-12",
    hora: "14:30",
    estado: "entregado",
    total: 45000,
    subtotal: 38000,
    costoEnvio: 7000,
    calificado: false,
    direccionEntrega: "Calle 45 #23-12, Marinilla",
    nombreRecibe: "Juan Pérez",
    telefonoRecibe: "300 123 4567",
    productos: [
      { id: 1, nombre: "Bandeja Paisa", cantidad: 1, precio: 22000 },
      { id: 2, nombre: "Jugo Natural", cantidad: 2, precio: 8000 },
    ],
    domiciliario: {
      nombre: "Carlos Rodríguez",
      telefono: "300 987 6543",
    },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getEstadoBadge = (estado: string) => {
    const estados: Record<string, { label: string; class: string; icon: typeof Clock }> = {
      pendiente: { label: "Pendiente", class: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30", icon: Clock },
      en_camino: { label: "En camino", class: "bg-blue-500/20 text-blue-500 border-blue-500/30", icon: Truck },
      entregado: { label: "Entregado", class: "bg-green-500/20 text-green-500 border-green-500/30", icon: CheckCircle2 },
    };
    const config = estados[estado] || estados.pendiente;
    return (
      <Badge variant="outline" className={config.class}>
        <config.icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link to="/pedidos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" />
          Volver a pedidos
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Pedido {pedido.id}
            </h1>
            <p className="text-muted-foreground">
              {pedido.fecha} · {pedido.hora}
            </p>
          </div>
          {getEstadoBadge(pedido.estado)}
        </div>
      </motion.div>

      {/* Order Origin */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass border-border/50 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                <Store className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground text-lg">{pedido.nombreOrigen}</h2>
                <p className="text-sm text-muted-foreground">Restaurante</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass border-border/50 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="w-5 h-5 text-accent" />
              Productos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pedido.productos.map((producto) => (
              <div key={producto.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {producto.cantidad}
                  </span>
                  <span className="text-foreground">{producto.nombre}</span>
                </div>
                <span className="font-medium text-foreground">
                  {formatPrice(producto.precio * producto.cantidad)}
                </span>
              </div>
            ))}
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatPrice(pedido.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Costo de envío</span>
                <span className="text-foreground">{formatPrice(pedido.costoEnvio)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span className="text-foreground">Total</span>
                <span className="text-accent">{formatPrice(pedido.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Delivery Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass border-border/50 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5 text-accent" />
              Información de entrega
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Dirección</p>
                <p className="text-foreground">{pedido.direccionEntrega}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Recibe</p>
                <p className="text-foreground">{pedido.nombreRecibe}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="text-foreground">{pedido.telefonoRecibe}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Domiciliario */}
      {pedido.domiciliario && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-border/50 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Truck className="w-5 h-5 text-accent" />
                Domiciliario
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{pedido.domiciliario.nombre}</p>
                  <p className="text-sm text-muted-foreground">{pedido.domiciliario.telefono}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Actions */}
      {pedido.estado === "entregado" && !pedido.calificado && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="hero" className="w-full" asChild>
            <Link to={`/orden/calificar/${pedido.id}`}>
              <Star className="w-4 h-4 mr-2" />
              Calificar pedido
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default PedidoDetallePage;
