import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Store,
  Bike,
  Clock,
  CheckCircle2,
  Truck,
  Star,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";

const MisPedidosPage = () => {
  // Mock orders data
  const pedidos = [
    {
      id: "ORD-001",
      tipo: "negocio",
      nombreOrigen: "Restaurante El Buen Sabor",
      fecha: "2025-01-12",
      hora: "14:30",
      estado: "entregado",
      total: 45000,
      productos: 3,
      calificado: false,
    },
    {
      id: "ORD-002",
      tipo: "tienda",
      nombreOrigen: "Supermercado El Ahorro",
      fecha: "2025-01-11",
      hora: "10:15",
      estado: "en_camino",
      total: 78500,
      productos: 5,
      calificado: false,
    },
    {
      id: "ORD-003",
      tipo: "servicio",
      nombreOrigen: "Mensajería Express",
      fecha: "2025-01-10",
      hora: "09:00",
      estado: "entregado",
      total: 15000,
      productos: 1,
      calificado: true,
    },
    {
      id: "ORD-004",
      tipo: "negocio",
      nombreOrigen: "Café del Parque",
      fecha: "2025-01-09",
      hora: "16:45",
      estado: "entregado",
      total: 25000,
      productos: 2,
      calificado: true,
    },
    {
      id: "ORD-005",
      tipo: "tienda",
      nombreOrigen: "Farmacia Santa Cruz",
      fecha: "2025-01-08",
      hora: "11:30",
      estado: "pendiente",
      total: 32000,
      productos: 4,
      calificado: false,
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-CO", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const getEstadoBadge = (estado: string) => {
    const estados: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: typeof Clock }> = {
      pendiente: { label: "Pendiente", variant: "secondary", icon: Clock },
      en_camino: { label: "En camino", variant: "default", icon: Truck },
      entregado: { label: "Entregado", variant: "outline", icon: CheckCircle2 },
    };
    const config = estados[estado] || estados.pendiente;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <config.icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const getTipoIcon = (tipo: string) => {
    const icons: Record<string, typeof Store> = {
      negocio: Store,
      tienda: ShoppingBag,
      servicio: Bike,
    };
    return icons[tipo] || Package;
  };

  const pedidosActivos = pedidos.filter((p) => p.estado !== "entregado");
  const pedidosHistorial = pedidos.filter((p) => p.estado === "entregado");

  const PedidoCard = ({ pedido }: { pedido: typeof pedidos[0] }) => {
    const IconTipo = getTipoIcon(pedido.tipo);
    return (
      <Card className="glass-card hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <IconTipo className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{pedido.nombreOrigen}</p>
                <p className="text-sm text-muted-foreground">
                  {pedido.productos} producto{pedido.productos > 1 ? "s" : ""} · {pedido.id}
                </p>
              </div>
            </div>
            {getEstadoBadge(pedido.estado)}
          </div>

          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-muted-foreground">
              {formatDate(pedido.fecha)} · {pedido.hora}
            </span>
            <span className="font-bold text-accent">{formatPrice(pedido.total)}</span>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link to={`/pedidos/${pedido.id}`}>
                Ver detalle
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            {pedido.estado === "entregado" && !pedido.calificado && (
              <Button variant="hero" size="sm" className="flex-1" asChild>
                <Link to={`/orden/calificar/${pedido.id}`}>
                  <Star className="w-4 h-4 mr-1" />
                  Calificar
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Mis Pedidos
        </h1>
        <p className="text-muted-foreground">
          Revisa el estado de tus pedidos y califica los entregados
        </p>
      </motion.div>

      <Tabs defaultValue="activos" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="activos" className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Activos ({pedidosActivos.length})
          </TabsTrigger>
          <TabsTrigger value="historial" className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Historial ({pedidosHistorial.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activos">
          {pedidosActivos.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {pedidosActivos.map((pedido, index) => (
                <motion.div
                  key={pedido.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PedidoCard pedido={pedido} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tienes pedidos activos</h3>
                <p className="text-muted-foreground mb-4">
                  Explora negocios y tiendas para hacer tu primer pedido
                </p>
                <Button variant="hero" asChild>
                  <Link to="/negocios">Explorar negocios</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="historial">
          {pedidosHistorial.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {pedidosHistorial.map((pedido, index) => (
                <motion.div
                  key={pedido.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PedidoCard pedido={pedido} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <CheckCircle2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sin historial aún</h3>
                <p className="text-muted-foreground">
                  Tus pedidos completados aparecerán aquí
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MisPedidosPage;
