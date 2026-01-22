import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Power,
  Trash2,
  Phone,
  User,
  Bike,
  Package,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
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
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

/* ================= UI TYPES ================= */

type TipoServicio = "mensajeria" | "motocarguero" | "ambos";
type EstadoDomiciliario = "libre" | "ocupado" | "inactivo";
type TipoVehiculo = "moto" | "carro" | "bicicleta";

interface Domiciliario {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  placa: string;
  tipoVehiculo: TipoVehiculo;
  tipoServicio: TipoServicio;
  estado: EstadoDomiciliario;
  pedidosActivos: number;
  pedidosHoy: number;
  zona?: string;
}

/* ================= BACKEND CONTRACT ================= */

interface AdminDeliveryBackendItem {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  placa: string;
  tipoVehiculo: "CAR" | "MOTO" | "BICICLETA";
  tipoServicio: string;
  estado: "AVAILABLE" | "SUSPENDED" | "BUSY";
  zona: string;
  pedidosActivos: number;
  pedidosHoy: number;
}

interface AdminDeliveryListResponse {
  summary: Record<string, number>;
  data: AdminDeliveryBackendItem[];
}

/* ================= UI HELPERS (YA LOS USABA JSX) ================= */

const tipoServicioLabels: Record<TipoServicio, string> = {
  mensajeria: "Mensajería",
  motocarguero: "Motocarguero",
  ambos: "Ambos",
};

const tipoServicioIcons: Record<TipoServicio, React.ElementType> = {
  mensajeria: Bike,
  motocarguero: Truck,
  ambos: Package,
};

const estadoConfig: Record<
  EstadoDomiciliario,
  { label: string; color: string }
> = {
  libre: { label: "Libre", color: "bg-success/10 text-success" },
  ocupado: { label: "Ocupado", color: "bg-accent/10 text-accent" },
  inactivo: { label: "Inactivo", color: "bg-muted text-muted-foreground" },
};

/* ================= COMPONENT ================= */

