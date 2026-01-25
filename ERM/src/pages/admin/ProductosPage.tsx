import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Power,
  Trash2,
  DollarSign,
  AlertCircle,
  Store,
  ShoppingCart
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
import { cn } from "@/lib/utils";

type TipoPropietario = "negocio" | "tienda";

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  tipoPropietario: TipoPropietario;
  propietarioId: string;
  propietarioNombre: string;
  costPrice: number;
  price: number;
  estado: "active" | "inactive";
  imagen?: string;
}

// Mock data - preparado para integración backend
const mockProductos: Producto[] = [
  {
    id: "1",
    nombre: "Hamburguesa Clásica",
    descripcion: "Carne de res 150g, lechuga, tomate, cebolla y salsas",
    tipoPropietario: "negocio",
    propietarioId: "1",
    propietarioNombre: "Burger House",
    costPrice: 12000,
    price: 22000,
    estado: "active",
  },
  {
    id: "2",
    nombre: "Pizza Pepperoni",
    descripcion: "Pizza mediana con pepperoni, queso mozzarella y salsa de tomate",
    tipoPropietario: "negocio",
    propietarioId: "2",
    propietarioNombre: "Pizza Express",
    costPrice: 18000,
    price: 35000,
    estado: "active",
  },
  {
    id: "3",
    nombre: "Hamburguesa Doble",
    descripcion: "Doble carne 300g, doble queso, tocino, lechuga y salsas especiales",
    tipoPropietario: "negocio",
    propietarioId: "1",
    propietarioNombre: "Burger House",
    costPrice: 18000,
    price: 32000,
    estado: "active",
  },
  {
    id: "4",
    nombre: "Arroz Diana 1kg",
    descripcion: "Arroz blanco premium para el hogar",
    tipoPropietario: "tienda",
    propietarioId: "t1",
    propietarioNombre: "Supermercado El Ahorro",
    costPrice: 3500,
    price: 4500,
    estado: "active",
  },
  {
    id: "5",
    nombre: "Acetaminofén 500mg",
    descripcion: "Caja x 20 tabletas para el dolor",
    tipoPropietario: "tienda",
    propietarioId: "t2",
    propietarioNombre: "Farmacia Salud Total",
    costPrice: 6000,
    price: 8500,
    estado: "active",
  },
];

const mockNegocios = [
  { id: "1", nombre: "Burger House" },
  { id: "2", nombre: "Pizza Express" },
  { id: "3", nombre: "Sushi Master" },
];

const mockTiendas = [
  { id: "t1", nombre: "Supermercado El Ahorro" },
  { id: "t2", nombre: "Farmacia Salud Total" },
  { id: "t3", nombre: "Tienda Don José" },
  { id: "t4", nombre: "Licorería El Barril" },
];

