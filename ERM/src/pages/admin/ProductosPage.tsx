import { useState, useEffect } from "react";
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
  ShoppingCart,
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
import { api } from "@/lib/api";

/* =====================  TYPES  ===================== */
//==========================================================

type ProviderType = "BUSINESS" | "STORE" | "SERVICE";

type ProviderCategory =
  | "BUSINESS"
  | "STORE"
  | "LICORERA"
  | "RESTAURANT"
  | "MEDICAMENT_STORE"
  | "OTHER"
  | "SERVICE";

type ProductCategory =
  | "FOOD"
  | "DRINK"
  | "ALCOHOL"
  | "MEDICINE"
  | "GROCERY"
  | "OTHER";

type ProductStatus = "ACTIVE" | "INACTIVE" | "DELETED";

/* =====================  INTERFACES  ===================== */
//==========================================================

interface Negocio {
  id: number;
  ownerUserId: number;
  name: string;
  phone: string;
  email: string;
  municipality: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  category:
    | "RESTAURANT"
    | "STORE"
    | "LICORERA"
    | "MEDICAMENT_STORE"
    | "SERVICE"
    | "OTHER";
}

interface Producto {
  id: string;
  nombre: string;
  description: string;
  providerType: ProviderType;
  providerId: string;
  providerCategory: ProviderCategory;
  category: ProductCategory;
  costPrice: number;
  saleprice: number;
  imageUrl: string;
  status: ProductStatus;
}

const providerColors: Record<ProviderType, string> = {
  BUSINESS: "bg-emphasis/10 text-emphasis",
  STORE: "bg-blue-500/10 text-blue-400",
  SERVICE: "bg-purple-500/10 text-purple-400",
};

