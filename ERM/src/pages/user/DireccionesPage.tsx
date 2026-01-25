import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  Star,
  Home,
  Building,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  reference: string;
  isPrimary: boolean;
  type: "home" | "work" | "other";
}

const DireccionesPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "Casa",
      address: "Cra 45 #23-12",
      city: "Barrio Centro",
      reference: "Edificio azul, apartamento 302",
      isPrimary: true,
      type: "home",
    },
    {
      id: "2",
      name: "Oficina",
      address: "Av Principal #100-50",
      city: "Ed. Torre A, Piso 5",
      reference: "Al lado del banco",
      isPrimary: false,
      type: "work",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    reference: "",
    type: "home" as "home" | "work" | "other",
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "home":
        return Home;
      case "work":
        return Building;
      default:
        return MapPin;
    }
  };

  const handleSave = () => {
    if (editingAddress) {
      // Update existing
      setAddresses(
        addresses.map((a) =>
          a.id === editingAddress.id
            ? { ...a, ...formData }
            : a
        )
      );
      toast({
        title: "Dirección actualizada",
        description: "Los cambios han sido guardados.",
      });
    } else {
      // Create new
      const newAddress: Address = {
        id: Date.now().toString(),
        ...formData,
        isPrimary: addresses.length === 0,
      };
      setAddresses([...addresses, newAddress]);
      toast({
        title: "Dirección agregada",
        description: "La nueva dirección ha sido guardada.",
      });
    }

    setIsDialogOpen(false);
    setEditingAddress(null);
    setFormData({
      name: "",
      address: "",
      city: "",
      reference: "",
      type: "home",
    });
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      name: address.name,
      address: address.address,
      city: address.city,
      reference: address.reference,
      type: address.type,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    toast({
      title: "Dirección eliminada",
      description: "La dirección ha sido eliminada.",
    });
  };

  const handleSetPrimary = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isPrimary: a.id === id,
      }))
    );
    toast({
      title: "Dirección principal actualizada",
      description: "Esta dirección será usada por defecto.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Mis Direcciones
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus direcciones de entrega
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="hero"
              onClick={() => {
                setEditingAddress(null);
                setFormData({
                  name: "",
                  address: "",
                  city: "",
                  reference: "",
                  type: "home",
                });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Editar Dirección" : "Nueva Dirección"}
              </DialogTitle>
              <DialogDescription>
                {editingAddress
                  ? "Modifica los datos de tu dirección"
                  : "Agrega una nueva dirección de entrega"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la dirección</Label>
                <Input
                  id="name"
                  placeholder="Ej: Casa, Oficina..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  placeholder="Cra 45 #23-12"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Barrio / Zona</Label>
                <Input
                  id="city"
                  placeholder="Barrio Centro"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference">Punto de referencia</Label>
                <Input
                  id="reference"
                  placeholder="Al lado del banco, edificio azul..."
                  value={formData.reference}
                  onChange={(e) =>
                    setFormData({ ...formData, reference: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de dirección</Label>
                <div className="flex gap-2">
                  {[
                    { id: "home", label: "Casa", icon: Home },
                    { id: "work", label: "Trabajo", icon: Building },
                    { id: "other", label: "Otro", icon: MapPin },
                  ].map((type) => (
                    <Button
                      key={type.id}
                      type="button"
                      variant={formData.type === type.id ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          type: type.id as "home" | "work" | "other",
                        })
                      }
                      className={
                        formData.type === type.id
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }
                    >
                      <type.icon className="w-4 h-4 mr-1" />
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Button variant="hero" className="w-full" onClick={handleSave}>
                {editingAddress ? "Guardar Cambios" : "Agregar Dirección"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Addresses List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {addresses.map((address, index) => {
          const Icon = getIcon(address.type);
          return (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card
                className={`glass border-border/50 ${
                  address.isPrimary ? "border-accent/50 bg-accent/5" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          address.isPrimary
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {address.name}
                          </h3>
                          {address.isPrimary && (
                            <Badge
                              variant="outline"
                              className="text-accent border-accent/30 text-xs"
                            >
                              <Star className="w-3 h-3 mr-1 fill-accent" />
                              Principal
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-foreground">{address.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}
                        </p>
                        {address.reference && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Ref: {address.reference}
                          </p>
                        )}
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(address)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        {!address.isPrimary && (
                          <DropdownMenuItem
                            onClick={() => handleSetPrimary(address.id)}
                          >
                            <Star className="w-4 h-4 mr-2" />
                            Marcar como principal
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDelete(address.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        {addresses.length === 0 && (
          <Card className="glass border-border/50">
            <CardContent className="p-8 text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">
                No tienes direcciones guardadas
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Agrega una dirección para hacer tus pedidos más rápido
              </p>
              <Button
                variant="hero"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Dirección
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default DireccionesPage;
