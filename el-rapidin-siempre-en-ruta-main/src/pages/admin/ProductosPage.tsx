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
}

interface AdminProductListDTO {
  id: number;
  name: string;
  description: string;
  providerType: "BUSINESS" | "STORE";
  providerId: number;
  providerName: string;
  costPrice: number;
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
  const [filterNegocio, setFilterNegocio] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);

  const [mockNegocios, setMockNegocios] = useState<PropietarioOption[]>([]);
  const [mockTiendas, setMockTiendas] = useState<PropietarioOption[]>([]);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    tipoPropietario: "negocio" as TipoPropietario,
    propietarioId: "",
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
        tipoPropietario: p.providerType === "BUSINESS" ? "negocio" : "tienda",
        propietarioId: String(p.providerId),
        propietarioNombre: p.providerName,
        costPrice: p.costPrice,
        price: p.salePrice,
        estado: p.status === "ACTIVE" ? "active" : "inactive",
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

  const handleSave = async () => {
    const payload = {
      name: formData.nombre,
      description: formData.descripcion,
      providerType:
        formData.tipoPropietario === "negocio" ? "BUSINESS" : "STORE",
      providerId: Number(formData.propietarioId),
      category: "OTHER", // o la que luego conectes al Select
      costPrice: Number(formData.costPrice),
      salePrice: Number(formData.price),
    };

    if (editingProducto) {
      await api.put(`/admin/products/${editingProducto.id}`, payload);
    } else {
      await api.post("/admin/products", payload);
    }

    await loadProductos();
    setIsDialogOpen(false);
  };

  const handleToggleEstado = async (producto: Producto) => {
    const endpoint = producto.estado === "active" ? "deactivate" : "activate";
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
  return (
    <>
      {/* ===================== CONTENIDO PRINCIPAL ===================== */}
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
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                — Negocios —
              </div>
              {mockNegocios.map((n) => (
                <SelectItem key={n.id} value={n.id}>
                  {n.nombre}
                </SelectItem>
              ))}
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                — Tiendas —
              </div>
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
                    calcularMargen(producto.costPrice, producto.price) || "0",
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
                      {/* === FILAS SIN CAMBIOS === */}
                      {/* (todo tu JSX de la fila queda exactamente igual) */}
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
            <span className="text-emphasis font-medium">Nota:</span> Los
            productos con margen menor al 30% están marcados con advertencia
            visual. El cálculo de precios finales se realizará en el backend.
          </p>
        </div>
      </div>

      {/* ===================== DIALOG FUERA DEL OVERFLOW ===================== */}
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

          {/* TODO el formulario queda IGUAL, sin mover nada */}

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
    </>
  );
};

export default ProductosPage;
