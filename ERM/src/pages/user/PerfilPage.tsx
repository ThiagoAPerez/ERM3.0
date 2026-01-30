import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  ArrowRight,
  Shield,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { ClientMeResponse, ClientProfileResponse } from "./UserDashboard";

/* =====================  PERFIL PAGE  ===================== */
//==========================================================

const PerfilPage = () => {
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ===================== STATE =====================

  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState<ClientProfileResponse>({
    name: "",
    phone: "",
    profilePhotoUrl: null,
  });

  // ===================== LOAD PROFILE =====================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/client/me");
        const data = res.data as ClientMeResponse;

        setEmail(data.user.email);
        setFormData({
          name: data.clientProfile.name,
          phone: data.clientProfile.phone,
          profilePhotoUrl: data.clientProfile.profilePhotoUrl,
        });
      } catch {
        toast({
          title: "Error",
          description: "No se pudo cargar el perfil",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [toast]);

  // ===================== SAVE PROFILE =====================

  const handleSave = async () => {
    try {
      setIsSaving(true);

      if (!formData.name.trim() || !formData.phone.trim()) {
        toast({
          title: "Datos inválidos",
          description: "Nombre y teléfono son obligatorios",
          variant: "destructive",
        });
        return;
      }

      await api.put("/client/profile", {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        profilePhotoUrl: formData.profilePhotoUrl,
      });

      toast({
        title: "Perfil actualizado",
        description: "Tus cambios han sido guardados correctamente.",
      });

      setIsEditing(false);
    } catch {
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // ===================== IMAGE UPLOAD =====================

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profilePhotoUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  // ===================== LOADING =====================

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <p className="text-muted-foreground">Cargando perfil...</p>
      </div>
    );
  }

  // ===================== QUICK LINKS =====================

  const quickLinks = [
    {
      icon: MapPin,
      title: "Mis Direcciones",
      description: "Gestiona tus direcciones de entrega",
      href: "/perfil/direcciones",
    },
    {
      icon: Shield,
      title: "Seguridad",
      description: "Cambia tu contraseña",
      href: "/perfil/seguridad",
    },
  ];

  // ===================== RENDER =====================

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Mi Perfil
        </h1>
        <p className="text-muted-foreground">
          Gestiona tu información personal
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass border-border/50 mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Información Personal</CardTitle>
            <Button
              variant={isEditing ? "ghost" : "outline"}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={formData.profilePhotoUrl || undefined} />
                  <AvatarFallback className="text-2xl bg-accent/20 text-accent">
                    {formData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {isEditing && (
                  <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center cursor-pointer hover:bg-accent/90 transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {formData.name}
                </h3>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={email}
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <Button
                variant="hero"
                className="w-full"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Guardando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Guardar Cambios
                  </div>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle>Configuración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickLinks.map((link) => (
              <Link key={link.title} to={link.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <link.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {link.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PerfilPage;
