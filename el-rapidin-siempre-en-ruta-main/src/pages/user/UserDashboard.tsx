import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  MapPin,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  ArrowRight,
  Store,
  Bike,
  Utensils,
} from "lucide-react";
import { useSession } from "@/hooks/useSession";

const UserDashboard = () => {
  // Mock data
  const { user, loading } = useSession();

  if (loading) return null;
  if (!user) return null;

  const recentOrders = [
    {
      id: "ORD-001",
      business: "Restaurante La Esquina",
      status: "delivered",
      date: "Hoy, 2:30 PM",
      total: "$45,000",
    },
    {
      id: "ORD-002",
      business: "Mensajería Express",
      status: "in_transit",
      date: "Hoy, 11:00 AM",
      total: "$15,000",
    },
    {
      id: "ORD-003",
      business: "Tienda El Ahorro",
      status: "preparing",
      date: "Ayer, 6:45 PM",
      total: "$32,500",
    },
  ];

  const quickActions = [
    {
      icon: Utensils,
      label: "Restaurantes",
      href: "/negocios",
      color: "bg-accent/20 text-accent",
    },
    {
      icon: Store,
      label: "Tiendas",
      href: "/tiendas",
      color: "bg-emphasis/20 text-emphasis",
    },
    {
      icon: Bike,
      label: "Servicios",
      href: "/servicios",
      color: "bg-success/20 text-success",
    },
    {
      icon: MapPin,
      label: "Direcciones",
      href: "/perfil/direcciones",
      color: "bg-muted text-muted-foreground",
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<
      string,
      { class: string; label: string; icon: typeof CheckCircle2 }
    > = {
      delivered: {
        class: "bg-success/20 text-success border-success/30",
        label: "Entregado",
        icon: CheckCircle2,
      },
      in_transit: {
        class: "bg-accent/20 text-accent border-accent/30",
        label: "En camino",
        icon: Truck,
      },
      preparing: {
        class: "bg-emphasis/20 text-emphasis border-emphasis/30",
        label: "Preparando",
        icon: Package,
      },
    };
    const s = styles[status] || styles.preparing;
    return (
      <Badge variant="outline" className={s.class}>
        <s.icon className="w-3 h-3 mr-1" />
        {s.label}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          ¡Hola, {user.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          Bienvenido de vuelta. ¿Qué te gustaría pedir hoy?
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {quickActions.map((action, index) => (
          <Link key={action.label} to={action.href}>
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-border hover:border-accent/50 transition-all cursor-pointer h-full">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div
                    className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center`}
                  >
                    <action.icon className="w-7 h-7" />
                  </div>
                  <span className="font-medium">{action.label}</span>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Órdenes este mes
                </p>
                <p className="text-3xl font-display font-bold text-foreground">
                  12
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Direcciones guardadas
                </p>
                <p className="text-3xl font-display font-bold text-foreground">
                  3
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-success/20 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Puntos acumulados
                </p>
                <p className="text-3xl font-display font-bold text-emphasis">
                  450
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-emphasis/20 flex items-center justify-center">
                <Store className="w-7 h-7 text-emphasis" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-display">
              <Clock className="w-5 h-5 text-accent" />
              Órdenes Recientes
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-accent hover:text-accent hover:bg-accent/10"
              asChild
            >
              <Link to="/pedidos">
                Ver todas
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Link to={`/pedidos/${order.id}`}>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                          <Package className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {order.business}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(order.status)}
                        <span className="font-display font-semibold text-foreground">
                          {order.total}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
