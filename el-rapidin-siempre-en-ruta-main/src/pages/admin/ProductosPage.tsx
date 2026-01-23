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

export type TipoPropietario = "BUSINESS" | "STORE" | "SERVICE";

// Dominio / API
export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  tipoPropietario: TipoPropietario;
  propietarioId: string;
  propietarioNombre: string;
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
        tipoPropietario: p.providerType,
        propietarioId: String(p.providerId),
        propietarioNombre: p.providerName,
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
        costPrice: producto.costPrice.toString(),
        price: producto.salePrice.toString(), // ⚠️ clave
      });
    } else {
      setEditingProducto(null);
      setFormData({
        nombre: "",
        descripcion: "",
        tipoPropietario: "BUSINESS",
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
      providerType: formData.tipoPropietario, // "BUSINESS" | "STORE" | "SERVICE"
      providerId: Number(formData.propietarioId),
      category: "OTHER",
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
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="BUSINESS">Negocios</SelectItem>
            <SelectItem value="STORE">Tiendas</SelectItem>
            <SelectItem value="SERVICE">Servicios</SelectItem>
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
                          producto.tipoPropietario === "BUSINESS"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-purple-500/10 text-purple-400",
                        )}
                      >
                        {producto.tipoPropietario === "BUSINESS" ? (
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
                            {producto.status === "ACTIVE"
                              ? "Desactivar"
                              : "Activar"}
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
    </div>
  );
};
export default ProductosPage;
