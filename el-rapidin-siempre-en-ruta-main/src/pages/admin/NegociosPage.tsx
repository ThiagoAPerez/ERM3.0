import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Store,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Power,
  Trash2,
  MapPin,
  Phone,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

/* ===================== UI TYPES (INTOCABLES) ===================== */
type TipoNegocio =
  | "BUSINESS"
  | "STORE"
  | "LICORERA"
  | "RESTAURANT"
  | "MEDICAMENT_STORE"
  | "OTHER";

type UIStatus = "active" | "inactive" | "pending" | "error";

interface Negocio {
  id: string;
  nombre: string;
  tipo: TipoNegocio; // ← ahora es categoría real
  direccion: string;
  municipio: string;
  departamento?: string;
  telefono: string;
  email?: string;
  password?: string;
  estado: UIStatus;
  logo?: string;
  imagenFondo?: string;
  descripcion?: string;
}

/* ===================== BACKEND TYPES ===================== */
type BusinessStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING";
type BusinessesCategory =
  | "BUSINESS"
  | "STORE"
  | "LICORERA"
  | "RESTAURANT"
  | "MEDICAMENT_STORE"
  | "OTHER";

interface NegocioBackend {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  municipality: string;
  description?: string;
  status: BusinessStatus;
  category: BusinessesCategory;
}

/* ===================== ADAPTERS (CLAVE) ===================== */
const backendToUI = (b: NegocioBackend): Negocio => ({
  id: String(b.id),
  nombre: b.name,
  tipo: b.category,
  direccion: b.address,
  municipio: b.municipality,
  telefono: b.phone,
  email: b.email,
  descripcion: b.description,
  estado: b.status === "ACTIVE" ? "active" : "inactive",
});

//===================================================
// =================== ADAPTERS (CLAVE) =====================
//===================================================

type NegocioFormState = {
  nombre: string;
  tipo: TipoNegocio;
  direccion: string;
  municipio: string;
  departamento: string;
  telefono: string;
  email: string;
  password: string;
  descripcion: string;
};

const uiToBackend = (ui: NegocioFormState) => ({
  name: ui.nombre,
  phone: ui.telefono,
  email: ui.email,
  address: ui.direccion,
  municipality: ui.municipio,
  description: ui.descripcion,
  category: ui.tipo, // ← ya es BusinessesCategory
});

/* ===================== UI CONSTANTS (INTOCABLES) ===================== */
const municipios = [
  "Marinilla",
  "El Retiro",
  "La Ceja",
  "Rionegro",
  "El Carmen de Viboral",
  "Guarne",
  "El Santuario",
  "San Vicente",
];

const tipoLabels: Record<TipoNegocio, string> = {
  BUSINESS: "Negocio",
  STORE: "Tienda",
  LICORERA: "Licorera",
  RESTAURANT: "Restaurante",
  MEDICAMENT_STORE: "Droguería",
  OTHER: "Otro",
};

const tipoColors: Record<TipoNegocio, string> = {
  BUSINESS: "bg-emphasis/10 text-emphasis",
  STORE: "bg-blue-500/10 text-blue-400",
  LICORERA: "bg-purple-500/10 text-purple-400",
  RESTAURANT: "bg-accent/10 text-accent",
  MEDICAMENT_STORE: "bg-green-500/10 text-green-400",
  OTHER: "bg-muted text-muted-foreground",
};

