import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

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

/* ===================== TYPES ===================== */

interface MeResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: "CLIENT";
  status: "ACTIVE" | "SUSPENDED";
}

interface ClientProfileResponse {
  name: string;
  phone: string;
  profilePhotoUrl?: string | null;
}

export interface ClientMeResponse {
  user: MeResponse;
  clientProfile: ClientProfileResponse;
}

type OrderStatus = "DELIVERED" | "ON_THE_WAY" | "PREPARING";

interface ClientOrder {
  id: number;
  status: OrderStatus;
}

/* ===================== COMPONENT ===================== */

const UserDashboard = () => {
  const [me, setMe] = useState<ClientMeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  /* ===================== LOAD CLIENT ME ===================== */

  useEffect(() => {
    const loadMe = async () => {
      try {
        const res = await api.get<ClientMeResponse>("/client/me");
        setMe(res.data);
      } catch (err) {
        console.error("CLIENT /me ERROR:", err);
        setMe(null);
      } finally {
        setLoading(false);
      }
    };

    loadMe();
  }, []);

  /* ===================== EARLY STATES ===================== */

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Cargando dashboard…</p>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-destructive">
          No se pudo cargar la información del cliente
        </p>
      </div>
    );
  }

  /* ===================== DATA ===================== */

  const user = me.user;

  const displayName = me.clientProfile?.name?.trim() || user.name.trim();

  const recentOrders: ClientOrder[] = [];

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

  /* ===================== STATUS BADGE MAP ===================== */

  const getStatusBadge = (status: OrderStatus) => {
    const styles: Record<
      OrderStatus,
      { class: string; label: string; icon: typeof CheckCircle2 }
    > = {
      DELIVERED: {
        class: "bg-success/20 text-success border-success/30",
        label: "Entregada",
        icon: CheckCircle2,
      },
      ON_THE_WAY: {
        class: "bg-accent/20 text-accent border-accent/30",
        label: "En camino",
        icon: Truck,
      },
      PREPARING: {
        class: "bg-emphasis/20 text-emphasis border-emphasis/30",
        label: "Preparando",
        icon: Package,
      },
    };

    const s = styles[status];

    return (
      <Badge variant="outline" className={s.class}>
        <s.icon className="w-3 h-3 mr-1" />
        {s.label}
      </Badge>
    );
  };

  /* ===================== RENDER ===================== */

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          ¡Hola, {displayName}!
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

      {/* Stats Overview (placeholder visual) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Órdenes este mes</p>
              <p className="text-3xl font-display font-bold">0</p>
            </div>
            <ShoppingBag className="w-7 h-7 text-accent" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Direcciones</p>
              <p className="text-3xl font-display font-bold">0</p>
            </div>
            <MapPin className="w-7 h-7 text-success" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Puntos</p>
              <p className="text-3xl font-display font-bold text-emphasis">0</p>
            </div>
            <Store className="w-7 h-7 text-emphasis" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Órdenes recientes
            </CardTitle>
            <Button variant="ghost" asChild>
              <Link to="/pedidos">
                Ver todas
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-muted-foreground">
                Aún no tienes órdenes recientes.
              </p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id}>{getStatusBadge(order.status)}</div>
              ))
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
