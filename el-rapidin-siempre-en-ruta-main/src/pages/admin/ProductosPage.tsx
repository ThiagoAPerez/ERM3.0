import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Power,
  Trash2,
  DollarSign,
  AlertCircle,
  Store,
  ShoppingCart,
} from "lucide-react";

import { api } from "@/lib/api";
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

/* ===================== TYPES ===================== */
export type ProductCategory =
  | "FOOD"
  | "DRINK"
  | "ALCOHOL"
  | "MEDICINE"
  | "GROCERY"
  | "OTHER";

export type TipoPropietario = "BUSINESS" | "STORE";

// Dominio / API
export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  tipoPropietario: TipoPropietario;
  propietarioId: string;
  propietarioNombre: string;
  category: ProductCategory;
  costPrice: number;
  salePrice: number;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
}

interface AdminProductListDTO {
  id: number;
  name: string;
  description: string;
  providerType: "BUSINESS" | "STORE";
  providerId: number;
  providerName: string;
  costPrice: number;
  category: ProductCategory;
  salePrice: number;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
}

interface BusinessDTO {
  id: number;
  name: string;
  providerType: "BUSINESS" | "STORE";
}

interface PropietarioOption {
  id: string;
  nombre: string;
}

/* ===================== COMPONENT ===================== */