/* ===================== COMPONENT ===================== */
const NegociosPage = () => {
  const [negocios, setNegocios] = useState<Negocio[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTipo, setFilterTipo] = useState<TipoNegocio | "all">("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNegocio, setEditingNegocio] = useState<Negocio | null>(null);

  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "RESTAURANT" as TipoNegocio,
    direccion: "",
    municipio: "",
    departamento: "",
    telefono: "",
    email: "",
    password: "",
    descripcion: "",
  });

  /* ===================== LOAD ===================== */
  const loadBusinesses = async () => {
    const res = await api.get<NegocioBackend[]>("/admin/businesses");
    setNegocios(res.data.map(backendToUI));
  };

  useEffect(() => {
    loadBusinesses();
  }, []);

  /* ===================== FILTER ===================== */
  const filteredNegocios = negocios.filter((n) => {
    const matchesSearch = n.nombre
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTipo = filterTipo === "all" || n.tipo === filterTipo;
    return matchesSearch && matchesTipo;
  });

  /* ===================== ACTIONS ===================== */
  // ===================================================================
  // Handlers for opening dialog and setting form data
  const handleOpenDialog = (negocio?: Negocio) => {
    if (negocio) {
      setEditingNegocio(negocio);
      setFormData({
        nombre: negocio.nombre,
        tipo: negocio.tipo,
        direccion: negocio.direccion,
        municipio: negocio.municipio,
        departamento: negocio.departamento ?? "",
        telefono: negocio.telefono,
        email: negocio.email ?? "",
        password: "",
        descripcion: negocio.descripcion ?? "",
      });
    } else {
      setEditingNegocio(null);
      setFormData({
        nombre: "",
        tipo: "RESTAURANT",
        direccion: "",
        municipio: "",
        departamento: "",
        telefono: "",
        email: "",
        password: "",
        descripcion: "",
      });
    }

    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (editingNegocio) {
      await api.put(
        `/admin/businesses/${editingNegocio.id}`,
        uiToBackend(formData),
      );
    } else {
      await api.post("/admin/businesses", {
        ...uiToBackend(formData),
        temporaryPassword: formData.password,
      });
    }
    setIsDialogOpen(false);
    loadBusinesses();
  };

  const handleToggleEstado = async (id: string) => {
    const negocio = negocios.find((n) => n.id === id);
    if (!negocio) return;
    await api.patch(
      `/admin/businesses/${id}/${
        negocio.estado === "active" ? "deactivate" : "activate"
      }`,
    );
    loadBusinesses();
  };

  const handleDelete = async (id: string) => {
    await api.patch(`/admin/businesses/${id}/suspend`);
    loadBusinesses();
  };

  /* ===================== JSX LOVABLE (INTOCABLE) ===================== */

  return (
    <div className="space-y-6">
      <PageHeader
        title="Negocios"
        description="Gestiona los negocios registrados en la plataforma"
        icon={Store}
        actions={
          <Button variant="hero" onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Negocio
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar negocios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={filterTipo}
          onValueChange={(v) => setFilterTipo(v as TipoNegocio | "all")}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="RESTAURANT">Restaurantes</SelectItem>
            <SelectItem value="STORE">Tiendas</SelectItem>
            <SelectItem value="LICORERA">Licoreras</SelectItem>
            <SelectItem value="MEDICAMENT_STORE">Droguerías</SelectItem>
            <SelectItem value="BUSINESS">Negocios</SelectItem>
            <SelectItem value="OTHER">Otros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Negocios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNegocios.map((negocio, index) => (
          <motion.div
            key={negocio.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-emphasis/30 transition-colors group"
          >
            {/* Card Header with Background */}
            <div className="h-24 bg-gradient-to-br from-muted to-card relative">
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-end gap-3">
                <div className="w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center">
                  <Store className="w-7 h-7 text-emphasis" />
                </div>
                <div className="pb-1">
                  <h3 className="font-display font-semibold text-lg">
                    {negocio.nombre}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${tipoColors[negocio.tipo]}`}
                  >
                    {tipoLabels[negocio.tipo]}
                  </span>
                </div>
              </div>

              {/* Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleOpenDialog(negocio)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleToggleEstado(negocio.id)}
                  >
                    <Power className="w-4 h-4 mr-2" />
                    {negocio.estado === "active" ? "Desactivar" : "Activar"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDelete(negocio.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-3">
              {negocio.descripcion && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {negocio.descripcion}
                </p>
              )}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">
                    {negocio.direccion}, {negocio.municipio}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{negocio.telefono}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <StatusBadge status={negocio.estado} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredNegocios.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No se encontraron negocios
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingNegocio ? "Editar Negocio" : "Nuevo Negocio"}
            </DialogTitle>
            <DialogDescription>
              {editingNegocio
                ? "Modifica la información del negocio"
                : "Completa la información para registrar un nuevo negocio"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Nombre del negocio"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Select
                value={formData.tipo}
                onValueChange={(v) =>
                  setFormData({ ...formData, tipo: v as TipoNegocio })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RESTAURANT">Restaurante</SelectItem>
                  <SelectItem value="STORE">Tienda</SelectItem>
                  <SelectItem value="LICORERA">Licorera</SelectItem>
                  <SelectItem value="MEDICAMENT_STORE">Droguería</SelectItem>
                  <SelectItem value="BUSINESS">Negocio</SelectItem>
                  <SelectItem value="OTHER">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="direccion">Dirección (Nomenclatura)</Label>
              <Input
                id="direccion"
                value={formData.direccion}
                onChange={(e) =>
                  setFormData({ ...formData, direccion: e.target.value })
                }
                placeholder="Ej: Cra 45 #32-12"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="municipio">Municipio / Pueblo</Label>
                <Select
                  value={formData.municipio}
                  onValueChange={(v) =>
                    setFormData({ ...formData, municipio: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar municipio" />
                  </SelectTrigger>
                  <SelectContent>
                    {municipios.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="departamento">Departamento (opcional)</Label>
                <Input
                  id="departamento"
                  value={formData.departamento}
                  onChange={(e) =>
                    setFormData({ ...formData, departamento: e.target.value })
                  }
                  placeholder="Ej: Antioquia"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
                placeholder="Número de teléfono"
              />
            </div>

            {/* Credenciales de acceso */}
            <div className="pt-2 border-t">
              <p className="text-sm font-medium mb-3">Credenciales de Acceso</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo del Negocio</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="negocio@email.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña Temporal</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder={
                      editingNegocio
                        ? "Dejar vacío para no cambiar"
                        : "Contraseña inicial"
                    }
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Estas credenciales se usarán para acceder al panel del negocio
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                placeholder="Descripción del negocio"
                rows={3}
              />
            </div>

            {/* Image Upload Placeholders */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground text-sm hover:border-emphasis/50 hover:text-emphasis transition-colors cursor-pointer">
                  Click para subir
                </div>
              </div>
              <div className="space-y-2">
                <Label>Imagen de Fondo</Label>
                <div className="h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground text-sm hover:border-emphasis/50 hover:text-emphasis transition-colors cursor-pointer">
                  Click para subir
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="hero" onClick={handleSave}>
              {editingNegocio ? "Guardar Cambios" : "Crear Negocio"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NegociosPage;
