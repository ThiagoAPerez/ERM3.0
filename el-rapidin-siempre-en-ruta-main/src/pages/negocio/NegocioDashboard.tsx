import { motion } from "framer-motion";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  DollarSign,
  TrendingUp,
  Eye,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const NegocioDashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const stats = {
    pedidosHoy: 12,
    enProceso: 4,
    entregados: 8,
    ingresosHoy: 285000
  };

  const pedidosRecientes = [
    {
      id: "PED-001",
      cliente: "Juan Pérez",
      productos: 3,
      total: 45000,
      estado: "en_proceso",
      hora: "14:30"
    },
    {
      id: "PED-002",
      cliente: "María López",
      productos: 2,
      total: 32000,
      estado: "pendiente",
      hora: "14:25"
    },
    {
      id: "PED-003",
      cliente: "Carlos Ruiz",
      productos: 5,
      total: 78000,
      estado: "en_camino",
      hora: "14:15"
    },
  ];

  const getEstadoBadge = (estado: string) => {
    const config: Record<string, { label: string; className: string }> = {
      pendiente: { label: "Pendiente", className: "bg-muted text-muted-foreground" },
      en_proceso: { label: "En proceso", className: "bg-emphasis/20 text-emphasis" },
      en_camino: { label: "En camino", className: "bg-accent/20 text-accent" },
      entregado: { label: "Entregado", className: "bg-success/20 text-success" },
    };
    const { label, className } = config[estado] || { label: estado, className: "" };
    return <Badge className={cn("font-medium", className)}>{label}</Badge>;
  };

  const statCards = [
    {
      title: "Pedidos Hoy",
      value: stats.pedidosHoy,
      icon: Package,
      trend: "+15% vs ayer",
      color: "text-foreground",
      bgColor: "bg-card border-border hover:border-accent/50"
    },
    {
      title: "En Proceso",
      value: stats.enProceso,
      icon: Clock,
      subtitle: "Pedidos preparándose",
      color: "text-emphasis",
      bgColor: "bg-emphasis/5 border-emphasis/30 hover:border-emphasis/50"
    },
    {
      title: "Entregados",
      value: stats.entregados,
      icon: CheckCircle,
      subtitle: "Completados hoy",
      color: "text-success",
      bgColor: "bg-success/5 border-success/30 hover:border-success/50"
    },
    {
      title: "Ingresos Hoy",
      value: `$${stats.ingresosHoy.toLocaleString()}`,
      icon: DollarSign,
      trend: "+8% vs ayer",
      color: "text-accent",
      bgColor: "bg-accent/5 border-accent/30 hover:border-accent/50",
      highlight: true
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Resumen de tu negocio hoy</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={cn("border transition-colors", stat.bgColor)}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{stat.title}</CardTitle>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className={cn(
                  "text-2xl font-display font-bold",
                  stat.highlight ? "text-accent" : "text-foreground"
                )}>
                  {stat.value}
                </div>
                {stat.trend && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-success" />
                    {stat.trend}
                  </p>
                )}
                {stat.subtitle && (
                  <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pedidos Recientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display text-foreground">Pedidos Recientes</CardTitle>
              <CardDescription>Últimos pedidos recibidos</CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/negocio/pedidos")}
              className="border-border hover:bg-accent hover:text-accent-foreground hover:border-accent"
            >
              Ver todos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pedidosRecientes.map((pedido) => (
                <div
                  key={pedido.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-accent/5 hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Package className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium font-display text-foreground">{pedido.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {pedido.cliente} · {pedido.productos} productos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium font-display text-foreground">${pedido.total.toLocaleString()}</p>
                      <p className="text-xs text-emphasis">{pedido.hora}</p>
                    </div>
                    {getEstadoBadge(pedido.estado)}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => navigate(`/negocio/pedido/${pedido.id}`)}
                      className="hover:bg-accent/20 hover:text-accent"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Acciones Rápidas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-foreground">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 flex-wrap">
            <Button 
              onClick={() => navigate("/negocio/pedidos")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Package className="w-4 h-4 mr-2" />
              Ver Pedidos Activos
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/negocio/historial")}
              className="border-emphasis text-emphasis hover:bg-emphasis hover:text-emphasis-foreground"
            >
              <Clock className="w-4 h-4 mr-2" />
              Ver Historial
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NegocioDashboard;
