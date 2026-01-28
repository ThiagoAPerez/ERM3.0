import { useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

/* =====================  TYPES  ===================== */
//==========================================================

type VehicleType = "MOTORBIKE" | "BICYCLE" | "CAR" | "MOTOCARGO";

type ServiceType =
  | "MOTOCARGUERO"
  | "PARTICULAR"
  | "DOMICILIARIO"
  | "MENSAJERIA";

type DeliveryZone = "MARINILLA" | "RIONEGRO" | "EL_CAARMEN" | "NOASIGNADO";
type DeliveryStatus =
  | "OFFLINE"
  | "AVAILABLE"
  | "BUSY"
  | "SUSPENDED"
  | "DELETED";

/* =====================  INTERFACES  ===================== */
//==========================================================

interface Domiciliario {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  password?: string;
  placa: string;
  tipoVehiculo: VehicleType;
  tipoServicio: ServiceType;
  estado: DeliveryStatus;
  pedidosActivos: number;
  pedidosHoy: number;
  zona?: DeliveryZone;
}

/* =====================  ICON / LABELS  ===================== */
//==========================================================

const tipoVehiculoLabels: Record<VehicleType, string> = {
  MOTORBIKE: "Motocicleta",
  CAR: "Carro",
  BICYCLE: "Bicicleta",
  MOTOCARGO: "Motocargo",
};

const tipoServicioLabels: Record<ServiceType, string> = {
  MENSAJERIA: "Mensajería",
  MOTOCARGUERO: "Motocarguero",
  PARTICULAR: "Particular",
  DOMICILIARIO: "Domiciliario",
};

const tipoServicioIcons: Record<ServiceType, React.ElementType> = {
  MENSAJERIA: Bike,
  MOTOCARGUERO: Truck,
  PARTICULAR: User,
  DOMICILIARIO: Package,
};

/* =====================  DELIVERY STATUS  ===================== */
//==========================================================

const estadoConfig: Record<DeliveryStatus, { label: string; color: string }> = {
  AVAILABLE: {
    label: "Disponible",
    color: "bg-success/10 text-success",
  },
  BUSY: {
    label: "Ocupado",
    color: "bg-accent/10 text-accent",
  },
  OFFLINE: {
    label: "Offline",
    color: "bg-muted text-muted-foreground",
  },
  SUSPENDED: {
    label: "Suspendido",
    color: "bg-destructive/10 text-destructive",
  },
  DELETED: {
    label: "Eliminado",
    color: "bg-muted text-muted-foreground",
  },
};

/* =====================  DOMICILIARIOS PAGE  ===================== */
//================================================================

const DomiciliariosPage = () => {
  const [domiciliarios, setDomiciliarios] = useState<Domiciliario[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [filterEstado, setFilterEstado] = useState<DeliveryStatus | "all">(
    "all",
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [editingDomiciliario, setEditingDomiciliario] =
    useState<Domiciliario | null>(null);

  // =============================================
  //==================== FORMADATA ===============

  const [formData, setFormData] = useState<{
    nombre: string;
    telefono: string;
    email: string;
    password: string;
    placa: string;
    tipoVehiculo: VehicleType;
    tipoServicio: ServiceType;
    zona: DeliveryZone | "";
  }>({
    nombre: "",
    telefono: "",
    email: "",
    password: "",
    placa: "",
    tipoVehiculo: "MOTORBIKE",
    tipoServicio: "MENSAJERIA",
    zona: "",
  });

  /* =====================  FILTRAR DOMICILIARIO ESTADOS  ===================== */
  //===========================================================================

  const filteredDomiciliarios = domiciliarios.filter((d) => {
    const matchesSearch = d.nombre
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesEstado = filterEstado === "all" || d.estado === filterEstado;

    return matchesSearch && matchesEstado;
  });

  const stats = {
    total: domiciliarios.length,
    disponibles: domiciliarios.filter((d) => d.estado === "AVAILABLE").length,
    ocupados: domiciliarios.filter((d) => d.estado === "BUSY").length,
    offline: domiciliarios.filter((d) => d.estado === "OFFLINE").length,
    suspendidos: domiciliarios.filter((d) => d.estado === "SUSPENDED").length,
  };

  //============================================================
  // ===================   MAPEARLO =============================

  const loadDomiciliarios = async () => {
    const res = await api.get("/admin/delivery");

    const mapped: Domiciliario[] = res.data.data.map((d: any) => ({
      id: String(d.id),
      nombre: d.nombre,
      telefono: d.telefono,
      email: d.email,
      placa: d.placa,
      tipoVehiculo: d.tipoVehiculo,
      tipoServicio: d.tipoServicio,
      estado: d.estado,
      pedidosActivos: d.pedidosActivos,
      pedidosHoy: d.pedidosHoy,
      zona: d.zona,
    }));

    setDomiciliarios(mapped);
  };

  useEffect(() => {
    loadDomiciliarios();
  }, []);

  /* =====================  FILTRAR DOMICILIARIO ESTADOS  ===================== */
  //===========================================================================

  const handleOpenDialog = (domiciliario?: Domiciliario) => {
    if (domiciliario) {
      setEditingDomiciliario(domiciliario);
      setFormData({
        nombre: domiciliario.nombre,
        telefono: domiciliario.telefono,
        email: domiciliario.email,
        password: "",
        placa: domiciliario.placa,
        tipoVehiculo: domiciliario.tipoVehiculo,
        tipoServicio: domiciliario.tipoServicio,
        zona: domiciliario.zona || "",
      });
    } else {
      setEditingDomiciliario(null);
      setFormData({
        nombre: "",
        telefono: "",
        email: "",
        password: "",
        placa: "",
        tipoVehiculo: "MOTORBIKE",
        tipoServicio: "MENSAJERIA",
        zona: "",
      });
    }
    setIsDialogOpen(true);
  };

  /* =====================  FILTRAR DOMICILIARIO ESTADOS  ===================== */
  //===========================================================================

  const handleSave = async () => {
    try {
      // ⛔ regla: password obligatorio SOLO al crear
      if (!editingDomiciliario && !formData.password.trim()) {
        console.error("Password is required for new delivery");
        return;
      }

      if (editingDomiciliario) {
        await api.put(`/admin/delivery/${editingDomiciliario.id}`, {
          vehicleType: formData.tipoVehiculo,
          vehiclePlate: formData.placa,
          serviceType: formData.tipoServicio,
          zone: formData.zona || null,
        });
      } else {
        await api.post("/admin/delivery", {
          name: formData.nombre,
          phone: formData.telefono,
          email: formData.email,
          temporaryPassword: formData.password, // ✔️ nunca ""
          vehicleType: formData.tipoVehiculo,
          vehiclePlate: formData.placa,
          serviceType: formData.tipoServicio,
          zone: formData.zona || null,
        });
      }

      await loadDomiciliarios();
      setIsDialogOpen(false);
      setEditingDomiciliario(null);
    } catch (err) {
      console.error("ERROR SAVE DELIVERY", err);
    }
  };

  /* =====================  FILTRAR DOMICILIARIO ESTADOS  ===================== */
  //===========================================================================

  const handleToggleEstado = async (d: Domiciliario) => {
    try {
      if (d.estado === "SUSPENDED") {
        await api.patch(`/admin/delivery/${d.id}/activate`);
      } else {
        await api.patch(`/admin/delivery/${d.id}/suspend`);
      }

      await loadDomiciliarios();
    } catch (err) {
      console.error("ERROR TOGGLE DELIVERY STATUS", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.patch(`/admin/delivery/${id}/delete`);
      await loadDomiciliarios();
    } catch (err) {
      console.error("ERROR DELETE DELIVERY", err);
    }
  };

  /* =====================  UI  ===================== */
  //===========================================================================

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
            {stats.disponibles}
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
            {stats.offline}
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
          onValueChange={(v) => setFilterEstado(v as DeliveryStatus | "all")}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="AVAILABLE">Libres</SelectItem>
            <SelectItem value="BUSY">Ocupados</SelectItem>
            <SelectItem value="OFFLINE">Inactivos</SelectItem>
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
                domiciliario.estado === "BUSY" && "border-accent/30",
                domiciliario.estado === "AVAILABLE" && "border-success/30",
                domiciliario.estado === "OFFLINE" && "border-border opacity-70",
                domiciliario.estado === "SUSPENDED" &&
                  "border-destructive/30 opacity-70",
              )}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center",
                        domiciliario.estado === "AVAILABLE" && "bg-success/10",
                        domiciliario.estado === "BUSY" && "bg-accent/10",
                        domiciliario.estado === "OFFLINE" && "bg-muted",
                        domiciliario.estado === "SUSPENDED" &&
                          "bg-destructive/10",
                      )}
                    >
                      <User
                        className={cn(
                          "w-6 h-6",
                          domiciliario.estado === "AVAILABLE" && "text-success",
                          domiciliario.estado === "BUSY" && "text-accent",
                          domiciliario.estado === "OFFLINE" &&
                            "text-muted-foreground",
                          domiciliario.estado === "SUSPENDED" &&
                            "text-destructive",
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
                        onClick={() => handleToggleEstado(domiciliario)}
                      >
                        <Power className="w-4 h-4 mr-2" />
                        {domiciliario.estado === "OFFLINE"
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
              {domiciliario.estado === "BUSY" &&
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
                  placeholder="ABC12E"
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
                      tipoVehiculo: v as VehicleType,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MOTORBIKE">Motocicleta</SelectItem>
                    <SelectItem value="CAR">Carro</SelectItem>
                    <SelectItem value="BICYCLE">Bicicleta</SelectItem>
                    <SelectItem value="MOTOCARGO">Motocarguero</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tipoServicio">Tipo de Servicio</Label>
              <Select
                value={formData.tipoServicio}
                onValueChange={(v) =>
                  setFormData({ ...formData, tipoServicio: v as ServiceType })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DOMICILIARIO">Domiciliario</SelectItem>
                  <SelectItem value="MENSAJERIA">Mensajeria</SelectItem>
                  <SelectItem value="MOTOCARGUERO">Motocarguero</SelectItem>
                  <SelectItem value="PARTICULAR">Particular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="zona">Zona de Cobertura</Label>
              <Select
                value={formData.zona}
                onValueChange={(v) =>
                  setFormData({ ...formData, zona: v as DeliveryZone })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una zona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MARINILLA">Marinilla</SelectItem>
                  <SelectItem value="RIONEGRO">Rionegro</SelectItem>
                  <SelectItem value="EL_CAARMEN">
                    El Carmen de Viboral
                  </SelectItem>
                  <SelectItem value="NOASIGNADO">NOASIGNADO</SelectItem>
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