const ProductosPage = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterNegocio, setFilterNegocio] = useState<"all" | string>("all");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);

  const [mockNegocios, setMockNegocios] = useState<PropietarioOption[]>([]);
  const [mockTiendas, setMockTiendas] = useState<PropietarioOption[]>([]);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    tipoPropietario: "BUSINESS" as TipoPropietario,
    propietarioId: "",
    category: "OTHER" as ProductCategory,
    costPrice: "",
    price: "",
  });

  /* ===================== LOAD ===================== */
  const loadProductos = async () => {
    const { data } = await api.get<AdminProductListDTO[]>("/admin/products");

    setProductos(
      data.map((p) => ({
        id: String(p.id),
        nombre: p.name,
        descripcion: p.description,
        tipoPropietario: p.providerType,
        propietarioId: String(p.providerId),
        propietarioNombre: p.providerName,
        category: p.category,
        costPrice: p.costPrice,
        salePrice: p.salePrice,
        status: p.status,
      })),
    );
  };

  useEffect(() => {
    loadProductos();

    api.get<BusinessDTO[]>("/admin/businesses").then((res) => {
      const negocios: PropietarioOption[] = [];
      const tiendas: PropietarioOption[] = [];

      res.data.forEach((b) => {
        const option = { id: String(b.id), nombre: b.name };
        b.providerType === "BUSINESS"
          ? negocios.push(option)
          : tiendas.push(option);
      });

      setMockNegocios(negocios);
      setMockTiendas(tiendas);
    });
  }, []);

  /* ===================== ACTIONS ===================== */

  const handleOpenDialog = (producto?: Producto) => {
    if (producto) {
      setEditingProducto(producto);

      setFormData({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        tipoPropietario: producto.tipoPropietario,
        propietarioId: producto.propietarioId?.toString() ?? "",
        category: producto.category, // ✅ CLAVE
        costPrice: producto.costPrice.toString(),
        price: producto.salePrice.toString(),
      });
    } else {
      setEditingProducto(null);

      setFormData({
        nombre: "",
        descripcion: "",
        tipoPropietario: "BUSINESS",
        propietarioId: "",
        category: "OTHER",
        costPrice: "",
        price: "",
      });
    }

    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    // 🔒 Validaciones mínimas (bloqueaban el create)
    if (!formData.nombre.trim()) return;
    if (!formData.propietarioId) return;

    const payload = {
      name: formData.nombre.trim(),
      description: formData.descripcion.trim(),
      providerType: formData.tipoPropietario, // "BUSINESS" | "STORE"
      providerId: Number(formData.propietarioId),
      category: formData.category,
      costPrice: Number(formData.costPrice),
      salePrice: Number(formData.price),
    };

    try {
      if (editingProducto) {
        await api.put(`/admin/products/${editingProducto.id}`, payload);
      } else {
        await api.post("/admin/products", payload);
      }

      await loadProductos();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error guardando producto:", error);
    }
  };

  const handleToggleEstado = async (producto: Producto) => {
    const endpoint = producto.status === "ACTIVE" ? "deactivate" : "activate";

    await api.patch(`/admin/products/${producto.id}/${endpoint}`);
    await loadProductos();
  };

  const handleDelete = async (producto: Producto) => {
    await api.delete(`/admin/products/${producto.id}`);
    await loadProductos();
  };

  const calcularMargen = (cost: number, price: number) =>
    price === 0 ? "0" : (((price - cost) / price) * 100).toFixed(1);

  const filteredProductos = productos.filter((p) => {
    const matchSearch = p.nombre
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchOwner =
      filterNegocio === "all" || p.propietarioId === filterNegocio;
    return matchSearch && matchOwner;
  });

  //==============================================================
  // ====================== JSX ====================================

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
            placeholder="Buscar productos por su nombre :"
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

            {mockNegocios.map((n) => (
              <SelectItem key={n.id} value={n.id}>
                {n.nombre}
              </SelectItem>
            ))}

            {mockTiendas.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Productos Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30 border-b border-border ">
                <th className="text-left p-4 font-semibold">Producto</th>
                <th className="text-left p-4 font-semibold">Tipo</th>
                <th className="text-left p-4 font-semibold">Propietario</th>
                <th className="text-right p-4 font-semibold">Precio Costo</th>
                <th className="text-right p-4 font-semibold">Precio Venta</th>
                <th className="text-right p-4 font-semibold">Margen</th>
                <th className="text-center p-4 font-semibold">Estado</th>
                <th className="text-right p-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto, index) => {
                const margen = parseFloat(
                  calcularMargen(producto.costPrice, producto.salePrice) || "0",
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
                            {producto.descripcion}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium",
                          producto.tipoPropietario
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-purple-500/10 text-purple-400",
                        )}
                      >
                        {producto.tipoPropietario ? (
                          <>
                            <Store className="w-3 h-3" /> Negocio
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3 h-3" /> Tienda
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">
                        {producto.tipoPropietario}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-sm text-muted-foreground">
                        ${producto.costPrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-display font-semibold number-display">
                        ${producto.salePrice.toLocaleString()}
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
                            {producto.status}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(producto)}
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
                value={formData.tipoPropietario}
                onValueChange={(v) =>
                  setFormData({
                    ...formData,
                    tipoPropietario: v as TipoPropietario,
                    propietarioId: "",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STORE">
                    <span className="flex items-center gap-2">
                      <Store className="w-4 h-4" /> Negocios
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Selección de Propietario */}

            <div className="grid gap-2">
              <Label>Negocio al que pertenece</Label>

              <Select
                value={formData.propietarioId}
                onValueChange={(v) =>
                  setFormData({ ...formData, propietarioId: v })
                }
                disabled={!formData.tipoPropietario}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un negocio" />
                </SelectTrigger>
                <SelectContent>
                  {formData.tipoPropietario === "BUSINESS"
                    ? mockNegocios.map((n) => (
                        <SelectItem key={n.id} value={n.id}>
                          {n.nombre}
                        </SelectItem>
                      ))
                    : mockTiendas.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.nombre}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>

            {/* Categoria del producto */}
            <div className="grid gap-2">
              <Label>Categoría del producto</Label>

              <Select
                value={formData.category}
                onValueChange={(v) =>
                  setFormData({ ...formData, category: v as ProductCategory })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un negocio" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="FOOD">Comida</SelectItem>
                  <SelectItem value="DRINK">Bebidas</SelectItem>
                  <SelectItem value="ALCOHOL">Alcohol</SelectItem>
                  <SelectItem value="MEDICINE">Medicamentos</SelectItem>
                  <SelectItem value="GROCERY">Abarrotes</SelectItem>
                  <SelectItem value="OTHER">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre del Producto </Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder=" Hamburguesa Clásica"
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
