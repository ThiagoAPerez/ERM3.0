import { motion } from "framer-motion";
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  MapPin,
  Phone,
  Navigation
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const DomiciliarioDashboard = () => {
  // Mock data
  const stats = {
    pedidosHoy: 8,
    enCurso: 1,
    completados: 7,
    gananciasHoy: 85000,
  };

  const pedidoActivo = {
    id: "PED-001",
    negocio: "Burger House",
    cliente: "María García",
    direccionRecogida: "Cra 45 #32-12, Marinilla",
    direccionEntrega: "Calle 50 #25-30, Marinilla",
    estado: "en_camino",
    total: 45000,
    tiempoEstimado: "15 min",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido de vuelta, Carlos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pedidos Hoy</p>
                  <p className="text-3xl font-display font-bold">{stats.pedidosHoy}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">En Curso</p>
                  <p className="text-3xl font-display font-bold text-emphasis">{stats.enCurso}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emphasis/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-emphasis" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completados</p>
                  <p className="text-3xl font-display font-bold text-success">{stats.completados}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ganancias Hoy</p>
                  <p className="text-2xl font-display font-bold number-display">
                    ${stats.gananciasHoy.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Pedido Activo */}
      {stats.enCurso > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-emphasis/30 bg-emphasis/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-emphasis" />
                  Pedido Activo
                </CardTitle>
                <Badge className="bg-emphasis text-emphasis-foreground">
                  En camino
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pedido</p>
                  <p className="font-medium">{pedidoActivo.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-display font-bold text-emphasis">
                    ${pedidoActivo.total.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-card">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Recoger en</p>
                    <p className="font-medium">{pedidoActivo.negocio}</p>
                    <p className="text-sm text-muted-foreground">{pedidoActivo.direccionRecogida}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-card">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                    <Navigation className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Entregar a</p>
                    <p className="font-medium">{pedidoActivo.cliente}</p>
                    <p className="text-sm text-muted-foreground">{pedidoActivo.direccionEntrega}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" asChild>
                  <a href="tel:+573001234567">
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar Cliente
                  </a>
                </Button>
                <Button variant="hero" className="flex-1" asChild>
                  <Link to={`/domiciliario/pedido/${pedidoActivo.id}`}>
                    Ver Detalles
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="outline" className="w-full h-auto py-6 flex flex-col gap-2" asChild>
            <Link to="/domiciliario/pedidos">
              <Package className="w-8 h-8 text-emphasis" />
              <span className="font-medium">Ver Pedidos</span>
              <span className="text-xs text-muted-foreground">Disponibles y asignados</span>
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button variant="outline" className="w-full h-auto py-6 flex flex-col gap-2" asChild>
            <Link to="/domiciliario/historial">
              <CheckCircle2 className="w-8 h-8 text-success" />
              <span className="font-medium">Historial</span>
              <span className="text-xs text-muted-foreground">Pedidos completados</span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default DomiciliarioDashboard;
