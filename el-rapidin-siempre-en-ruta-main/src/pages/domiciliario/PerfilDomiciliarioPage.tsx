import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User, Phone, Mail, Car, Star, Package, TrendingUp, Edit, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const PerfilDomiciliarioPage = () => {
  // Mock data
  const perfil = {
    nombre: "Carlos Pérez",
    telefono: "3001234567",
    email: "carlos.perez@email.com",
    placa: "ABC123",
    tipoVehiculo: "Motocicleta",
    estado: "activo",
    avatar: null,
    fechaRegistro: "Enero 2024",
    stats: {
      pedidosTotal: 156,
      calificacionPromedio: 4.8,
      gananciasMes: 1250000,
    },
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold">Mi Perfil</h1>
        <p className="text-muted-foreground">Información de tu cuenta</p>
      </div>

      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={perfil.avatar || undefined} />
                  <AvatarFallback className="bg-emphasis/20 text-emphasis text-2xl">
                    {perfil.nombre.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full w-8 h-8">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <h2 className="text-xl font-display font-bold mt-4">{perfil.nombre}</h2>
              <Badge className={perfil.estado === "activo" ? "bg-success" : "bg-muted"}>
                {perfil.estado === "activo" ? "Activo" : "Inactivo"}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">Miembro desde {perfil.fechaRegistro}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 py-6 border-y border-border">
              <div className="text-center">
                <Package className="w-6 h-6 mx-auto text-emphasis mb-1" />
                <p className="text-2xl font-display font-bold">{perfil.stats.pedidosTotal}</p>
                <p className="text-xs text-muted-foreground">Pedidos</p>
              </div>
              <div className="text-center">
                <Star className="w-6 h-6 mx-auto text-emphasis mb-1" />
                <p className="text-2xl font-display font-bold">{perfil.stats.calificacionPromedio}</p>
                <p className="text-xs text-muted-foreground">Calificación</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-6 h-6 mx-auto text-success mb-1" />
                <p className="text-xl font-display font-bold number-display">
                  ${(perfil.stats.gananciasMes / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-muted-foreground">Este mes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-emphasis" />
                Información de Contacto
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className="w-10 h-10 rounded-full bg-emphasis/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-emphasis" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="font-medium">{perfil.telefono}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className="w-10 h-10 rounded-full bg-emphasis/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-emphasis" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Correo Electrónico</p>
                <p className="font-medium">{perfil.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Vehicle Info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5 text-emphasis" />
                Información del Vehículo
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Vehículo</p>
                <p className="font-medium">{perfil.tipoVehiculo}</p>
              </div>
              <Badge variant="outline">{perfil.tipoVehiculo}</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm text-muted-foreground">Placa</p>
                <p className="font-display font-bold text-xl">{perfil.placa}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <Link to="/domiciliario/seguridad">
          <Button variant="outline" className="w-full">
            Cambiar Contraseña
          </Button>
        </Link>
        <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
          Cerrar Sesión
        </Button>
      </motion.div>
    </div>
  );
};

export default PerfilDomiciliarioPage;
