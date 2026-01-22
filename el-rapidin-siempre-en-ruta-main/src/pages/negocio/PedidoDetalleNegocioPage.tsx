import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  User, 
  Phone, 
  Clock,
  Truck
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const PedidoDetalleNegocioPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data del pedido
  const pedido = {
    id: id || "PED-001",
    fecha: "15 de enero, 2026",
    hora: "14:30",
    estado: "en_proceso",
    cliente: {
      nombre: "Juan Pérez",
      telefono: "300 123 4567",
      direccion: "Cra 45 #32-10, Marinilla"
    },
    productos: [
      { nombre: "Hamburguesa Clásica", cantidad: 2, precio: 18000 },
      { nombre: "Papas Grandes", cantidad: 1, precio: 8000 },
      { nombre: "Gaseosa 400ml", cantidad: 2, precio: 5000 }
    ],
    subtotal: 54000,
    domicilio: 5000,
    total: 59000,
    domiciliario: {
      nombre: "Pedro Gómez",
      telefono: "301 987 6543",
      placa: "ABC-123"
    },
    notas: "Sin cebolla en las hamburguesas"
  };

  const getEstadoBadge = (estado: string) => {
    const config: Record<string, { label: string; className: string }> = {
      pendiente: { label: "Pendiente", className: "bg-muted text-muted-foreground" },
      en_proceso: { label: "En proceso", className: "bg-emphasis/20 text-emphasis" },
      en_camino: { label: "En camino", className: "bg-accent/20 text-accent" },
      entregado: { label: "Entregado", className: "bg-success/20 text-success" },
    };
    const { label, className } = config[estado] || { label: estado, className: "" };
    return <Badge className={cn("text-base px-4 py-1 font-medium", className)}>{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="hover:bg-accent/20 hover:text-accent"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-display font-bold text-foreground">Pedido {pedido.id}</h1>
          <p className="text-muted-foreground">{pedido.fecha} · <span className="text-emphasis">{pedido.hora}</span></p>
        </div>
        {getEstadoBadge(pedido.estado)}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Productos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-foreground">
                <Package className="w-5 h-5 text-accent" />
                Productos del Pedido
              </CardTitle>
              <CardDescription>{pedido.productos.length} productos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pedido.productos.map((producto, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Package className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{producto.nombre}</p>
                        <p className="text-sm text-muted-foreground">
                          Cantidad: {producto.cantidad}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium font-display text-foreground">
                      ${(producto.precio * producto.cantidad).toLocaleString()}
                    </p>
                  </div>
                ))}

                <Separator className="my-4 bg-border" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-display text-foreground">${pedido.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Domicilio</span>
                    <span className="font-display text-foreground">${pedido.domicilio.toLocaleString()}</span>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-foreground">Total</span>
                    <span className="text-accent font-display">${pedido.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info lateral */}
        <div className="space-y-6">
          {/* Cliente */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-foreground">
                  <User className="w-5 h-5 text-accent" />
                  Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="border-2 border-accent">
                    <AvatarFallback className="bg-accent/20 text-accent font-bold">
                      {pedido.cliente.nombre.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{pedido.cliente.nombre}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="w-3 h-3 text-emphasis" />
                      {pedido.cliente.telefono}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/5 border border-accent/20">
                  <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                  <p className="text-sm text-foreground">{pedido.cliente.direccion}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Domiciliario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-foreground">
                  <Truck className="w-5 h-5 text-emphasis" />
                  Domiciliario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pedido.domiciliario ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Avatar className="border-2 border-success">
                        <AvatarFallback className="bg-success/20 text-success font-bold">
                          {pedido.domiciliario.nombre.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{pedido.domiciliario.nombre}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emphasis" />
                          {pedido.domiciliario.telefono}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-emphasis/10 border border-emphasis/20">
                      <Truck className="w-4 h-4 text-emphasis" />
                      <p className="text-sm text-foreground">Placa: <span className="font-bold">{pedido.domiciliario.placa}</span></p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-emphasis" />
                    <p className="text-sm">Esperando asignación</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Notas */}
          {pedido.notas && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-foreground">Notas del cliente</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">{pedido.notas}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PedidoDetalleNegocioPage;
