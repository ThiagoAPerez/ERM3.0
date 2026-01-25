import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Eye, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface Pedido {
  id: string;
  cliente: string;
  direccion: string;
  productos: number;
  total: number;
  estado: string;
  hora: string;
  domiciliario?: string;
}

const PedidosNegocioPage = () => {
  const navigate = useNavigate();

  // Mock data
  const [pedidos] = useState<Pedido[]>([
    {
      id: "PED-001",
      cliente: "Juan Pérez",
      direccion: "Cra 45 #32-10, Marinilla",
      productos: 3,
      total: 45000,
      estado: "pendiente",
      hora: "14:30"
    },
    {
      id: "PED-002",
      cliente: "María López",
      direccion: "Cll 20 #15-45, Marinilla",
      productos: 2,
      total: 32000,
      estado: "en_proceso",
      hora: "14:25"
    },
    {
      id: "PED-003",
      cliente: "Carlos Ruiz",
      direccion: "Cra 30 #18-22, Marinilla",
      productos: 5,
      total: 78000,
      estado: "en_camino",
      hora: "14:15",
      domiciliario: "Pedro Gómez"
    },
    {
      id: "PED-004",
      cliente: "Ana García",
      direccion: "Cll 10 #8-15, Marinilla",
      productos: 1,
      total: 18000,
      estado: "en_proceso",
      hora: "14:10"
    },
    {
      id: "PED-005",
      cliente: "Luis Martínez",
      direccion: "Cra 25 #12-30, Marinilla",
      productos: 4,
      total: 62000,
      estado: "en_camino",
      hora: "13:55",
      domiciliario: "María Rodríguez"
    },
  ]);

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

  const pedidosPendientes = pedidos.filter(p => p.estado === "pendiente");
  const pedidosEnProceso = pedidos.filter(p => p.estado === "en_proceso");
  const pedidosEnCamino = pedidos.filter(p => p.estado === "en_camino");

  const renderPedidosTable = (pedidosList: Pedido[]) => (
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className="text-muted-foreground">ID</TableHead>
          <TableHead className="text-muted-foreground">Cliente</TableHead>
          <TableHead className="text-muted-foreground">Dirección</TableHead>
          <TableHead className="text-muted-foreground">Productos</TableHead>
          <TableHead className="text-muted-foreground">Total</TableHead>
          <TableHead className="text-muted-foreground">Hora</TableHead>
          <TableHead className="text-muted-foreground">Estado</TableHead>
          <TableHead className="text-muted-foreground">Domiciliario</TableHead>
          <TableHead className="text-right text-muted-foreground">Acción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pedidosList.length === 0 ? (
          <TableRow className="border-border">
            <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
              No hay pedidos en esta categoría
            </TableCell>
          </TableRow>
        ) : (
          pedidosList.map((pedido) => (
            <TableRow key={pedido.id} className="border-border hover:bg-accent/5">
              <TableCell className="font-medium font-display text-foreground">{pedido.id}</TableCell>
              <TableCell className="text-foreground">{pedido.cliente}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3 text-accent" />
                  <span className="max-w-[200px] truncate">{pedido.direccion}</span>
                </div>
              </TableCell>
              <TableCell className="text-foreground">{pedido.productos}</TableCell>
              <TableCell className="font-display text-foreground">${pedido.total.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-emphasis">
                  <Clock className="w-3 h-3" />
                  {pedido.hora}
                </div>
              </TableCell>
              <TableCell>{getEstadoBadge(pedido.estado)}</TableCell>
              <TableCell className="text-foreground">{pedido.domiciliario || "-"}</TableCell>
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
          ))
        )}
      </TableBody>
    </Table>
  );

  const statsCards = [
    {
      title: "Pendientes",
      value: pedidosPendientes.length,
      icon: Package,
      bgColor: "bg-muted/50 border-border",
      iconBg: "bg-muted",
      iconColor: "text-muted-foreground"
    },
    {
      title: "En Proceso",
      value: pedidosEnProceso.length,
      icon: Clock,
      bgColor: "bg-emphasis/5 border-emphasis/30",
      iconBg: "bg-emphasis/20",
      iconColor: "text-emphasis"
    },
    {
      title: "En Camino",
      value: pedidosEnCamino.length,
      icon: Package,
      bgColor: "bg-accent/5 border-accent/30",
      iconBg: "bg-accent/20",
      iconColor: "text-accent"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Pedidos</h1>
        <p className="text-muted-foreground">Gestiona los pedidos de tu negocio</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={cn("border transition-colors hover:border-accent/50", stat.bgColor)}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", stat.iconBg)}>
                    <stat.icon className={cn("w-5 h-5", stat.iconColor)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabla de pedidos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-foreground">Listado de Pedidos</CardTitle>
            <CardDescription>Vista de pedidos activos por estado</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="todos" className="w-full">
              <TabsList className="mb-4 bg-muted/50">
                <TabsTrigger value="todos" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  Todos ({pedidos.length})
                </TabsTrigger>
                <TabsTrigger value="pendientes" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  Pendientes ({pedidosPendientes.length})
                </TabsTrigger>
                <TabsTrigger value="en_proceso" className="data-[state=active]:bg-emphasis data-[state=active]:text-emphasis-foreground">
                  En Proceso ({pedidosEnProceso.length})
                </TabsTrigger>
                <TabsTrigger value="en_camino" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  En Camino ({pedidosEnCamino.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="todos">
                {renderPedidosTable(pedidos)}
              </TabsContent>
              <TabsContent value="pendientes">
                {renderPedidosTable(pedidosPendientes)}
              </TabsContent>
              <TabsContent value="en_proceso">
                {renderPedidosTable(pedidosEnProceso)}
              </TabsContent>
              <TabsContent value="en_camino">
                {renderPedidosTable(pedidosEnCamino)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PedidosNegocioPage;
