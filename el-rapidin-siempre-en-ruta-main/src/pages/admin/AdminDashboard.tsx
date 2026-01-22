import { motion } from "framer-motion";
import { 
  Store, 
  Package, 
  Truck, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";

// Mock data - preparado para integración backend
const mockStats = {
  negocios: { total: 24, activos: 18 },
  productos: { total: 342, activos: 298 },
  domiciliarios: { total: 12, activos: 8 },
  ordenes: { hoy: 47, enProceso: 12 },
  ingresos: { hoy: 1250000, mes: 28500000 },
};

const recentOrders = [
  { id: "ORD-001", negocio: "Burger House", estado: "en_transito", total: 45000 },
  { id: "ORD-002", negocio: "Pizza Express", estado: "pendiente", total: 62000 },
  { id: "ORD-003", negocio: "Sushi Master", estado: "entregado", total: 89000 },
  { id: "ORD-004", negocio: "Taco Loco", estado: "aceptado", total: 35000 },
];

const estadoLabels: Record<string, { label: string; color: string }> = {
  pendiente: { label: "Pendiente", color: "bg-emphasis/10 text-emphasis" },
  aceptado: { label: "Aceptado", color: "bg-blue-500/10 text-blue-400" },
  en_transito: { label: "En Tránsito", color: "bg-accent/10 text-accent" },
  entregado: { label: "Entregado", color: "bg-success/10 text-success" },
};

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Vista general del sistema EL RAPIDÍN"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Negocios Activos"
          value={mockStats.negocios.activos}
          subtitle={`de ${mockStats.negocios.total} total`}
          icon={Store}
          variant="emphasis"
        />
        <StatCard
          title="Productos"
          value={mockStats.productos.activos}
          subtitle="disponibles"
          icon={Package}
          variant="default"
        />
        <StatCard
          title="Domiciliarios"
          value={mockStats.domiciliarios.activos}
          subtitle={`de ${mockStats.domiciliarios.total} en servicio`}
          icon={Truck}
          variant="accent"
        />
        <StatCard
          title="Ingresos Hoy"
          value={`$${mockStats.ingresos.hoy.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          variant="success"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emphasis/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emphasis" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Órdenes Hoy</p>
              <p className="text-2xl font-display font-bold number-display">
                {mockStats.ordenes.hoy}
              </p>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-accent to-emphasis rounded-full"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">68% del objetivo diario</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">En Proceso</p>
              <p className="text-2xl font-display font-bold number-display">
                {mockStats.ordenes.enProceso}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-muted-foreground">Órdenes activas ahora</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tasa de Éxito</p>
              <p className="text-2xl font-display font-bold number-display">
                98.5%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-success">
            <TrendingUp className="w-4 h-4" />
            <span>+2.3% vs semana anterior</span>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl bg-card border border-border overflow-hidden"
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-display font-semibold">Órdenes Recientes</h2>
          <span className="text-sm text-muted-foreground">Últimas 4 órdenes</span>
        </div>
        <div className="divide-y divide-border">
          {recentOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Package className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.negocio}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${estadoLabels[order.estado].color}`}>
                  {estadoLabels[order.estado].label}
                </span>
                <span className="font-display font-semibold number-display">
                  ${order.total.toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Alerts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-4 rounded-xl bg-emphasis/5 border border-emphasis/20 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-lg bg-emphasis/10 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-emphasis" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-emphasis">2 domiciliarios inactivos</p>
          <p className="text-sm text-muted-foreground">
            Revisa el estado de disponibilidad de los domiciliarios
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
