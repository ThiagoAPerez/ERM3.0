import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  MapPin, 
  User, 
  Phone, 
  ArrowUpFromLine, 
  ArrowDownToLine,
  Send,
  CheckCircle2,
  Clock,
  Shield,
  Info
} from "lucide-react";
import { toast } from "sonner";

const PaqueteriaPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [senderData, setSenderData] = useState({
    address: "",
    nomenclature: "",
    municipality: "",
    name: "",
    phone: "",
  });

  const [receiverData, setReceiverData] = useState({
    address: "",
    nomenclature: "",
    municipality: "",
    name: "",
    phone: "",
  });

  const [packageDescription, setPackageDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("¡Solicitud enviada correctamente!");
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto text-center"
        >
          <Card className="glass border-border/50">
            <CardContent className="p-12">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                ¡Solicitud Enviada!
              </h2>
              <p className="text-muted-foreground mb-8">
                Tu solicitud de envío ha sido recibida. Un domiciliario será asignado pronto 
                y te notificaremos cuando esté en camino a recoger tu paquete.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" onClick={() => navigate("/dashboard")}>
                  Ir al Dashboard
                </Button>
                <Button variant="outline" onClick={() => {
                  setIsSubmitted(false);
                  setSenderData({ address: "", nomenclature: "", municipality: "", name: "", phone: "" });
                  setReceiverData({ address: "", nomenclature: "", municipality: "", name: "", phone: "" });
                  setPackageDescription("");
                }}>
                  Nuevo Envío
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
          <Package className="w-3 h-3 mr-1" />
          Servicio de Paquetería
        </Badge>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Envía tu Paquete
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Completa la información de recogida y entrega para solicitar tu envío. 
          Nos aseguraremos de que tu paquete llegue seguro a su destino.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario principal */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* SECCIÓN 1 - QUIEN ENTREGA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass border-blue-500/30 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <ArrowUpFromLine className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-blue-400">Datos de Recogida</CardTitle>
                      <CardDescription>Información de quien entrega el paquete</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="sender-address" className="flex items-center gap-2 text-blue-300/80">
                        <MapPin className="w-4 h-4" />
                        Ubicación de Recogida
                      </Label>
                      <Input
                        id="sender-address"
                        placeholder="Ej: Barrio Centro, cerca al parque principal"
                        className="mt-1.5 border-blue-500/30 focus:border-blue-500/50"
                        value={senderData.address}
                        onChange={(e) => setSenderData({ ...senderData, address: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sender-nomenclature" className="text-blue-300/80">
                        Nomenclatura / Dirección
                      </Label>
                      <Input
                        id="sender-nomenclature"
                        placeholder="Ej: Calle 10 #15-30"
                        className="mt-1.5 border-blue-500/30 focus:border-blue-500/50"
                        value={senderData.nomenclature}
                        onChange={(e) => setSenderData({ ...senderData, nomenclature: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sender-municipality" className="text-blue-300/80">
                        Municipio
                      </Label>
                      <Input
                        id="sender-municipality"
                        placeholder="Ej: Sahagún"
                        className="mt-1.5 border-blue-500/30 focus:border-blue-500/50"
                        value={senderData.municipality}
                        onChange={(e) => setSenderData({ ...senderData, municipality: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sender-name" className="flex items-center gap-2 text-blue-300/80">
                        <User className="w-4 h-4" />
                        Nombre de quien entrega
                      </Label>
                      <Input
                        id="sender-name"
                        placeholder="Nombre completo"
                        className="mt-1.5 border-blue-500/30 focus:border-blue-500/50"
                        value={senderData.name}
                        onChange={(e) => setSenderData({ ...senderData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sender-phone" className="flex items-center gap-2 text-blue-300/80">
                        <Phone className="w-4 h-4" />
                        Teléfono de quien entrega
                      </Label>
                      <Input
                        id="sender-phone"
                        type="tel"
                        placeholder="300 123 4567"
                        className="mt-1.5 border-blue-500/30 focus:border-blue-500/50"
                        value={senderData.phone}
                        onChange={(e) => setSenderData({ ...senderData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* SECCIÓN 2 - QUIEN RECIBE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass border-green-500/30 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-500" />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <ArrowDownToLine className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-green-400">Datos de Entrega</CardTitle>
                      <CardDescription>Información de quien recibe el paquete</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="receiver-address" className="flex items-center gap-2 text-green-300/80">
                        <MapPin className="w-4 h-4" />
                        Ubicación de Destino
                      </Label>
                      <Input
                        id="receiver-address"
                        placeholder="Ej: Barrio La Paz, cerca a la iglesia"
                        className="mt-1.5 border-green-500/30 focus:border-green-500/50"
                        value={receiverData.address}
                        onChange={(e) => setReceiverData({ ...receiverData, address: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="receiver-nomenclature" className="text-green-300/80">
                        Nomenclatura / Dirección
                      </Label>
                      <Input
                        id="receiver-nomenclature"
                        placeholder="Ej: Carrera 5 #20-15"
                        className="mt-1.5 border-green-500/30 focus:border-green-500/50"
                        value={receiverData.nomenclature}
                        onChange={(e) => setReceiverData({ ...receiverData, nomenclature: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="receiver-municipality" className="text-green-300/80">
                        Municipio
                      </Label>
                      <Input
                        id="receiver-municipality"
                        placeholder="Ej: Sahagún"
                        className="mt-1.5 border-green-500/30 focus:border-green-500/50"
                        value={receiverData.municipality}
                        onChange={(e) => setReceiverData({ ...receiverData, municipality: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="receiver-name" className="flex items-center gap-2 text-green-300/80">
                        <User className="w-4 h-4" />
                        Nombre de quien recibe
                      </Label>
                      <Input
                        id="receiver-name"
                        placeholder="Nombre completo"
                        className="mt-1.5 border-green-500/30 focus:border-green-500/50"
                        value={receiverData.name}
                        onChange={(e) => setReceiverData({ ...receiverData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="receiver-phone" className="flex items-center gap-2 text-green-300/80">
                        <Phone className="w-4 h-4" />
                        Teléfono de quien recibe
                      </Label>
                      <Input
                        id="receiver-phone"
                        type="tel"
                        placeholder="300 123 4567"
                        className="mt-1.5 border-green-500/30 focus:border-green-500/50"
                        value={receiverData.phone}
                        onChange={(e) => setReceiverData({ ...receiverData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Descripción del paquete */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Package className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Descripción del Paquete</CardTitle>
                      <CardDescription>Cuéntanos qué vas a enviar (opcional)</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Ej: Caja pequeña con documentos, sobre manila, paquete con ropa..."
                    className="min-h-[100px]"
                    value={packageDescription}
                    onChange={(e) => setPackageDescription(e.target.value)}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Botón de envío */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin mr-2" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Solicitar Envío
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </div>

        {/* Sidebar informativo */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="w-5 h-5 text-accent" />
                  Información del Servicio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Tiempo estimado</p>
                    <p className="text-muted-foreground text-sm">30 - 90 minutos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Peso máximo</p>
                    <p className="text-muted-foreground text-sm">Hasta 10 kg</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Seguro incluido</p>
                    <p className="text-muted-foreground text-sm">Protección básica</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass border-accent/30 bg-accent/5">
              <CardHeader>
                <CardTitle className="text-lg text-accent">Precio Estimado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground mb-2">
                  Desde $8,000
                </p>
                <p className="text-sm text-muted-foreground">
                  El precio final depende de la distancia y el tamaño del paquete.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <ArrowUpFromLine className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-400 text-sm">Sección Azul</p>
                    <p className="text-muted-foreground text-xs">Datos de quien ENTREGA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card className="glass border-green-500/20 bg-green-500/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <ArrowDownToLine className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-green-400 text-sm">Sección Verde</p>
                    <p className="text-muted-foreground text-xs">Datos de quien RECIBE</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaqueteriaPage;
