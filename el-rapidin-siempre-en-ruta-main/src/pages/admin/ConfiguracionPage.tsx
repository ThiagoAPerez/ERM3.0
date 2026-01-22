import { motion } from "framer-motion";
import { 
  Settings, 
  Globe, 
  Bell, 
  Shield, 
  Palette,
  Mail,
  Phone,
  MapPin,
  Instagram,
  MessageCircle,
  Save
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const ConfiguracionPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Configuración"
        description="Ajustes generales del sistema"
        icon={Settings}
        actions={
          <Button variant="hero">
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información de Contacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-card border border-border space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emphasis/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-emphasis" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Información de Contacto</h3>
              <p className="text-sm text-muted-foreground">Datos públicos del negocio</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Correo Electrónico
              </Label>
              <Input
                id="email"
                defaultValue="elrapidinmarinilla@gmail.com"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="whatsapp" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                defaultValue="3107214521"
                placeholder="Número de WhatsApp"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-muted-foreground" />
                Instagram
              </Label>
              <Input
                id="instagram"
                defaultValue="@this_is_rapidin"
                placeholder="@usuario"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="direccion" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                Dirección
              </Label>
              <Input
                id="direccion"
                defaultValue="Marinilla, Antioquia"
                placeholder="Dirección del negocio"
              />
            </div>
          </div>
        </motion.div>

        {/* Notificaciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-card border border-border space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Notificaciones</h3>
              <p className="text-sm text-muted-foreground">Configuración de alertas</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Nuevos pedidos</p>
                <p className="text-sm text-muted-foreground">Notificar cuando llegue un nuevo pedido</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Domiciliario inactivo</p>
                <p className="text-sm text-muted-foreground">Alertar cuando un domiciliario esté inactivo</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Pedidos retrasados</p>
                <p className="text-sm text-muted-foreground">Notificar pedidos que excedan el tiempo</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reportes diarios</p>
                <p className="text-sm text-muted-foreground">Resumen automático al final del día</p>
              </div>
              <Switch />
            </div>
          </div>
        </motion.div>

        {/* Seguridad */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-card border border-border space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Seguridad</h3>
              <p className="text-sm text-muted-foreground">Opciones de acceso y protección</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Autenticación en dos pasos</p>
                <p className="text-sm text-muted-foreground">Requerir código adicional al iniciar sesión</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sesiones activas</p>
                <p className="text-sm text-muted-foreground">Mostrar dispositivos conectados</p>
              </div>
              <Button variant="outline" size="sm">Ver sesiones</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Cambiar contraseña</p>
                <p className="text-sm text-muted-foreground">Actualizar credenciales de acceso</p>
              </div>
              <Button variant="outline" size="sm">Cambiar</Button>
            </div>
          </div>
        </motion.div>

        {/* Apariencia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl bg-card border border-border space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Palette className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Apariencia</h3>
              <p className="text-sm text-muted-foreground">Personalización visual</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tema oscuro</p>
                <p className="text-sm text-muted-foreground">Activar modo oscuro (actual)</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Animaciones</p>
                <p className="text-sm text-muted-foreground">Efectos de transición en la interfaz</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Compacto</p>
                <p className="text-sm text-muted-foreground">Reducir espaciado para más contenido</p>
              </div>
              <Switch />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 rounded-xl bg-emphasis/5 border border-emphasis/20"
      >
        <p className="text-sm text-muted-foreground">
          <span className="text-emphasis font-medium">Nota:</span> La configuración actual es solo visual. 
          Los cambios se aplicarán una vez el backend esté integrado.
        </p>
      </motion.div>
    </div>
  );
};

export default ConfiguracionPage;
