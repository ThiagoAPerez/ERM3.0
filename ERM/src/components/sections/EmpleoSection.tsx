import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bike, DollarSign, Clock, MapPin, CheckCircle2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmpleoSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    tipoVehiculo: "",
    licencia: "",
    disponibilidad: "",
    experiencia: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "¡Postulación enviada!",
      description: "Nos pondremos en contacto contigo pronto.",
    });
    
    setFormData({
      nombre: "",
      telefono: "",
      email: "",
      tipoVehiculo: "",
      licencia: "",
      disponibilidad: "",
      experiencia: "",
    });
    setIsSubmitting(false);
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "Genera ingresos",
      description: "Gana dinero en tu tiempo libre con entregas flexibles",
    },
    {
      icon: Clock,
      title: "Horarios flexibles",
      description: "Tú decides cuándo y cuánto trabajar",
    },
    {
      icon: MapPin,
      title: "Trabaja en tu zona",
      description: "Realiza entregas cerca de donde vives",
    },
  ];

  const requirements = [
    "Tener moto o bicicleta en buen estado",
    "Licencia de conducción vigente (para moto)",
    "Documentos al día",
    "Smartphone con datos móviles",
    "Disponibilidad para entregas",
  ];

  return (
    <section id="empleo" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emphasis/10 border border-emphasis/20 text-emphasis text-sm font-medium mb-6">
            <Bike className="w-4 h-4" />
            <span>Únete a nuestro equipo</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            ¿Quieres trabajar con nosotros?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conviértete en domiciliario de EL RAPIDÍN y genera ingresos con horarios flexibles. 
            Trabajamos con repartidores en moto y bicicleta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Benefits & Requirements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-xl font-display font-bold text-foreground">
                Beneficios de ser domiciliario
              </h3>
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass border-border/50 hover:border-emphasis/30 transition-colors">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emphasis/20 flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-6 h-6 text-emphasis" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <h3 className="text-xl font-display font-bold text-foreground">
                Requisitos
              </h3>
              <Card className="glass border-border/50">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {requirements.map((req, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-muted-foreground">{req}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-display">Postularme como domiciliario</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo</Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="300 123 4567"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tipoVehiculo">Tipo de vehículo</Label>
                      <Select
                        value={formData.tipoVehiculo}
                        onValueChange={(v) => setFormData({ ...formData, tipoVehiculo: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="moto">Moto</SelectItem>
                          <SelectItem value="bicicleta">Bicicleta</SelectItem>
                          <SelectItem value="motocarguero">Motocarguero</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licencia">¿Tienes licencia?</Label>
                      <Select
                        value={formData.licencia}
                        onValueChange={(v) => setFormData({ ...formData, licencia: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="si">Sí</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="na">No aplica (bicicleta)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="disponibilidad">Disponibilidad horaria</Label>
                    <Select
                      value={formData.disponibilidad}
                      onValueChange={(v) => setFormData({ ...formData, disponibilidad: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manana">Mañanas (6am - 12pm)</SelectItem>
                        <SelectItem value="tarde">Tardes (12pm - 6pm)</SelectItem>
                        <SelectItem value="noche">Noches (6pm - 10pm)</SelectItem>
                        <SelectItem value="fines">Fines de semana</SelectItem>
                        <SelectItem value="completa">Tiempo completo</SelectItem>
                        <SelectItem value="flexible">Horario flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experiencia">Experiencia previa (opcional)</Label>
                    <Textarea
                      id="experiencia"
                      value={formData.experiencia}
                      onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                      placeholder="Cuéntanos si tienes experiencia como domiciliario..."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Enviar postulación
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmpleoSection;
