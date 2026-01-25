import { motion } from "framer-motion";
import { 
  Package, 
  CheckCircle2, 
  Calendar,
  DollarSign,
  TrendingUp,
  Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface PedidoHistorial {
  id: string;
  negocio: string;
  cliente: string;
  fecha: string;
  total: number;
  ganancia: number;
  calificacion?: number;
}

const mockHistorial: PedidoHistorial[] = [
  {
    id: "PED-100",
    negocio: "Burger House",
    cliente: "María García",
    fecha: "2024-01-15 18:30",
    total: 45000,
    ganancia: 8000,
    calificacion: 5,
  },
  {
    id: "PED-099",
    negocio: "Pizza Express",
    cliente: "Juan Pérez",
    fecha: "2024-01-15 15:20",
    total: 38000,
    ganancia: 6500,
    calificacion: 4,
  },
  {
    id: "PED-098",
    negocio: "Supermercado El Ahorro",
    cliente: "Ana López",
    fecha: "2024-01-15 12:10",
    total: 125000,
    ganancia: 12000,
    calificacion: 5,
  },
  {
    id: "PED-097",
    negocio: "Farmacia Salud Total",
    cliente: "Carlos Rodríguez",
    fecha: "2024-01-14 19:45",
    total: 55000,
    ganancia: 7000,
  },
  {
    id: "PED-096",
    negocio: "Tienda Don José",
    cliente: "Laura Martínez",
    fecha: "2024-01-14 16:30",
    total: 28000,
    ganancia: 5500,
    calificacion: 5,
  },
  {
    id: "PED-095",
    negocio: "Burger House",
    cliente: "Pedro Gómez",
    fecha: "2024-01-14 13:15",
    total: 52000,
    ganancia: 8500,
    calificacion: 4,
  },
];

const HistorialPedidosPage = () => {
  const [periodo, setPeriodo] = useState("semana");

  const totalGanancias = mockHistorial.reduce((acc, p) => acc + p.ganancia, 0);
  const totalPedidos = mockHistorial.length;
  const promedioCalificacion = mockHistorial
    .filter(p => p.calificacion)
    .reduce((acc, p, _, arr) => acc + (p.calificacion || 0) / arr.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Historial</h1>
          <p className="text-muted-foreground">Tus pedidos completados</p>
        </div>
        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className="w-[150px]">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hoy">Hoy</SelectItem>
            <SelectItem value="semana">Esta semana</SelectItem>
            <SelectItem value="mes">Este mes</SelectItem>
            <SelectItem value="todo">Todo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="pt-6 text-center">
              <Package className="w-8 h-8 mx-auto text-emphasis mb-2" />
              <p className="text-2xl font-display font-bold">{totalPedidos}</p>
              <p className="text-xs text-muted-foreground">Pedidos</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto text-success mb-2" />
              <p className="text-2xl font-display font-bold number-display">
                ${(totalGanancias / 1000).toFixed(0)}k
              </p>
              <p className="text-xs text-muted-foreground">Ganancias</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6 text-center">
              <Star className="w-8 h-8 mx-auto text-emphasis mb-2" />
              <p className="text-2xl font-display font-bold">
                {promedioCalificacion.toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">Calificación</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Pedidos List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            Pedidos Completados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockHistorial.map((pedido, index) => (
            <motion.div
              key={pedido.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{pedido.negocio}</p>
                    <span className="text-xs text-muted-foreground">→ {pedido.cliente}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{pedido.id}</span>
                    <span>•</span>
                    <span>{pedido.fecha}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {pedido.calificacion && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-emphasis fill-emphasis" />
                    <span className="text-sm font-medium">{pedido.calificacion}</span>
                  </div>
                )}
                <div className="text-right">
                  <p className="font-display font-bold text-success number-display">
                    +${pedido.ganancia.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Total: ${pedido.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default HistorialPedidosPage;
