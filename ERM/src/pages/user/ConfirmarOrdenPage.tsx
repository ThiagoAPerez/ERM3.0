import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Package,
  Clock,
  FileText,
  Edit,
  ArrowRight,
  CheckCircle2,
  Store,
  User,
  ShoppingBag,
} from "lucide-react";

const ConfirmarOrdenPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state || {};

  // Check if it's a product order or service order
  const isProductOrder = orderData.items && orderData.items.length > 0;

  // Mock order summary for product orders
  const productOrderSummary = {
    tienda: orderData.tienda || "Tienda",
    items: orderData.items || [],
    subtotal: orderData.subtotal || 0,
    costoEnvio: orderData.costoEnvio || 5000,
    total: orderData.total || 0,
    direccionEntrega: orderData.direccionEntrega || "Cra 45 #23-12, Barrio Centro",
    nombreRecibe: orderData.nombreRecibe || "Juan Pérez",
    telefonoRecibe: orderData.telefonoRecibe || "300 123 4567",
    estimatedTime: "30-45 min",
  };

  // Mock order summary for service orders
  const serviceOrderSummary = {
    serviceType: orderData.serviceType || "mensajeria",
    pickupAddress: orderData.pickupAddress || "Cra 45 #23-12, Barrio Centro",
    deliveryAddress: orderData.deliveryAddress || orderData.direccionEntrega || "Av Principal #100-50",
    recipientName: orderData.recipientName || orderData.nombreRecibe || "Juan Pérez",
    recipientPhone: orderData.recipientPhone || orderData.telefonoRecibe || "300 123 4567",
    description: orderData.description || "Paquete de documentos",
    estimatedTime: "30-45 min",
    subtotal: "$12,000",
    deliveryFee: "$3,000",
    total: "$15,000",
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getServiceLabel = (type: string) => {
    const labels: Record<string, string> = {
      restaurante: "Pedido de Restaurante",
      mensajeria: "Mensajería Express",
      motocarguero: "Motocarguero",
    };
    return labels[type] || type;
  };

  const handleContinue = () => {
    navigate("/orden/pago", { state: isProductOrder ? productOrderSummary : serviceOrderSummary });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">
          Confirma tu orden
        </h1>
        <p className="text-muted-foreground">
          Revisa los detalles antes de continuar al pago
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {isProductOrder ? (
          // Product Order Summary
          <>
            <Card className="glass border-border/50 mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Store className="w-5 h-5 text-accent" />
                  {productOrderSummary.tienda}
                </CardTitle>
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  <ShoppingBag className="w-3 h-3 mr-1" />
                  Productos
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Products List */}
                {productOrderSummary.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs font-medium text-accent">
                        {item.cantidad}
                      </span>
                      <span className="text-foreground">{item.nombre}</span>
                    </div>
                    <span className="font-medium text-foreground">
                      {formatPrice(item.precio * item.cantidad)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="glass border-border/50 mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Datos de entrega</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Dirección de entrega</p>
                    <p className="font-medium text-foreground">{productOrderSummary.direccionEntrega}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Quien recibe</p>
                    <p className="font-medium text-foreground">{productOrderSummary.nombreRecibe}</p>
                    <p className="text-sm text-muted-foreground">{productOrderSummary.telefonoRecibe}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-sm text-muted-foreground">Tiempo estimado</span>
                  </div>
                  <span className="font-semibold text-accent">{productOrderSummary.estimatedTime}</span>
                </div>
              </CardContent>
            </Card>

            {/* Invoice */}
            <Card className="glass border-border/50 mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Factura</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(productOrderSummary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Costo de envío</span>
                  <span className="text-foreground">{formatPrice(productOrderSummary.costoEnvio)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-accent">{formatPrice(productOrderSummary.total)}</span>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          // Service Order Summary (original)
          <>
            <Card className="glass border-border/50 mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Resumen del Pedido</CardTitle>
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  {getServiceLabel(serviceOrderSummary.serviceType)}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Addresses */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Recogida</p>
                      <p className="font-medium text-foreground">{serviceOrderSummary.pickupAddress}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Entrega</p>
                      <p className="font-medium text-foreground">{serviceOrderSummary.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Recipient */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Destinatario</p>
                      <p className="font-medium text-foreground">{serviceOrderSummary.recipientName}</p>
                      <p className="text-sm text-muted-foreground">{serviceOrderSummary.recipientPhone}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Descripción</p>
                      <p className="font-medium text-foreground">{serviceOrderSummary.description}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Estimated Time */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-sm text-muted-foreground">Tiempo estimado</span>
                  </div>
                  <span className="font-semibold text-accent">{serviceOrderSummary.estimatedTime}</span>
                </div>
              </CardContent>
            </Card>

            {/* Invoice */}
            <Card className="glass border-border/50 mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Factura</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{serviceOrderSummary.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Costo de envío</span>
                  <span className="text-foreground">{serviceOrderSummary.deliveryFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-accent">{serviceOrderSummary.total}</span>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex-1"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="hero"
            onClick={handleContinue}
            className="flex-1"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Continuar al Pago
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmarOrdenPage;