const DomiciliariosPage = () => {
  const [domiciliarios, setDomiciliarios] = useState<Domiciliario[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEstado, setFilterEstado] = useState<EstadoDomiciliario | "all">(
    "all",
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDomiciliario, setEditingDomiciliario] =
    useState<Domiciliario | null>(null);

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    password: "",
    placa: "",
    tipoVehiculo: "moto" as TipoVehiculo,
    tipoServicio: "mensajeria" as TipoServicio,
    zona: "",
  });

  const loadDomiciliarios = async () => {
    const res = await api.get<AdminDeliveryListResponse>("/admin/delivery");
    setDomiciliarios(
      res.data.data.map((item) => ({
        id: String(item.id),
        nombre: item.nombre,
        telefono: item.telefono,
        email: item.email,
        placa: item.placa,
        tipoVehiculo: item.tipoVehiculo === "CAR" ? "carro" : "moto",
        tipoServicio: "mensajeria",
        estado:
          item.estado === "AVAILABLE"
            ? "libre"
            : item.estado === "BUSY"
              ? "ocupado"
              : "inactivo",
        pedidosActivos: item.pedidosActivos,
        pedidosHoy: item.pedidosHoy,
        zona: item.zona,
      })),
    );
  };

  useEffect(() => {
    loadDomiciliarios();
  }, []);

  const stats = {
    total: domiciliarios.length,
    libres: domiciliarios.filter((d) => d.estado === "libre").length,
    ocupados: domiciliarios.filter((d) => d.estado === "ocupado").length,
    inactivos: domiciliarios.filter((d) => d.estado === "inactivo").length,
  };

  const filteredDomiciliarios = domiciliarios.filter(
    (d) =>
      d.nombre.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterEstado === "all" || d.estado === filterEstado),
  );

  const handleOpenDialog = (d?: Domiciliario) => {
    if (d) {
      setEditingDomiciliario(d);
      setFormData({
        nombre: d.nombre,
        telefono: d.telefono,
        email: d.email,
        password: "",
        placa: d.placa,
        tipoVehiculo: d.tipoVehiculo,
        tipoServicio: d.tipoServicio,
        zona: d.zona || "",
      });
    } else {
      setEditingDomiciliario(null);
      setFormData({
        nombre: "",
        telefono: "",
        email: "",
        password: "",
        placa: "",
        tipoVehiculo: "moto",
        tipoServicio: "mensajeria",
        zona: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    const payload: any = {
      name: formData.nombre,
      phone: formData.telefono,
      email: formData.email,
      vehicleType:
        formData.tipoVehiculo === "carro"
          ? "CAR"
          : formData.tipoVehiculo === "moto"
            ? "MOTORBIKE"
            : "BICYCLE",
      vehiclePlate: formData.placa,
      serviceType: "DOMICILIARIO",
      zone: formData.zona.toUpperCase().replace(/ /g, "_"),
    };

    // 👇 SOLO al crear
    if (!editingDomiciliario && formData.password) {
      payload.temporaryPassword = formData.password;
    }

    if (editingDomiciliario) {
      await api.put(`/admin/delivery/${editingDomiciliario.id}`, payload);
    } else {
      await api.post("/admin/delivery", payload);
    }

    setIsDialogOpen(false);
    await loadDomiciliarios();
  };

  const handleToggleEstado = async (id: string) => {
    const d = domiciliarios.find((x) => x.id === id);
    if (!d) return;

    await api.patch(
      `/admin/delivery/${id}/${d.estado === "inactivo" ? "activate" : "suspend"}`,
    );
    await loadDomiciliarios();
  };

  const handleDelete = async (id: string) => {
    await api.patch(`/admin/delivery/${id}/delete`);
    await loadDomiciliarios();
  };

  /* ================= JSX ORIGINAL (NO TOCADO) ================= */

  //===================================================================

  return (
    <div className="space-y-6">
      <PageHeader
        title="Domiciliarios"
        description="Gestiona el equipo de repartidores"
        icon={Truck}
        actions={
          <Button variant="hero" onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Domiciliario
          </Button>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-card border border-border"
        >
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-display font-bold number-display">
            {stats.total}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-success/5 border border-success/20"
        >
          <p className="text-sm text-success">Libres</p>
          <p className="text-2xl font-display font-bold number-display text-success">
            {stats.libres}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-xl bg-accent/5 border border-accent/20"
        >
          <p className="text-sm text-accent">Ocupados</p>
          <p className="text-2xl font-display font-bold number-display text-accent">
            {stats.ocupados}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-xl bg-muted border border-border"
        >
          <p className="text-sm text-muted-foreground">Inactivos</p>
          <p className="text-2xl font-display font-bold number-display">
            {stats.inactivos}
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar domiciliarios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={filterEstado}
          onValueChange={(v) =>
            setFilterEstado(v as EstadoDomiciliario | "all")
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="libre">Libres</SelectItem>
            <SelectItem value="ocupado">Ocupados</SelectItem>
            <SelectItem value="inactivo">Inactivos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Domiciliarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDomiciliarios.map((domiciliario, index) => {
          const TipoIcon = tipoServicioIcons[domiciliario.tipoServicio];

          return (
            <motion.div
              key={domiciliario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "bg-card border rounded-xl overflow-hidden transition-all",
                domiciliario.estado === "ocupado" && "border-accent/30",
                domiciliario.estado === "libre" && "border-success/30",
                domiciliario.estado === "inactivo" &&
                  "border-border opacity-70",
              )}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center",
                        domiciliario.estado === "libre" && "bg-success/10",
                        domiciliario.estado === "ocupado" && "bg-accent/10",
                        domiciliario.estado === "inactivo" && "bg-muted",
                      )}
                    >
                      <User
                        className={cn(
                          "w-6 h-6",
                          domiciliario.estado === "libre" && "text-success",
                          domiciliario.estado === "ocupado" && "text-accent",
                          domiciliario.estado === "inactivo" &&
                            "text-muted-foreground",
                        )}
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">
                        {domiciliario.nombre}
                      </h3>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{domiciliario.telefono}</span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleOpenDialog(domiciliario)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleToggleEstado(domiciliario.id)}
                      >
                        <Power className="w-4 h-4 mr-2" />
                        {domiciliario.estado === "inactivo"
                          ? "Activar"
                          : "Desactivar"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(domiciliario.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TipoIcon className="w-4 h-4 text-emphasis" />
                      <span className="text-sm">
                        {tipoServicioLabels[domiciliario.tipoServicio]}
                      </span>
                    </div>
                    {domiciliario.zona && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {domiciliario.zona}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Activos</p>
                        <p className="font-display font-semibold number-display">
                          {domiciliario.pedidosActivos}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Hoy</p>
                        <p className="font-display font-semibold number-display">
                          {domiciliario.pedidosHoy}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium",
                        estadoConfig[domiciliario.estado].color,
                      )}
                    >
                      {estadoConfig[domiciliario.estado].label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Active indicator */}
              {domiciliario.estado === "ocupado" &&
                domiciliario.pedidosActivos > 0 && (
                  <div className="h-1 bg-gradient-to-r from-accent to-emphasis animate-pulse" />
                )}
            </motion.div>
          );
        })}
      </div>

      {filteredDomiciliarios.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No se encontraron domiciliarios
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingDomiciliario
                ? "Editar Domiciliario"
                : "Nuevo Domiciliario"}
            </DialogTitle>
            <DialogDescription>
              {editingDomiciliario
                ? "Modifica la información del domiciliario"
                : "Registra un nuevo domiciliario en el sistema"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre Completo</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Nombre del domiciliario"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) =>
                    setFormData({ ...formData, telefono: e.target.value })
                  }
                  placeholder="Número de contacto"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="correo@ejemplo.com"
                />
              </div>
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
                  editingDomiciliario
                    ? "Dejar vacío para no cambiar"
                    : "Contraseña inicial"
                }
              />
              <p className="text-xs text-muted-foreground">
                El domiciliario podrá cambiar esta contraseña en su primer
                acceso
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="placa">Placa del Vehículo</Label>
                <Input
                  id="placa"
                  value={formData.placa}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      placa: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="ABC123"
                  className="uppercase"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tipoVehiculo">Tipo de Vehículo</Label>
                <Select
                  value={formData.tipoVehiculo}
                  onValueChange={(v) =>
                    setFormData({
                      ...formData,
                      tipoVehiculo: v as TipoVehiculo,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moto">Motocicleta</SelectItem>
                    <SelectItem value="carro">Carro</SelectItem>
                    <SelectItem value="bicicleta">Bicicleta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tipoServicio">Tipo de Servicio</Label>
              <Select
                value={formData.tipoServicio}
                onValueChange={(v) =>
                  setFormData({ ...formData, tipoServicio: v as TipoServicio })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensajeria">Mensajería</SelectItem>
                  <SelectItem value="motocarguero">Motocarguero</SelectItem>
                  <SelectItem value="ambos">Ambos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="zona">Zona de Cobertura</Label>
              <Select
                value={formData.zona}
                onValueChange={(v) => setFormData({ ...formData, zona: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una zona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Marinilla">Marinilla</SelectItem>
                  <SelectItem value="Rionegro">Rionegro</SelectItem>
                  <SelectItem value="El Santuario">El Santuario</SelectItem>
                  <SelectItem value="Guarne">Guarne</SelectItem>
                  <SelectItem value="La Ceja">La Ceja</SelectItem>
                  <SelectItem value="El Retiro">El Retiro</SelectItem>
                  <SelectItem value="El Carmen de Viboral">
                    El Carmen de Viboral
                  </SelectItem>
                  <SelectItem value="San Vicente">San Vicente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="hero" onClick={handleSave}>
              {editingDomiciliario ? "Guardar Cambios" : "Registrar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DomiciliariosPage;
