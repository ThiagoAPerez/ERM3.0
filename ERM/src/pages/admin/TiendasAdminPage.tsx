import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Power,
  Trash2,
  MapPin,
  Phone,
  Package,
  Eye,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CategoriaTienda = "supermercado" | "farmacia" | "tienda" | "licoreria" | "mascotas";

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  estado: "active" | "inactive";
}

interface Tienda {
  id: string;
  nombre: string;
  categoria: CategoriaTienda;
  direccion: string;
  municipio: string;
  telefono: string;
  estado: "active" | "inactive";
  descripcion?: string;
  logo?: string;
  imagenFondo?: string;
  productos: Producto[];
}

const mockTiendas: Tienda[] = [
  {
    id: "1",
    nombre: "Supermercado El Ahorro",
    categoria: "supermercado",
    direccion: "Cra 50 #45-12",
    municipio: "Marinilla",
    telefono: "3001234567",
    estado: "active",
    descripcion: "Todo lo que necesitas para tu hogar",
    productos: [
      {
        id: "p1",
        nombre: "Arroz Diana 1kg",
        descripcion: "Arroz blanco premium",
        precio: 4500,
        imagen: "🍚",
        estado: "active",
      },
      {
        id: "p2",
        nombre: "Aceite Girasol 1L",
        descripcion: "Aceite vegetal",
        precio: 12000,
        imagen: "🫒",
        estado: "active",
      },
      {
        id: "p3",
        nombre: "Leche Entera 1L",
        descripcion: "Leche fresca pasteurizada",
        precio: 4200,
        imagen: "🥛",
        estado: "active",
      },
    ],
  },
  {
    id: "2",
    nombre: "Farmacia Salud Total",
    categoria: "farmacia",
    direccion: "Calle 30 #20-15",
    municipio: "La Ceja",
    telefono: "3009876543",
    estado: "active",
    descripcion: "Tu salud es nuestra prioridad",
    productos: [
      {
        id: "p4",
        nombre: "Acetaminofén 500mg",
        descripcion: "Caja x 20 tabletas",
        precio: 8500,
        imagen: "💊",
        estado: "active",
      },
      {
        id: "p5",
        nombre: "Vitamina C 1000mg",
        descripcion: "Frasco x 30 tabletas",
        precio: 25000,
        imagen: "🍊",
        estado: "active",
      },
    ],
  },
  {
    id: "3",
    nombre: "Tienda Don José",
    categoria: "tienda",
    direccion: "Centro",
    municipio: "El Retiro",
    telefono: "3005551234",
    estado: "active",
    descripcion: "La tienda de siempre",
    productos: [
      {
        id: "p6",
        nombre: "Gaseosa 2L",
        descripcion: "Bebida refrescante",
        precio: 5500,
        imagen: "🥤",
        estado: "active",
      },
      {
        id: "p7",
        nombre: "Pan Tajado",
        descripcion: "Pan fresco del día",
        precio: 6800,
        imagen: "🍞",
        estado: "active",
      },
      { id: "p8", nombre: "Huevos x 30", descripcion: "Huevos frescos", precio: 18000, imagen: "🥚", estado: "active" },
    ],
  },
  {
    id: "4",
    nombre: "Licorería El Barril",
    categoria: "licoreria",
    direccion: "Parque Principal",
    municipio: "Rionegro",
    telefono: "3007778899",
    estado: "inactive",
    descripcion: "Los mejores licores nacionales e importados",
    productos: [
      {
        id: "p9",
        nombre: "Aguardiente 750ml",
        descripcion: "Aguardiente tradicional",
        precio: 35000,
        imagen: "🥃",
        estado: "active",
      },
      {
        id: "p10",
        nombre: "Cerveza x 6",
        descripcion: "Six pack cerveza nacional",
        precio: 22000,
        imagen: "🍺",
        estado: "active",
      },
    ],
  },
];

const categoriaLabels: Record<CategoriaTienda, string> = {
  supermercado: "Supermercado",
  farmacia: "Farmacia",
  tienda: "Tienda",
  licoreria: "Licorería",
  mascotas: "Mascotas",
};

const categoriaColors: Record<CategoriaTienda, string> = {
  supermercado: "bg-green-500/10 text-green-400",
  farmacia: "bg-blue-500/10 text-blue-400",
  tienda: "bg-purple-500/10 text-purple-400",
  licoreria: "bg-amber-500/10 text-amber-400",
  mascotas: "bg-pink-500/10 text-pink-400",
};

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

