import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingCart,
  MapPin,
  Phone,
  User,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Store,
} from "lucide-react";

const CarritoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartData = location.state || {};

  const [step, setStep] = useState(1);
  const [usarMisDatos, setUsarMisDatos] = useState(true);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState("");
  const [nuevaDireccion, setNuevaDireccion] = useState("");
  const [nombreRecibe, setNombreRecibe] = useState("");
  const [telefonoRecibe, setTelefonoRecibe] = useState("");

  // Mock cart items (would come from state/context in real app)
  const [cartItems, setCartItems] = useState([
    {
      id: 101,
      nombre: "Gaseosa Cola 2L",
      precio: 5500,
      cantidad: 2,
      imagen:
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=100",
      opciones: ["Fría"],
    },
    {
      id: 102,
      nombre: "Jugo de Naranja 1L",
      precio: 8000,
      cantidad: 1,
      imagen:
        "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=100",
      opciones: ["Sin pulpa"],
    },
    {
      id: 104,
      nombre: "Papas Fritas Familiar",
      precio: 7500,
      cantidad: 1,
      imagen:
        "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=100",
      opciones: ["BBQ"],
    },
  ]);

  // Mock saved addresses
  const direccionesGuardadas = [
    {
      id: "1",
      nombre: "Casa",
      direccion: "Cra 45 #23-12, Barrio Centro, Marinilla",
    },
    {
      id: "2",
      nombre: "Oficina",
      direccion: "Av Principal #100-50, Ed. Torre A, Rionegro",
    },
    {
      id: "3",
      nombre: "Casa Mamá",
      direccion: "Calle 30 #15-20, El Santuario",
    },
  ];

  // Mock user data
  const misDatos = {
    nombre: "Juan Pérez",
    telefono: "300 123 4567",
  };

  const tiendaOrigen = cartData.tiendaNombre || "Supermercado El Ahorro";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: Math.max(0, item.cantidad + delta) }
            : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0,
  );
  const costoEnvio = 5000;
  const total = subtotal + costoEnvio;
  const totalItems = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

  const handleContinue = () => {
    if (step === 1 && cartItems.length > 0) {
      setStep(2);
    } else if (step === 2) {
      const orderData = {
        items: cartItems,
        subtotal,
        costoEnvio,
        total,
        tienda: tiendaOrigen,
        direccionEntrega: direccionSeleccionada
          ? direccionesGuardadas.find((d) => d.id === direccionSeleccionada)
              ?.direccion
          : nuevaDireccion,
        nombreRecibe: usarMisDatos ? misDatos.nombre : nombreRecibe,
        telefonoRecibe: usarMisDatos ? misDatos.telefono : telefonoRecibe,
      };
      navigate("/orden/confirmar", { state: orderData });
    }
  };

  const canContinue =
    step === 1
      ? cartItems.length > 0
      : (direccionSeleccionada || nuevaDireccion) &&
        (usarMisDatos || (nombreRecibe && telefonoRecibe));

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  step >= s
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 2 && (
                <div
                  className={`flex-1 h-1 mx-4 rounded transition-colors ${
                    step > s ? "bg-accent" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Tu carrito</span>
          <span>Datos de entrega</span>
        </div>
      </motion.div>

      {/* Step 1: Cart Items */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Store info */}
          <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-muted/30 border border-border/50">
            <Store className="w-6 h-6 text-accent" />
            <div>
              <p className="font-medium text-foreground">{tiendaOrigen}</p>
              <p className="text-sm text-muted-foreground">
                {totalItems} productos en tu carrito
              </p>
            </div>
          </div>

          {cartItems.length > 0 ? (
            <Card className="glass border-border/50 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-accent" />
                  Tu carrito
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0"
                  >
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-foreground">
                          {item.nombre}
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      {item.opciones.length > 0 && (
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.opciones.join(", ")}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.cantidad}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="font-bold text-accent">
                          {formatPrice(item.precio * item.cantidad)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator className="my-4" />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Costo de envío
                    </span>
                    <span className="text-foreground">
                      {formatPrice(costoEnvio)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-accent">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass border-border/50 mb-6">
              <CardContent className="p-8 text-center">
                <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-muted-foreground mb-4">
                  Agrega productos para continuar con tu pedido
                </p>
                <Button variant="hero" onClick={() => navigate(-1)}>
                  Volver a la tienda
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}

      {/* Step 2: Delivery Data */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Delivery Address */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Dirección de entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Direcciones guardadas</Label>
                <RadioGroup
                  value={direccionSeleccionada}
                  onValueChange={(val) => {
                    setDireccionSeleccionada(val);
                    setNuevaDireccion("");
                  }}
                  className="space-y-2"
                >
                  {direccionesGuardadas.map((dir) => (
                    <Label
                      key={dir.id}
                      htmlFor={`dir-${dir.id}`}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        direccionSeleccionada === dir.id
                          ? "border-accent bg-accent/10"
                          : "border-border/50 hover:border-accent/50"
                      }`}
                    >
                      <RadioGroupItem value={dir.id} id={`dir-${dir.id}`} />
                      <div>
                        <p className="font-medium text-foreground">
                          {dir.nombre}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {dir.direccion}
                        </p>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    o ingresa una nueva
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nuevaDireccion">Nueva dirección</Label>
                <Input
                  id="nuevaDireccion"
                  placeholder="Cra 45 #23-12, Barrio Centro..."
                  value={nuevaDireccion}
                  onChange={(e) => {
                    setNuevaDireccion(e.target.value);
                    setDireccionSeleccionada("");
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Recipient Data */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                Datos de quien recibe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="usarMisDatos"
                  checked={usarMisDatos}
                  onCheckedChange={(checked) =>
                    setUsarMisDatos(checked as boolean)
                  }
                />
                <Label htmlFor="usarMisDatos" className="cursor-pointer">
                  Usar mis datos ({misDatos.nombre} · {misDatos.telefono})
                </Label>
              </div>

              {!usarMisDatos && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="nombreRecibe">Nombre completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="nombreRecibe"
                        placeholder="Nombre de quien recibe"
                        className="pl-10"
                        value={nombreRecibe}
                        onChange={(e) => setNombreRecibe(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefonoRecibe">Teléfono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="telefonoRecibe"
                        type="tel"
                        placeholder="300 123 4567"
                        className="pl-10"
                        value={telefonoRecibe}
                        onChange={(e) => setTelefonoRecibe(e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="glass border-border/50 border-accent/20 bg-accent/5">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total del pedido
                  </p>
                  <p className="text-2xl font-bold text-accent">
                    {formatPrice(total)}
                  </p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{totalItems} productos</p>
                  <p>+ envío</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-4 mt-6"
      >
        {step > 1 && (
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Atrás
          </Button>
        )}
        <Button
          variant="hero"
          onClick={handleContinue}
          className="flex-1"
          disabled={!canContinue}
        >
          {step === 1 ? "Continuar" : "Revisar pedido"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
};

export default CarritoPage;