/* =====================  CONSTANTS  ===================== */
//==========================================================
const ProductosPage = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [negocios, setNegocios] = useState<Negocio[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [filterCategory, setFilterCategory] = useState<ProductCategory | "all">(
    "all",
  );

  const [filterNegocio, setFilterNegocio] = useState<string | "all">("all");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);

  // =============================================
  //==================== FORMADATA ===============

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    providerType: "BUSINESS" as ProviderType,
    providerId: "", // ✅ string vacío
    providerCategory: "RESTAURANT" as ProviderCategory,
    category: "FOOD" as ProductCategory,
    costPrice: "",
    price: "",
    status: "ACTIVE" as ProductStatus,
  });

  // =============================================
  //==================== CARGAR NEGOCIOS ===============

  useEffect(() => {
    const loadNegocios = async () => {
      const res = await api.get<Negocio[]>("/admin/businesses");
      setNegocios(res.data);
    };

    loadNegocios();
  }, []);

  // =============================================
  //==================== LABLELS ===============

  const providerLabels: Record<ProviderType, string> = {
    BUSINESS: "Negocio",
    STORE: "Tienda",
    SERVICE: "Servicios",
  };

  const providerCategoryLabels: Record<ProviderCategory, string> = {
    BUSINESS: "Negocio",
    STORE: "Tienda",
    LICORERA: "Licorera",
    RESTAURANT: "Restaurante",
    MEDICAMENT_STORE: "Farmacia",
    SERVICE: "Servicios",
    OTHER: "Otros",
  };

  //============================================================
  // =================== CALCULAR GANANCIA =====================

  const calcularMargen = (cost: number, price: number) => {
    if (price === 0) return 0;
    return (((price - cost) / price) * 100).toFixed(1);
  };

  //============================================================
  // ===================   MAPEARLO =============================

  const mapBackendToProducto = (p: any): Producto => ({
    id: p.id,
    nombre: p.name,
    description: p.description,
    providerType: p.providerType,
    providerId: String(p.providerId),
    providerCategory: p.providerCategory,
    category: p.category,
    costPrice: p.costPrice,
    saleprice: p.salePrice,
    imageUrl: p.imageUrl,
    status: p.status,
  });

  //============================================================
  // ===================      LOAD =============================

  const loadProducts = async () => {
    const res = await api.get<Producto[]>("/admin/products");
    setProductos(res.data.map(mapBackendToProducto));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  //============================================================
  // =================== FILTRAR ================================

  const filteredProductos = productos.filter((p) => {
    const matchesSearch = p.nombre
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || p.category === filterCategory;

    const matchesNegocio =
      filterNegocio === "all" || p.providerId === filterNegocio;

    return matchesSearch && matchesCategory && matchesNegocio;
  });

  //============================================================
  // =================== GUARDAR ================================

  const handleSave = async () => {
    try {
      if (editingProducto) {
        await handleUpdate();
        return;
      }

      if (!formData.nombre || !formData.providerId) {
        throw new Error("Campos obligatorios faltantes");
      }

      const payload = {
        providerType: formData.providerType,
        providerId: Number(formData.providerId),
        providerCategory: formData.providerCategory, // 👈 BusinessesCategory

        category: formData.category, // ProductCategory
        name: formData.nombre,
        description: formData.descripcion,

        costPrice: parseFloat(formData.costPrice),
        salePrice: parseFloat(formData.price),

        imageUrl: null,
      };

      await api.post("/admin/products", payload);

      await loadProducts();
      setIsDialogOpen(false);
    } catch (err: any) {
      console.error("ERROR CREATE PRODUCT", err.response?.data || err);
    }
  };

  //============================================================
  // =================== DIALOG ================================

  const handleOpenDialog = (producto?: Producto) => {
    if (producto) {
      setEditingProducto(producto);
      setFormData({
        nombre: producto.nombre,
        descripcion: producto.description,

        providerType: producto.providerType, // ✅ ESTA ES LA CLAVE
        providerId: "",
        providerCategory: producto.providerCategory,

        costPrice: producto.costPrice.toString(),
        price: producto.saleprice.toString(),
        category: producto.category,
        status: producto.status,
      });
    } else {
      setEditingProducto(null);
      setFormData({
        nombre: "",
        descripcion: "",
        providerType: "BUSINESS" as ProviderType,
        providerId: "",
        costPrice: "",
        price: "",
        category: "FOOD" as ProductCategory,
        status: "ACTIVE" as ProductStatus,
        providerCategory: "RESTAURANT" as ProviderCategory,
      });
    }
    setIsDialogOpen(true);
  };

  //============================================================
  // ===================  UPDATE ================================

  const handleUpdate = async () => {
    if (!editingProducto) return;

    try {
      const payload = {
        providerType: formData.providerType,
        providerId: Number(formData.providerId),
        providerCategory: formData.providerCategory, // 👈 BusinessesCategory

        category: formData.category, // ProductCategory
        name: formData.nombre,
        description: formData.descripcion,

        costPrice: parseFloat(formData.costPrice),
        salePrice: parseFloat(formData.price),

        imageUrl: null,
      };

      await api.put(`/admin/products/${editingProducto.id}`, payload);

      await loadProducts();
      setIsDialogOpen(false);
      setEditingProducto(null);
    } catch (err: any) {
      console.error("ERROR UPDATE PODUCTO", err.response?.data || err);
    }
  };

  //============================================================
  // =================== ESTADOS ================================

  const handleToggleEstado = async (p: Producto) => {
    try {
      if (p.status === "ACTIVE") {
        await api.patch(`/admin/products/${p.id}/deactivate`);
      } else {
        await api.patch(`/admin/products/${p.id}/activate`);
      }

      await loadProducts();
    } catch (err: any) {
      console.error("ERROR TOGGLE STATUS", err.response?.data || err);
    }
  };

  //============================================================
  // =================== ELIMINAR/EVENT ================================

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/admin/products/${id}`);
      await loadProducts();
    } catch (err: any) {
      console.error("ERROR DELETED PRODUCT", err.response?.data || err);
    }
  };

  //============================================================
  // =================== UI ================================

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
            <SelectValue placeholder="Filtrar negocio" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>

            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              — Negocios —
            </div>

            {negocios.map((n) => (
              <SelectItem key={n.id} value={String(n.id)}>
                {n.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      admin/ne
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
                const margen = parseFloat(
                  calcularMargen(producto.costPrice, producto.saleprice) || "0",
                );
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
                            {producto.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium",
                          producto.providerType
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-purple-500/10 text-purple-400",
                        )}
                      >
                        {providerLabels[producto.providerType]}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">
                        {providerCategoryLabels[producto.providerCategory]}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-sm text-muted-foreground">
                        ${producto.costPrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-display font-semibold number-display">
                        ${producto.saleprice.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {margenBajo && (
                          <AlertCircle className="w-4 h-4 text-emphasis" />
                        )}
                        <span
                          className={cn(
                            "font-mono text-sm font-medium",
                            margenBajo ? "text-emphasis" : "text-success",
                          )}
                        >
                          {margen}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <StatusBadge status={producto.status} />
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleOpenDialog(producto)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleEstado(producto)}
                          >
                            <Power className="w-4 h-4 mr-2" />
                            {producto.status ? "Desactivar" : "Activar"}
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
          <span className="text-emphasis font-medium">Nota:</span> Los productos
          con margen menor al 30% están marcados con advertencia visual. El
          cálculo de precios finales se realizará en el backend.
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
                : "Completa la información para agregar un nuevo producto"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Tipo de Propietario */}
            <div className="grid gap-2">
              <Label>Asignar producto a</Label>
              <Select
                value={formData.providerType}
                onValueChange={(v) =>
                  setFormData({
                    ...formData,
                    providerType: v as ProviderType,
                    providerId: "",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUSINESS">
                    <span className="flex items-center gap-2">
                      <Store className="w-4 h-4" /> Negocios
                    </span>
                  </SelectItem>
                  <SelectItem value="STORE">
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" /> Tiendas
                    </span>
                  </SelectItem>
                  <SelectItem value="SERVICE">
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" /> Servicios
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Selección de Categoría del Negocio */}
            <div className="grid gap-2">
              <Label>Categoría</Label>

              <Select
                value={formData.providerCategory}
                onValueChange={(v) =>
                  setFormData({
                    ...formData,
                    providerCategory: v as ProviderCategory,
                    providerId: "", // reset seguro
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="RESTAURANT">Restaurante</SelectItem>
                  <SelectItem value="STORE">Tienda</SelectItem>
                  <SelectItem value="LICORERA">Licorera</SelectItem>
                  <SelectItem value="MEDICAMENT_STORE">Farmacia</SelectItem>
                  <SelectItem value="SERVICE">Servicios</SelectItem>
                  <SelectItem value="OTHER">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Selección de Negocio */}
            {formData.providerCategory && (
              <div className="grid gap-2">
                <Label>Negocio</Label>

                <Select
                  value={formData.providerId}
                  onValueChange={(v) =>
                    setFormData({
                      ...formData,
                      providerId: v,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un negocio" />
                  </SelectTrigger>

                  <SelectContent>
                    {negocios
                      .filter((n) => n.category === formData.providerCategory)
                      .map((n) => (
                        <SelectItem key={n.id} value={String(n.id)}>
                          {n.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Selección de Categoría Producto */}
            <div className="grid gap-2">
              <Label>Categoría</Label>

              <Select
                value={formData.category}
                onValueChange={(v) =>
                  setFormData({
                    ...formData,
                    category: v as ProductCategory,
                    providerId: undefined, // reset si cambia categoría
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="FOOD">Comida</SelectItem>
                  <SelectItem value="DRINK">Bebidas</SelectItem>
                  <SelectItem value="ALCOHOL">Alcohol</SelectItem>
                  <SelectItem value="MEDICINE">Medicamentos</SelectItem>
                  <SelectItem value="GROCERY">Abarrotes</SelectItem>
                  <SelectItem value="OTHER">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre del Producto</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Ej: Hamburguesa Clásica"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                placeholder="Descripción del producto"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="costPrice" className="flex items-center gap-2">
                  Costo
                  <span className="text-xs text-muted-foreground font-normal">
                    (interno)
                  </span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="costPrice"
                    type="number"
                    value={formData.costPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, costPrice: e.target.value })
                    }
                    placeholder="0"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price" className="flex items-center gap-2">
                  Precio
                  <span className="text-xs text-muted-foreground font-normal">
                    (cliente)
                  </span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emphasis" />
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="0"
                    className="pl-10 border-emphasis/30 focus:border-emphasis"
                  />
                </div>
              </div>
            </div>

            {/* Visual margin indicator */}
            {formData.costPrice && formData.price && (
              <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Margen estimado:
                </span>
                <span
                  className={cn(
                    "font-display font-semibold",
                    parseFloat(
                      calcularMargen(
                        parseFloat(formData.costPrice || "0"),
                        parseFloat(formData.price || "0"),
                      ) || "0",
                    ) < 30
                      ? "text-emphasis"
                      : "text-success",
                  )}
                >
                  {calcularMargen(
                    parseFloat(formData.costPrice) || 0,
                    parseFloat(formData.price) || 0,
                  )}
                  %
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