const TiendasAdminPage = () => {
  const [tiendas, setTiendas] = useState<Tienda[]>(mockTiendas);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategoria, setFilterCategoria] = useState<CategoriaTienda | "all">("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTienda, setEditingTienda] = useState<Tienda | null>(null);
  const [selectedTienda, setSelectedTienda] = useState<Tienda | null>(null);
  const [isProductsDialogOpen, setIsProductsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "tienda" as CategoriaTienda,
    direccion: "",
    municipio: "",
    telefono: "",
    descripcion: "",
    logo: "",
    imagenFondo: "",
  });

  const filteredTiendas = tiendas.filter((t) => {
    const matchesSearch = t.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategoria = filterCategoria === "all" || t.categoria === filterCategoria;
    return matchesSearch && matchesCategoria;
  });

  const handleOpenDialog = (tienda?: Tienda) => {
    if (tienda) {
      setEditingTienda(tienda);
      setFormData({
        nombre: tienda.nombre,
        categoria: tienda.categoria,
        direccion: tienda.direccion,
        municipio: tienda.municipio,
        telefono: tienda.telefono,
        descripcion: tienda.descripcion || "",
        logo: tienda.logo || "",
        imagenFondo: tienda.imagenFondo || "",
      });
    } else {
      setEditingTienda(null);
      setFormData({
        nombre: "",
        categoria: "tienda",
        direccion: "",
        municipio: "",
        telefono: "",
        descripcion: "",
        logo: "",
        imagenFondo: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingTienda) {
      setTiendas(tiendas.map((t) => (t.id === editingTienda.id ? { ...t, ...formData } : t)));
    } else {
      const newTienda: Tienda = {
        id: Date.now().toString(),
        ...formData,
        estado: "active",
        productos: [],
      };
      setTiendas([...tiendas, newTienda]);
    }
    setIsDialogOpen(false);
  };

  const handleToggleEstado = (id: string) => {
    setTiendas(tiendas.map((t) => (t.id === id ? { ...t, estado: t.estado === "active" ? "inactive" : "active" } : t)));
  };

  const handleDelete = (id: string) => {
    setTiendas(tiendas.filter((t) => t.id !== id));
  };

  const handleViewProducts = (tienda: Tienda) => {
    setSelectedTienda(tienda);
    setIsProductsDialogOpen(true);
  };

  const handleToggleProductEstado = (tiendaId: string, productoId: string) => {
    setTiendas(
      tiendas.map((t) => {
        if (t.id === tiendaId) {
          return {
            ...t,
            productos: t.productos.map((p) =>
              p.id === productoId ? { ...p, estado: p.estado === "active" ? "inactive" : "active" } : p,
            ),
          };
        }
        return t;
      }),
    );
    if (selectedTienda && selectedTienda.id === tiendaId) {
      setSelectedTienda({
        ...selectedTienda,
        productos: selectedTienda.productos.map((p) =>
          p.id === productoId ? { ...p, estado: p.estado === "active" ? "inactive" : "active" } : p,
        ),
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tiendas"
        description="Gestiona las tiendas y sus productos"
        icon={ShoppingCart}
        actions={
          <Button variant="hero" onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Tienda
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tiendas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategoria} onValueChange={(v) => setFilterCategoria(v as CategoriaTienda | "all")}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="supermercado">Supermercado</SelectItem>
            <SelectItem value="farmacia">Farmacia</SelectItem>
            <SelectItem value="tienda">Tienda</SelectItem>
            <SelectItem value="licoreria">Licorería</SelectItem>
            <SelectItem value="mascotas">Mascotas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tiendas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTiendas.map((tienda, index) => (
          <motion.div
            key={tienda.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-emphasis/30 transition-colors group"
          >
            {/* Card Header */}
            <div className="h-24 bg-gradient-to-br from-muted to-card relative">
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-end gap-3">
                <div className="w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center">
                  <ShoppingCart className="w-7 h-7 text-emphasis" />
                </div>
                <div className="pb-1">
                  <h3 className="font-display font-semibold text-lg">{tienda.nombre}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoriaColors[tienda.categoria]}`}>
                    {categoriaLabels[tienda.categoria]}
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
                  <DropdownMenuItem onClick={() => handleViewProducts(tienda)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Productos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleOpenDialog(tienda)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleToggleEstado(tienda.id)}>
                    <Power className="w-4 h-4 mr-2" />
                    {tienda.estado === "active" ? "Desactivar" : "Activar"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDelete(tienda.id)}
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
              {tienda.descripcion && <p className="text-sm text-muted-foreground line-clamp-2">{tienda.descripcion}</p>}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">
                    {tienda.direccion}, {tienda.municipio}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{tienda.telefono}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="w-4 h-4" />
                  <span>{tienda.productos.length} productos</span>
                </div>
              </div>
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <StatusBadge status={tienda.estado} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewProducts(tienda)}
                  className="text-emphasis hover:text-emphasis"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Ver productos
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTiendas.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">No se encontraron tiendas</div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingTienda ? "Editar Tienda" : "Nueva Tienda"}</DialogTitle>
            <DialogDescription>
              {editingTienda
                ? "Modifica la información de la tienda"
                : "Completa la información para registrar una nueva tienda"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Nombre de la tienda"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Select
                value={formData.categoria}
                onValueChange={(v) => setFormData({ ...formData, categoria: v as CategoriaTienda })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supermercado">Supermercado</SelectItem>
                  <SelectItem value="farmacia">Farmacia</SelectItem>
                  <SelectItem value="tienda">Tienda</SelectItem>
                  <SelectItem value="licoreria">Licorería</SelectItem>
                  <SelectItem value="mascotas">Mascotas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                placeholder="Dirección de la tienda"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="municipio">Municipio</Label>
              <Select value={formData.municipio} onValueChange={(v) => setFormData({ ...formData, municipio: v })}>
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
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                placeholder="Número de teléfono"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                placeholder="Descripción de la tienda"
                rows={3}
              />
            </div>

            {/* Logo Upload */}
            <div className="grid gap-2">
              <Label>Logo de la Tienda</Label>
              <div
                className="h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground text-sm hover:border-emphasis/50 hover:text-emphasis transition-colors cursor-pointer bg-muted/20"
                onClick={() => setFormData({ ...formData, logo: "logo-placeholder.png" })}
              >
                {formData.logo ? (
                  <div className="flex items-center gap-2 text-success">
                    <ShoppingCart className="w-6 h-6" />
                    <span>Logo cargado</span>
                  </div>
                ) : (
                  <>
                    <Plus className="w-6 h-6 mb-1" />
                    <span>Click para subir logo</span>
                  </>
                )}
              </div>
            </div>

            {/* Imagen de Fondo Upload */}
            <div className="grid gap-2">
              <Label>Imagen de Fondo / Cover</Label>
              <div
                className="h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground text-sm hover:border-emphasis/50 hover:text-emphasis transition-colors cursor-pointer bg-muted/20"
                onClick={() => setFormData({ ...formData, imagenFondo: "cover-placeholder.png" })}
              >
                {formData.imagenFondo ? (
                  <div className="flex items-center gap-2 text-success">
                    <MapPin className="w-6 h-6" />
                    <span>Imagen de fondo cargada</span>
                  </div>
                ) : (
                  <>
                    <Plus className="w-6 h-6 mb-1" />
                    <span>Click para subir imagen de fondo</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="hero" onClick={handleSave}>
              {editingTienda ? "Guardar Cambios" : "Crear Tienda"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Products Dialog */}
      <Dialog open={isProductsDialogOpen} onOpenChange={setIsProductsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emphasis" />
              {selectedTienda?.nombre}
            </DialogTitle>
            <DialogDescription>Productos disponibles en esta tienda</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {selectedTienda?.productos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Esta tienda no tiene productos registrados</div>
            ) : (
              selectedTienda?.productos.map((producto) => (
                <Card key={producto.id} className={producto.estado === "inactive" ? "opacity-50" : ""}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                      {producto.imagen}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{producto.nombre}</h4>
                        <Badge variant={producto.estado === "active" ? "default" : "secondary"}>
                          {producto.estado === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{producto.descripcion}</p>
                      <p className="text-lg font-display font-bold text-emphasis mt-1">
                        ${producto.precio.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => selectedTienda && handleToggleProductEstado(selectedTienda.id, producto.id)}
                      >
                        <Power className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProductsDialogOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TiendasAdminPage;
