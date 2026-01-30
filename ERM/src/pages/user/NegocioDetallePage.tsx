import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { BusinessBackendDTO } from "./NegociosClientePage";

/* =====================  ENUMS  ===================== */
enum ProductCategory {
  FOOD = "FOOD",
  DRINK = "DRINK",
  ALCOHOL = "ALCOHOL",
  MEDICINE = "MEDICINE",
  GROCERY = "GROCERY",
  OTHER = "OTHER",
}

/* =====================  INTERFACES  ===================== */
interface ProductBackendDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string | null;
  available: boolean;
  createdAt: string;
  category: ProductCategory;
}

/* =====================  UI MODELS  ===================== */
interface ProductoUI {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string | null;
}

interface CategoriaUI {
  nombre: string;
  productos: ProductoUI[];
}

/* =====================  MAPPER  ===================== */
function mapProductToUI(product: ProductBackendDTO): ProductoUI {
  return {
    id: product.id,
    nombre: product.name,
    descripcion: product.description,
    precio: product.price,
    imagen: product.imageUrl
      ? `http://localhost:9090${product.imageUrl}`
      : null,
  };
}

/* =====================  COMPONENT  ===================== */
const NegocioDetallePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [productosBackend, setProductosBackend] = useState<ProductBackendDTO[]>(
    [],
  );
  const [business, setBusiness] = useState<BusinessBackendDTO | null>(null);
  const [carrito, setCarrito] = useState<Record<number, number>>({});

  /* =====================  LOAD BUSINESS  ===================== */
  useEffect(() => {
    if (!id) return;

    api
      .get<BusinessBackendDTO>(`/businesses/${id}`)
      .then((res) => setBusiness(res.data))
      .catch(() => setBusiness(null));
  }, [id]);

  /* =====================  BUSINESS UI  ===================== */
  const negocio = {
    id: id || "1",
    nombre: business?.name ?? "Negocio",
    descripcion: business?.description ?? "Descripción pendiente",
    imagen: business?.coverUrl
      ? `http://localhost:9090${business.coverUrl}`
      : "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
    rating: 4.8,
    reviews: 0,
    tiempoEntrega: "40-50 min",
    distancia: "5 km",
    categorias: business?.categories ?? [],
  };

  /* =====================  LOAD PRODUCTS  ===================== */
  useEffect(() => {
    if (!id) return;

    api
      .get<ProductBackendDTO[]>(
        `/businesses/${id}/products?providerType=BUSINESS`,
      )
      .then((res) => setProductosBackend(res.data))
      .catch(() => setProductosBackend([]));
  }, [id]);

  /* =====================  GROUP BY CATEGORY  ===================== */
  const categorias: CategoriaUI[] = useMemo(() => {
    const map = new Map<ProductCategory, ProductoUI[]>();

    productosBackend.forEach((product) => {
      const uiProduct = mapProductToUI(product);
      const list = map.get(product.category) ?? [];
      list.push(uiProduct);
      map.set(product.category, list);
    });

    return Array.from(map.entries()).map(([category, productos]) => ({
      nombre: category,
      productos,
    }));
  }, [productosBackend]);

  /* =====================  HELPERS  ===================== */
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);

  const handleAddToCart = (productoId: number) => {
    setCarrito((prev) => ({
      ...prev,
      [productoId]: (prev[productoId] || 0) + 1,
    }));

    toast({
      title: "Agregado al carrito",
      description: "Producto agregado correctamente",
    });
  };

  const handleRemoveFromCart = (productoId: number) => {
    setCarrito((prev) => {
      const copy = { ...prev };
      if (copy[productoId] > 1) copy[productoId]--;
      else delete copy[productoId];
      return copy;
    });
  };

  const totalItems = Object.values(carrito).reduce((a, b) => a + b, 0);

  const totalPrice = Object.entries(carrito).reduce((sum, [id, qty]) => {
    const product = productosBackend.find((p) => p.id === Number(id));
    return sum + (product?.price ?? 0) * qty;
  }, 0);

  /* =====================  JSX  ===================== */
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-64 md:h-80"
      >
        <img
          src={negocio.imagen}
          alt={negocio.nombre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 left-4"
        >
          <Button
            variant="secondary"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full bg-background/80 backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 right-4"
        >
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Info */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {negocio.categorias.map((cat: string) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>

              <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
                {negocio.nombre}
              </h1>

              <p className="text-muted-foreground mb-4">
                {negocio.descripcion}
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  {negocio.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {negocio.tiempoEntrega}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {negocio.distancia}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Productos */}
      <div className="container mx-auto px-4 mt-8">
        {categorias.map((categoria, idx) => (
          <motion.div
            key={categoria.nombre}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-display font-bold mb-4">
              {categoria.nombre}
            </h2>

            {categoria.productos.map((producto) => (
              <Card
                key={producto.id}
                className="glass-card mb-4 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {producto.imagen && (
                      <div className="md:w-40 h-40 md:h-auto flex-shrink-0">
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold">{producto.nombre}</h3>
                        <span className="text-accent font-bold">
                          {formatPrice(producto.precio)}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {producto.descripcion}
                      </p>

                      <div className="flex justify-end gap-2">
                        {carrito[producto.id] ? (
                          <>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleRemoveFromCart(producto.id)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {carrito[producto.id]}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleAddToCart(producto.id)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            variant="hero"
                            onClick={() => handleAddToCart(producto.id)}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Agregar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Floating Cart */}
      {totalItems > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 inset-x-0 p-4 bg-background/95 backdrop-blur-xl border-t border-border"
        >
          <div className="container mx-auto">
            <Button
              variant="hero"
              className="w-full h-14 text-base"
              onClick={() => navigate("/carrito")}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Ver carrito ({totalItems}) · {formatPrice(totalPrice)}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NegocioDetallePage;
