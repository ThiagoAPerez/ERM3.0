import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Bike, 
  Truck, 
  Settings,
  TrendingUp,
  Package,
  Clock,
  DollarSign,
  ChevronRight
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  icon: React.ElementType;
  color: string;
  activo: boolean;
  stats: {
    pedidosHoy: number;
    ingresos: number;
    tiempoPromedio: string;
  };
}

// Mock data - preparado para integración backend
const mockServicios: Servicio[] = [
  {
    id: "mensajeria",
    nombre: "Mensajería Express",
    descripcion: "Envío de documentos y paquetes pequeños con entrega rápida",
    icon: Bike,
    color: "emphasis",
    activo: true,
    stats: {
      pedidosHoy: 23,
      ingresos: 345000,
      tiempoPromedio: "25 min",
    },
  },
  {
    id: "motocarguero",
    nombre: "Motocarguero",
    descripcion: "Transporte de carga mediana en motocicleta adaptada",
    icon: Truck,
    color: "accent",
    activo: true,
    stats: {
      pedidosHoy: 8,
      ingresos: 520000,
      tiempoPromedio: "45 min",
    },
  },
];

const colorClasses = {
  emphasis: {
    bg: "bg-emphasis/10",
    border: "border-emphasis/30",
    text: "text-emphasis",
    icon: "text-emphasis",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent/30",
    text: "text-accent",
    icon: "text-accent",
  },
};

const ServiciosPage = () => {
  const [servicios, setServicios] = useState<Servicio[]>(mockServicios);

  const handleToggleServicio = (id: string) => {
    setServicios(servicios.map(s =>
      s.id === id ? { ...s, activo: !s.activo } : s
    ));
  };

  const totalPedidosHoy = servicios.reduce((acc, s) => acc + s.stats.pedidosHoy, 0);
  const totalIngresos = servicios.reduce((acc, s) => acc + s.stats.ingresos, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Servicios Propios"
        description="Gestiona los servicios de mensajería y motocarguero"
        icon={Briefcase}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emphasis/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-emphasis" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pedidos Hoy</p>
              <p className="text-2xl font-display font-bold number-display">
                {totalPedidosHoy}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ingresos Hoy</p>
              <p className="text-2xl font-display font-bold number-display">
                ${totalIngresos.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Servicios Activos</p>
              <p className="text-2xl font-display font-bold number-display">
                {servicios.filter(s => s.activo).length} / {servicios.length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Servicios Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {servicios.map((servicio, index) => {
          const ServiceIcon = servicio.icon;
          const colors = colorClasses[servicio.color as keyof typeof colorClasses];

          return (
            <motion.div
              key={servicio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "rounded-xl border-2 overflow-hidden transition-all",
                servicio.activo ? colors.border : "border-border opacity-60"
              )}
            >
              {/* Header */}
              <div className={cn(
                "p-6 transition-colors",
                servicio.activo ? colors.bg : "bg-muted/30"
              )}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center",
                      servicio.activo ? "bg-card" : "bg-muted"
                    )}>
                      <ServiceIcon className={cn(
                        "w-7 h-7",
                        servicio.activo ? colors.icon : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl">{servicio.nombre}</h3>
                      <p className="text-sm text-muted-foreground">{servicio.descripcion}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {servicio.activo ? "Activo" : "Inactivo"}
                    </span>
                    <Switch
                      checked={servicio.activo}
                      onCheckedChange={() => handleToggleServicio(servicio.id)}
                    />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 bg-card">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
                      <Package className="w-4 h-4" />
                      <span className="text-xs">Pedidos</span>
                    </div>
                    <p className="font-display font-bold text-xl number-display">
                      {servicio.stats.pedidosHoy}
                    </p>
                  </div>
                  <div className="text-center border-x border-border">
                    <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs">Ingresos</span>
                    </div>
                    <p className="font-display font-bold text-xl number-display">
                      ${(servicio.stats.ingresos / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">Tiempo</span>
                    </div>
                    <p className="font-display font-bold text-xl number-display">
                      {servicio.stats.tiempoPromedio}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 group">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                  <Button 
                    variant="hero" 
                    className="flex-1"
                    disabled={!servicio.activo}
                  >
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-xl bg-muted/30 border border-border"
      >
        <h4 className="font-display font-semibold mb-2">Sobre los Servicios Propios</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Los servicios de mensajería y motocarguero son operados directamente por EL RAPIDÍN. 
          Estos servicios tienen gestión separada de los restaurantes y tiendas, 
          pero comparten el mismo sistema de domiciliarios. La configuración de tarifas 
          y zonas se realizará desde el backend una vez esté integrado.
        </p>
      </motion.div>
    </div>
  );
};

export default ServiciosPage;
