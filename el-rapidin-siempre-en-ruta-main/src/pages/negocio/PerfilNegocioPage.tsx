import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Store, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Star,
  Package,
  TrendingUp,
  Info
} from "lucide-react";

const PerfilNegocioPage = () => {
  const perfil = {
    nombre: "Restaurante El Buen Sabor",
    email: "contacto@elbuensabor.com",
    telefono: "+57 300 123 4567",
    direccion: "Calle 45 #23-12, Medellín",
    horario: "Lunes a Sábado: 8:00 AM - 10:00 PM",
    descripcion: "Restaurante especializado en comida típica colombiana con más de 10 años de experiencia.",
  };

  const stats = {
    calificacion: 4.8,
    pedidosTotales: 1250,
    ingresosMes: 15680000,
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Perfil del Negocio
          </h1>
          <p className="text-muted-foreground mt-1">
            Información de tu negocio
          </p>
        </div>
        <Badge className="bg-accent text-accent-foreground">
          Verificado
        </Badge>
      </motion.div>

      {/* Read-only notice */}
      <Alert className="bg-muted/50 border-border">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Para modificar la información de tu negocio, por favor contacta a soporte.
        </AlertDescription>
      </Alert>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="bg-card border-border hover:border-accent/50 transition-colors">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emphasis/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-emphasis" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Calificación</p>
              <p className="text-2xl font-bold font-display text-foreground">{stats.calificacion}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-accent/50 transition-colors">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Package className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pedidos Totales</p>
              <p className="text-2xl font-bold font-display text-foreground">{stats.pedidosTotales.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-accent/50 transition-colors">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ingresos del Mes</p>
              <p className="text-2xl font-bold font-display text-foreground">
                ${(stats.ingresosMes / 1000000).toFixed(1)}M
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Image Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-display text-foreground">Logo del Negocio</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-accent to-emphasis flex items-center justify-center">
                <Store className="w-16 h-16 text-white" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Info (Read-Only) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-display text-foreground">Información del Negocio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Store className="w-4 h-4" />
                    Nombre del Negocio
                  </p>
                  <p className="text-foreground font-medium bg-muted/50 px-3 py-2 rounded-lg">
                    {perfil.nombre}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Correo Electrónico
                  </p>
                  <p className="text-foreground font-medium bg-muted/50 px-3 py-2 rounded-lg">
                    {perfil.email}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Teléfono
                  </p>
                  <p className="text-foreground font-medium bg-muted/50 px-3 py-2 rounded-lg">
                    {perfil.telefono}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Horario de Atención
                  </p>
                  <p className="text-foreground font-medium bg-muted/50 px-3 py-2 rounded-lg">
                    {perfil.horario}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Dirección
                </p>
                <p className="text-foreground font-medium bg-muted/50 px-3 py-2 rounded-lg">
                  {perfil.direccion}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Descripción del Negocio</p>
                <p className="text-foreground bg-muted/50 px-3 py-3 rounded-lg leading-relaxed">
                  {perfil.descripcion}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PerfilNegocioPage;
