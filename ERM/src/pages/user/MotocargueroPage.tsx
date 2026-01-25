import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Truck,
  MapPin,
  Package,
  Phone,
  ArrowRight,
  Clock,
  Shield,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const MotocargueroPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    packageType: "",
    weight: "",
    description: "",
    recipientName: "",
    recipientPhone: "",
    notes: "",
  });

  const packageTypes = [
    { id: "small", label: "Pequeño (hasta 10kg)", price: "$15,000" },
    { id: "medium", label: "Mediano (10-25kg)", price: "$22,000" },
    { id: "large", label: "Grande (25-50kg)", price: "$35,000" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to confirmation
    navigate("/orden/confirmar", { state: { type: "motocarguero", ...formData } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/servicios" className="hover:text-accent">
            Servicios
          </Link>
          <span>/</span>
          <span className="text-foreground">Motocarguero</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">
            <Truck className="w-7 h-7 text-purple-500" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Servicio Motocarguero
            </h1>
            <p className="text-muted-foreground">
              Transporte de carga mediana con moto adaptada
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Detalles del envío</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Addresses */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupAddress">Dirección de recogida</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-green-500" />
                      <Input
                        id="pickupAddress"
                        placeholder="¿Dónde recogemos?"
                        className="pl-10"
                        value={formData.pickupAddress}
                        onChange={(e) =>
                          setFormData({ ...formData, pickupAddress: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryAddress">Dirección de entrega</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-red-500" />
                      <Input
                        id="deliveryAddress"
                        placeholder="¿A dónde lo llevamos?"
                        className="pl-10"
                        value={formData.deliveryAddress}
                        onChange={(e) =>
                          setFormData({ ...formData, deliveryAddress: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="packageType">Tipo de paquete</Label>
                    <Select
                      value={formData.packageType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, packageType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tamaño" />
                      </SelectTrigger>
                      <SelectContent>
                        {packageTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso aproximado (kg)</Label>
                    <div className="relative">
                      <Package className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="weight"
                        type="number"
                        placeholder="Ej: 15"
                        className="pl-10"
                        value={formData.weight}
                        onChange={(e) =>
                          setFormData({ ...formData, weight: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción del contenido</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe lo que vas a enviar"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Recipient Info */}
                <div className="pt-4 border-t border-border/50">
                  <h3 className="font-medium mb-4">Información del destinatario</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipientName">Nombre</Label>
                      <Input
                        id="recipientName"
                        placeholder="Nombre de quien recibe"
                        value={formData.recipientName}
                        onChange={(e) =>
                          setFormData({ ...formData, recipientName: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipientPhone">Teléfono</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="recipientPhone"
                          type="tel"
                          placeholder="300 123 4567"
                          className="pl-10"
                          value={formData.recipientPhone}
                          onChange={(e) =>
                            setFormData({ ...formData, recipientPhone: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

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

                <Button type="submit" variant="hero" className="w-full" size="lg">
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Pricing */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Tarifas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {packageTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                >
                  <span className="text-sm text-muted-foreground">{type.label}</span>
                  <Badge variant="outline" className="text-accent border-accent/30">
                    {type.price}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Incluye</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: Clock, text: "Entrega en 45-90 min" },
                { icon: Shield, text: "Seguro de carga" },
                { icon: CheckCircle2, text: "Seguimiento en tiempo real" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Warning */}
          <Card className="glass border-border/50 border-accent/30 bg-accent/5">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Importante</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    El peso máximo permitido es de 50kg. Para cargas más pesadas, 
                    contáctanos directamente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MotocargueroPage;
