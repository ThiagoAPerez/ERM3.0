import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  ArrowRight,
  Utensils,
  Bike,
  Truck,
  Package,
  FileText,
} from "lucide-react";

const CrearOrdenPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: "",
    deliveryAddress: "",
    recipientPhone: "",
    description: "",
    savedAddress: "",
    notes: "",
  });

  const serviceTypes = [
    {
      id: "restaurante",
      icon: Utensils,
      title: "Restaurante",
      description: "Pide comida de tus restaurantes favoritos",
    },
    {
      id: "mensajeria",
      icon: Bike,
      title: "Mensajería",
      description: "Envío rápido de documentos y paquetes pequeños",
    },
    {
      id: "motocarguero",
      icon: Truck,
      title: "Motocarguero",
      description: "Transporte de carga mediana",
    },
  ];

  const savedAddresses = [
    { id: "1", name: "Casa", address: "Cra 45 #23-12, Barrio Centro" },
    { id: "2", name: "Oficina", address: "Av Principal #100-50, Ed. Torre A" },
    { id: "3", name: "Otro", address: "Ingresar dirección manualmente" },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/orden/confirmar", { state: formData });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  step >= s
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-full h-1 mx-2 rounded transition-colors ${
                    step > s ? "bg-accent" : "bg-muted"
                  }`}
                  style={{ width: "80px" }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Tipo de servicio</span>
          <span>Dirección</span>
          <span>Detalles</span>
        </div>
      </motion.div>

      {/* Step 1: Service Type */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>¿Qué tipo de servicio necesitas?</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.serviceType}
                onValueChange={(value) =>
                  setFormData({ ...formData, serviceType: value })
                }
                className="space-y-4"
              >
                {serviceTypes.map((service) => (
                  <Label
                    key={service.id}
                    htmlFor={service.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.serviceType === service.id
                        ? "border-accent bg-accent/10"
                        : "border-border/50 hover:border-accent/50"
                    }`}
                  >
                    <RadioGroupItem value={service.id} id={service.id} className="sr-only" />
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        formData.serviceType === service.id
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <service.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{service.title}</p>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Step 2: Address */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>¿A dónde lo enviamos?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Dirección guardada</Label>
                <Select
                  value={formData.savedAddress}
                  onValueChange={(value) =>
                    setFormData({ ...formData, savedAddress: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una dirección" />
                  </SelectTrigger>
                  <SelectContent>
                    {savedAddresses.map((addr) => (
                      <SelectItem key={addr.id} value={addr.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{addr.name}</span>
                          <span className="text-xs text-muted-foreground">{addr.address}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">o ingresa una nueva</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryAddress">Dirección de entrega</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="deliveryAddress"
                    placeholder="Cra 45 #23-12, Barrio..."
                    className="pl-10"
                    value={formData.deliveryAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveryAddress: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientPhone">Teléfono de quien recibe</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="recipientPhone"
                    type="tel"
                    placeholder="300 123 4567 (por defecto el tuyo)"
                    className="pl-10"
                    value={formData.recipientPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, recipientPhone: e.target.value })
                    }
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Si no ingresas un número, usaremos el de tu perfil
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Step 3: Details */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Detalles del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Descripción del pedido</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Textarea
                    id="description"
                    placeholder="Describe lo que necesitas..."
                    className="pl-10 min-h-[120px]"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
              </div>

              {formData.serviceType !== "restaurante" && (
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <Package className="w-5 h-5 text-accent" />
                    <span className="font-medium">Información del paquete</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Para mensajería o motocarguero, describe el contenido y tamaño 
                    aproximado de lo que envías.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Instrucciones especiales, puntos de referencia..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
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
          <Button variant="outline" onClick={handleBack} className="flex-1">
            Atrás
          </Button>
        )}
        <Button
          variant="hero"
          onClick={handleNext}
          className="flex-1"
          disabled={
            (step === 1 && !formData.serviceType) ||
            (step === 2 && !formData.savedAddress && !formData.deliveryAddress)
          }
        >
          {step === 3 ? "Revisar Orden" : "Continuar"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
};

export default CrearOrdenPage;