const ProductosPage = () => {
  const [productos, setProductos] = useState<Producto[]>(mockProductos);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterNegocio, setFilterNegocio] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    tipoPropietario: "negocio" as TipoPropietario,
    propietarioId: "",
    costPrice: "",
    price: "",
  });

  const filteredProductos = productos.filter((p) => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNegocio = filterNegocio === "all" || p.propietarioId === filterNegocio;
    return matchesSearch && matchesNegocio;
  });

  const handleOpenDialog = (producto?: Producto) => {
    if (producto) {
      setEditingProducto(producto);
      setFormData({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        tipoPropietario: producto.tipoPropietario,
        propietarioId: producto.propietarioId,
        costPrice: producto.costPrice.toString(),
        price: producto.price.toString(),
      });
    } else {
      setEditingProducto(null);
      setFormData({
        nombre: "",
        descripcion: "",
        tipoPropietario: "negocio",
        propietarioId: "",
        costPrice: "",
        price: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const propietarioList = formData.tipoPropietario === "negocio" ? mockNegocios : mockTiendas;
    const propietario = propietarioList.find(p => p.id === formData.propietarioId);
    if (editingProducto) {
      setProductos(productos.map(p =>
        p.id === editingProducto.id
          ? { 
              ...p, 
              nombre: formData.nombre,
              descripcion: formData.descripcion,
              tipoPropietario: formData.tipoPropietario,
              propietarioId: formData.propietarioId,
              propietarioNombre: propietario?.nombre || "",
              costPrice: parseFloat(formData.costPrice) || 0,
              price: parseFloat(formData.price) || 0,
            }
          : p
      ));
    } else {
      const newProducto: Producto = {
        id: Date.now().toString(),
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        tipoPropietario: formData.tipoPropietario,
        propietarioId: formData.propietarioId,
        propietarioNombre: propietario?.nombre || "",
        costPrice: parseFloat(formData.costPrice) || 0,
        price: parseFloat(formData.price) || 0,
        estado: "active",
      };
      setProductos([...productos, newProducto]);
    }
    setIsDialogOpen(false);
  };

  const handleToggleEstado = (id: string) => {
    setProductos(productos.map(p =>
      p.id === id
        ? { ...p, estado: p.estado === "active" ? "inactive" : "active" }
        : p
    ));
  };

  const handleDelete = (id: string) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  const calcularMargen = (cost: number, price: number) => {
    if (price === 0) return 0;
    return ((price - cost) / price * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Productos"
        description="Gestiona los productos de todos los negocios"
        icon={Package}
        actions={
          <Button variant="hero" onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Producto
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterNegocio} onValueChange={setFilterNegocio}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <Store className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar propietario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">— Negocios —</div>
            {mockNegocios.map(n => (
              <SelectItem key={n.id} value={n.id}>{n.nombre}</SelectItem>
            ))}
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">— Tiendas —</div>
            {mockTiendas.map(t => (
              <SelectItem key={t.id} value={t.id}>{t.nombre}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Productos Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="text-left p-4 font-semibold">Producto</th>
                <th className="text-left p-4 font-semibold">Tipo</th>
                <th className="text-left p-4 font-semibold">Propietario</th>
                <th className="text-right p-4 font-semibold">Costo</th>
                <th className="text-right p-4 font-semibold">Precio</th>
                <th className="text-right p-4 font-semibold">Margen</th>
                <th className="text-center p-4 font-semibold">Estado</th>
                <th className="text-right p-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto, index) => {
                const margen = parseFloat(calcularMargen(producto.costPrice, producto.price) || "0");
                const margenBajo = margen < 30;

                return (
                  <motion.tr
                    key={producto.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-muted/20 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{producto.nombre}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {producto.descripcion}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium",
                        producto.tipoPropietario === "negocio" 
                          ? "bg-blue-500/10 text-blue-400" 
                          : "bg-purple-500/10 text-purple-400"
                      )}>
                        {producto.tipoPropietario === "negocio" ? (
                          <><Store className="w-3 h-3" /> Negocio</>
                        ) : (
                          <><ShoppingCart className="w-3 h-3" /> Tienda</>
                        )}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">
                        {producto.propietarioNombre}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-sm text-muted-foreground">
                        ${producto.costPrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-display font-semibold number-display">
                        ${producto.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {margenBajo && (
                          <AlertCircle className="w-4 h-4 text-emphasis" />
                        )}
                        <span className={cn(
                          "font-mono text-sm font-medium",
                          margenBajo ? "text-emphasis" : "text-success"
                        )}>
                          {margen}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <StatusBadge status={producto.estado} />
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenDialog(producto)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleEstado(producto.id)}>
                            <Power className="w-4 h-4 mr-2" />
                            {producto.estado === "active" ? "Desactivar" : "Activar"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(producto.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProductos.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No se encontraron productos
        </div>
      )}

      {/* Margin Warning */}
      <div className="p-4 rounded-xl bg-emphasis/5 border border-emphasis/20 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-emphasis shrink-0" />
        <p className="text-sm text-muted-foreground">
          <span className="text-emphasis font-medium">Nota:</span> Los productos con margen menor al 30% están marcados con advertencia visual. 
          El cálculo de precios finales se realizará en el backend.
        </p>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingProducto ? "Editar Producto" : "Nuevo Producto"}
            </DialogTitle>
            <DialogDescription>
              {editingProducto
                ? "Modifica la información del producto"
                : "Completa la información para agregar un nuevo producto"
              }
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Tipo de Propietario */}
            <div className="grid gap-2">
              <Label>Asignar producto a</Label>
              <Select
                value={formData.tipoPropietario}
                onValueChange={(v) => setFormData({ ...formData, tipoPropietario: v as TipoPropietario, propietarioId: "" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="negocio">
                    <span className="flex items-center gap-2">
                      <Store className="w-4 h-4" /> Negocio
                    </span>
                  </SelectItem>
                  <SelectItem value="tienda">
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" /> Tienda
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Selección de Propietario */}
            <div className="grid gap-2">
              <Label>{formData.tipoPropietario === "negocio" ? "Negocio" : "Tienda"}</Label>
              <Select
                value={formData.propietarioId}
                onValueChange={(v) => setFormData({ ...formData, propietarioId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Selecciona ${formData.tipoPropietario === "negocio" ? "un negocio" : "una tienda"}`} />
                </SelectTrigger>
                <SelectContent>
                  {formData.tipoPropietario === "negocio" 
                    ? mockNegocios.map(n => (
                        <SelectItem key={n.id} value={n.id}>{n.nombre}</SelectItem>
                      ))
                    : mockTiendas.map(t => (
                        <SelectItem key={t.id} value={t.id}>{t.nombre}</SelectItem>
                      ))
                  }
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre del Producto</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej: Hamburguesa Clásica"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                placeholder="Descripción del producto"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="costPrice" className="flex items-center gap-2">
                  Costo
                  <span className="text-xs text-muted-foreground font-normal">(interno)</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="costPrice"
                    type="number"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                    placeholder="0"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price" className="flex items-center gap-2">
                  Precio
                  <span className="text-xs text-muted-foreground font-normal">(cliente)</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emphasis" />
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0"
                    className="pl-10 border-emphasis/30 focus:border-emphasis"
                  />
                </div>
              </div>
            </div>

            {/* Visual margin indicator */}
          {formData.costPrice && formData.price && (
              <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Margen estimado:</span>
                <span className={cn(
                  "font-display font-semibold",
                  parseFloat(calcularMargen(
                    parseFloat(formData.costPrice || "0"),
                    parseFloat(formData.price || "0")
                  ) || "0") < 30 ? "text-emphasis" : "text-success"
                )}>
                  {calcularMargen(
                    parseFloat(formData.costPrice) || 0,
                    parseFloat(formData.price) || 0
                  )}%
                </span>
              </div>
            )}

            {/* Image Upload Placeholder */}
            <div className="grid gap-2">
              <Label>Imagen del Producto</Label>
              <div className="h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground text-sm hover:border-emphasis/50 hover:text-emphasis transition-colors cursor-pointer">
                Click para subir imagen
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="hero" onClick={handleSave}>
              {editingProducto ? "Guardar Cambios" : "Crear Producto"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductosPage;
