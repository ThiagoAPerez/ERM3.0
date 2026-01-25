import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  MapPin, 
  Clock,
  DollarSign,
  Check,
  Navigation
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

interface Pedido {
  id: string;
  negocio: string;
  tipoNegocio: string;
  cliente: string;
  direccionRecogida: string;
  direccionEntrega: string;
  distancia: string;
  tiempoEstimado: string;
  total: number;
  ganancia: number;
  estado: "disponible" | "asignado" | "en_camino" | "entregado";
}

const mockPedidos: Pedido[] = [
  {
    id: "PED-001",
    negocio: "Burger House",
    tipoNegocio: "Restaurante",
    cliente: "María García",
    direccionRecogida: "Cra 45 #32-12, Marinilla",
    direccionEntrega: "Calle 50 #25-30, Marinilla",
    distancia: "2.5 km",
    tiempoEstimado: "15 min",
    total: 45000,
    ganancia: 8000,
    estado: "asignado",
  },
  {
    id: "PED-002",
    negocio: "Pizza Express",
    tipoNegocio: "Restaurante",
    cliente: "Juan Pérez",
    direccionRecogida: "Calle 30 #40-15, Marinilla",
    direccionEntrega: "Cra 42 #28-10, Marinilla",
    distancia: "1.8 km",
    tiempoEstimado: "10 min",
    total: 38000,
    ganancia: 6500,
    estado: "disponible",
  },
  {
    id: "PED-003",
    negocio: "Supermercado El Ahorro",
    tipoNegocio: "Tienda",
    cliente: "Ana López",
    direccionRecogida: "Cra 50 #45-12, Marinilla",
    direccionEntrega: "Calle 55 #30-20, Marinilla",
    distancia: "3.2 km",
    tiempoEstimado: "20 min",
    total: 125000,
    ganancia: 12000,
    estado: "disponible",
  },
  {
    id: "PED-004",
    negocio: "Farmacia Salud Total",
    tipoNegocio: "Farmacia",
    cliente: "Carlos Rodríguez",
    direccionRecogida: "Calle 30 #20-15, La Ceja",
    direccionEntrega: "Cra 25 #35-40, La Ceja",
    distancia: "1.5 km",
    tiempoEstimado: "8 min",
    total: 55000,
    ganancia: 7000,
    estado: "disponible",
  },
];

const PedidosDisponiblesPage = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidos);

  const pedidosDisponibles = pedidos.filter(p => p.estado === "disponible");
  const pedidosAsignados = pedidos.filter(p => p.estado === "asignado");

  const handleAceptarPedido = (pedidoId: string) => {
    setPedidos(pedidos.map(p =>
      p.id === pedidoId ? { ...p, estado: "asignado" as const } : p
    ));
  };

  const PedidoCard = ({ pedido, showAcceptButton = false }: { pedido: Pedido; showAcceptButton?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="hover:border-emphasis/30 transition-colors">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold">{pedido.negocio}</h3>
                <Badge variant="outline" className="text-xs">
                  {pedido.tipoNegocio}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Pedido: {pedido.id}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-display font-bold text-success">
                +${pedido.ganancia.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Tu ganancia</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">Recoger:</span>
              <span className="truncate">{pedido.direccionRecogida}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Navigation className="w-4 h-4 text-success" />
              <span className="text-muted-foreground">Entregar:</span>
              <span className="truncate">{pedido.direccionEntrega}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Navigation className="w-4 h-4" />
                {pedido.distancia}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {pedido.tiempoEstimado}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                ${pedido.total.toLocaleString()}
              </span>
            </div>

            {showAcceptButton ? (
              <Button variant="hero" size="sm" onClick={() => handleAceptarPedido(pedido.id)}>
                <Check className="w-4 h-4 mr-1" />
                Aceptar
              </Button>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to={`/domiciliario/pedido/${pedido.id}`}>
                  Ver Detalles
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold">Pedidos</h1>
        <p className="text-muted-foreground">Pedidos disponibles y asignados</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="disponibles">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="disponibles" className="relative">
            Disponibles
            {pedidosDisponibles.length > 0 && (
              <Badge className="ml-2 bg-accent text-accent-foreground">
                {pedidosDisponibles.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="asignados">
            Mis Pedidos
            {pedidosAsignados.length > 0 && (
              <Badge className="ml-2 bg-emphasis text-emphasis-foreground">
                {pedidosAsignados.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="disponibles" className="space-y-4 mt-6">
          {pedidosDisponibles.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No hay pedidos disponibles</p>
              <p className="text-sm text-muted-foreground">Los nuevos pedidos aparecerán aquí</p>
            </div>
          ) : (
            pedidosDisponibles.map((pedido) => (
              <PedidoCard key={pedido.id} pedido={pedido} showAcceptButton />
            ))
          )}
        </TabsContent>

        <TabsContent value="asignados" className="space-y-4 mt-6">
          {pedidosAsignados.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No tienes pedidos asignados</p>
              <p className="text-sm text-muted-foreground">Acepta un pedido para comenzar</p>
            </div>
          ) : (
            pedidosAsignados.map((pedido) => (
              <PedidoCard key={pedido.id} pedido={pedido} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PedidosDisponiblesPage;
