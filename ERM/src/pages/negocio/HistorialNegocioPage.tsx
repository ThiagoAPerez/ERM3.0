import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Eye, 
  Calendar,
  DollarSign,
  TrendingUp,
  Download
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const HistorialNegocioPage = () => {
  const navigate = useNavigate();
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("semana");

  // Mock data
  const stats = {
    totalPedidos: 156,
    ingresosTotales: 4850000,
    promedioTicket: 31090,
    crecimiento: 12.5
  };

  const pedidosHistorial = [
    {
      id: "PED-156",
      cliente: "Ana García",
      productos: 3,
      total: 45000,
      fecha: "15/01/2026",
      hora: "19:30"
    },
    {
      id: "PED-155",
      cliente: "Carlos Ruiz",
      productos: 2,
      total: 28000,
      fecha: "15/01/2026",
      hora: "18:45"
    },
    {
      id: "PED-154",
      cliente: "María López",
      productos: 5,
      total: 72000,
      fecha: "15/01/2026",
      hora: "17:20"
    },
    {
      id: "PED-153",
      cliente: "Juan Pérez",
      productos: 1,
      total: 18000,
      fecha: "14/01/2026",
      hora: "20:15"
    },
    {
      id: "PED-152",
      cliente: "Luis Martínez",
      productos: 4,
      total: 56000,
      fecha: "14/01/2026",
      hora: "19:00"
    },
    {
      id: "PED-151",
      cliente: "Patricia Sánchez",
      productos: 2,
      total: 32000,
      fecha: "14/01/2026",
      hora: "14:30"
    },
    {
      id: "PED-150",
      cliente: "Diego Hernández",
      productos: 3,
      total: 41000,
      fecha: "13/01/2026",
      hora: "21:00"
    },
    {
      id: "PED-149",
      cliente: "Laura Torres",
      productos: 2,
      total: 25000,
      fecha: "13/01/2026",
      hora: "19:45"
    },
  ];

  const statCards = [
    {
      title: "Total Pedidos",
      value: stats.totalPedidos,
      icon: Package,
      subtitle: "En el período seleccionado",
      color: "text-foreground",
      bgColor: "bg-card border-border hover:border-accent/50"
    },
    {
      title: "Ingresos Totales",
      value: `$${stats.ingresosTotales.toLocaleString()}`,
      icon: DollarSign,
      trend: `+${stats.crecimiento}% vs período anterior`,
      color: "text-accent",
      bgColor: "bg-accent/5 border-accent/30 hover:border-accent/50",
      highlight: true
    },
    {
      title: "Ticket Promedio",
      value: `$${stats.promedioTicket.toLocaleString()}`,
      icon: DollarSign,
      subtitle: "Por pedido",
      color: "text-emphasis",
      bgColor: "bg-emphasis/5 border-emphasis/30 hover:border-emphasis/50"
    },
    {
      title: "Crecimiento",
      value: `+${stats.crecimiento}%`,
      icon: TrendingUp,
      subtitle: "vs período anterior",
      color: "text-success",
      bgColor: "bg-success/5 border-success/30 hover:border-success/50"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Historial</h1>
          <p className="text-muted-foreground">Revisa el historial de pedidos completados</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={periodoSeleccionado} onValueChange={setPeriodoSeleccionado}>
            <SelectTrigger className="w-[180px] border-border bg-card">
              <Calendar className="w-4 h-4 mr-2 text-emphasis" />
              <SelectValue placeholder="Selecciona período" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="hoy">Hoy</SelectItem>
              <SelectItem value="semana">Esta semana</SelectItem>
              <SelectItem value="mes">Este mes</SelectItem>
              <SelectItem value="trimestre">Este trimestre</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats */}
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
                  stat.highlight && "text-accent",
                  stat.color === "text-success" && "text-success",
                  stat.color === "text-emphasis" && "text-emphasis"
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

      {/* Tabla de historial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-foreground">Pedidos Completados</CardTitle>
            <CardDescription>Historial de pedidos entregados exitosamente</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">ID</TableHead>
                  <TableHead className="text-muted-foreground">Cliente</TableHead>
                  <TableHead className="text-muted-foreground">Productos</TableHead>
                  <TableHead className="text-muted-foreground">Total</TableHead>
                  <TableHead className="text-muted-foreground">Fecha</TableHead>
                  <TableHead className="text-muted-foreground">Hora</TableHead>
                  <TableHead className="text-muted-foreground">Estado</TableHead>
                  <TableHead className="text-right text-muted-foreground">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedidosHistorial.map((pedido) => (
                  <TableRow key={pedido.id} className="border-border hover:bg-accent/5">
                    <TableCell className="font-medium font-display text-foreground">{pedido.id}</TableCell>
                    <TableCell className="text-foreground">{pedido.cliente}</TableCell>
                    <TableCell className="text-foreground">{pedido.productos}</TableCell>
                    <TableCell className="font-display text-foreground">${pedido.total.toLocaleString()}</TableCell>
                    <TableCell className="text-foreground">{pedido.fecha}</TableCell>
                    <TableCell className="text-emphasis">{pedido.hora}</TableCell>
                    <TableCell>
                      <Badge className="bg-success/20 text-success font-medium">Entregado</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/negocio/pedido/${pedido.id}`)}
                        className="hover:bg-accent/20 hover:text-accent"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default HistorialNegocioPage;
