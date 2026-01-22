import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Package, 
  MapPin, 
  Phone,
  User,
  Navigation,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Store
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type EstadoPedido = "asignado" | "recogido" | "en_camino" | "entregado";

const PedidoDetallePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estado, setEstado] = useState<EstadoPedido>("asignado");

  // Mock data
  const pedido = {
    id: id || "PED-001",
    negocio: {
      nombre: "Burger House",
      tipo: "Restaurante",
      direccion: "Cra 45 #32-12, Marinilla",
      telefono: "3001234567",
      contacto: "Juan (Encargado)",
    },
    cliente: {
      nombre: "María García",
      telefono: "3009876543",
      direccion: "Calle 50 #25-30, Marinilla",
      notas: "Apartamento 302, edificio azul",
    },
    productos: [
      { nombre: "Hamburguesa Clásica", cantidad: 2, precio: 18000 },
      { nombre: "Papas Grandes", cantidad: 1, precio: 8000 },
      { nombre: "Gaseosa 400ml", cantidad: 2, precio: 4500 },
    ],
    tipoServicio: "Domicilio",
    fechaPedido: "2024-01-15 14:30",
    total: 53000,
    ganancia: 8000,
    metodoPago: "Efectivo",
  };

  const estadosFlow: { key: EstadoPedido; label: string; icon: typeof Package }[] = [
    { key: "asignado", label: "Asignado", icon: Package },
    { key: "recogido", label: "Recogido", icon: Store },
    { key: "en_camino", label: "En Camino", icon: Navigation },
    { key: "entregado", label: "Entregado", icon: CheckCircle2 },
  ];

  const currentIndex = estadosFlow.findIndex(e => e.key === estado);

  const handleNextState = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < estadosFlow.length) {
      setEstado(estadosFlow[nextIndex].key);
    }
  };

  const getNextButtonText = () => {
    switch (estado) {
      case "asignado": return "Marcar como Recogido";
      case "recogido": return "Iniciar Entrega";
      case "en_camino": return "Confirmar Entrega";
      default: return "Completado";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-display font-bold">Pedido {pedido.id}</h1>
          <p className="text-muted-foreground">{pedido.tipoServicio} • {pedido.fechaPedido}</p>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            {estadosFlow.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;

              return (
                <div key={step.key} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-colors
                      ${isCompleted ? "bg-success text-success-foreground" : ""}
                      ${isCurrent ? "bg-emphasis text-emphasis-foreground" : ""}
                      ${!isCompleted && !isCurrent ? "bg-muted text-muted-foreground" : ""}
                    `}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`text-xs mt-2 ${isCurrent ? "text-emphasis font-medium" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                  </div>
                  {index < estadosFlow.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 ${index < currentIndex ? "bg-success" : "bg-muted"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Locations */}
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className={estado === "asignado" ? "border-accent/50 bg-accent/5" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                Punto de Recogida
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{pedido.negocio.nombre}</p>
                <Badge variant="outline" className="mt-1">{pedido.negocio.tipo}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{pedido.negocio.direccion}</p>
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>{pedido.negocio.contacto}</span>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <a href={`tel:${pedido.negocio.telefono}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar al Negocio
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className={estado === "en_camino" ? "border-success/50 bg-success/5" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-success" />
                </div>
                Punto de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{pedido.cliente.nombre}</p>
              </div>
              <p className="text-sm text-muted-foreground">{pedido.cliente.direccion}</p>
              {pedido.cliente.notas && (
                <p className="text-sm text-emphasis bg-emphasis/10 p-2 rounded">
                  📝 {pedido.cliente.notas}
                </p>
              )}
              <Button variant="outline" className="w-full" asChild>
                <a href={`tel:${pedido.cliente.telefono}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar al Cliente
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-emphasis" />
            Detalle del Pedido
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pedido.productos.map((producto, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                  {producto.cantidad}
                </span>
                <span>{producto.nombre}</span>
              </div>
              <span className="font-medium number-display">
                ${(producto.cantidad * producto.precio).toLocaleString()}
              </span>
            </div>
          ))}
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Método de pago</span>
            <Badge variant="outline">{pedido.metodoPago}</Badge>
          </div>
          
          <div className="flex items-center justify-between text-lg font-bold">
            <span>Total a cobrar</span>
            <span className="number-display">${pedido.total.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
            <span className="text-success font-medium">Tu ganancia</span>
            <span className="text-success font-bold number-display">
              +${pedido.ganancia.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      {estado !== "entregado" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button 
            variant="hero" 
            size="lg" 
            className="w-full"
            onClick={handleNextState}
          >
            {estado === "en_camino" ? (
              <CheckCircle2 className="w-5 h-5 mr-2" />
            ) : (
              <Navigation className="w-5 h-5 mr-2" />
            )}
            {getNextButtonText()}
          </Button>
        </motion.div>
      )}

      {estado === "entregado" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-xl font-display font-bold text-success mb-2">
            ¡Pedido Entregado!
          </h2>
          <p className="text-muted-foreground mb-6">
            Has ganado ${pedido.ganancia.toLocaleString()} con este pedido
          </p>
          <Button variant="outline" onClick={() => navigate("/domiciliario/pedidos")}>
            Ver Más Pedidos
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default PedidoDetallePage;
