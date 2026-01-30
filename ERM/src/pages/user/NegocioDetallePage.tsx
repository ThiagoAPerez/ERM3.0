import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Star,
  MapPin,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

/* ===================== TYPES ===================== */

interface BusinessDetailPublicResponse {
  id: number;
  name: string;
  description: string;
  municipality: string;
  category: string;
  logoUrl: string | null;
  coverUrl: string | null;
  preparationTimeMinutes: number;
}

interface IngredientPublicResponse {
  id: number;
  name: string;
  extraPrice: number;
}

interface ProductWithIngredientsPublicResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string | null;
  available: boolean;
  category: string;
  ingredients: IngredientPublicResponse[];
}

/* ===================== LABELS ===================== */

const CATEGORY_LABELS: Record<string, string> = {
  FOOD: "Comida",
  DRINK: "Bebidas",
  DESSERT: "Postres",
};

//===================== CONSTANTS ===================== //

const FILES_BASE_URL = "http://localhost:9090";

/* ===================== PAGE ===================== */

const NegocioDetallePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [business, setBusiness] = useState<BusinessDetailPublicResponse | null>(
    null,
  );

  const [products, setProducts] = useState<
    ProductWithIngredientsPublicResponse[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [carrito, setCarrito] = useState<Record<number, number>>({});
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<
    Record<number, number[]>
  >({});

  /* ================= FETCH ================= */

  useEffect(() => {
    if (!id) return;
    const businessId = Number(id);

    const fetchAll = async () => {
      try {
        const bRes = await api.get<BusinessDetailPublicResponse>(
          `/businesses/${businessId}`,
        );
        setBusiness(bRes.data);

        const pRes = await api.get<ProductWithIngredientsPublicResponse[]>(
          `/businesses/${businessId}/products?providerType=BUSINESS`,
        );

        setProducts(Array.isArray(pRes.data) ? pRes.data : []);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar el negocio",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id, toast]);

  /* ================= ADAPTADORES ================= */

  const categorias = useMemo(() => {
    const map: Record<
      string,
      {
        nombre: string;
        productos: {
          id: number;
          nombre: string;
          descripcion: string;
          precio: number;
          imagen: string | null;
          ingredientes: IngredientPublicResponse[];
        }[];
      }
    > = {};

    for (const p of products) {
      if (!map[p.category]) {
        map[p.category] = {
          nombre: CATEGORY_LABELS[p.category] ?? p.category,
          productos: [],
        };
      }

      map[p.category].productos.push({
        id: p.id,
        nombre: p.name,
        descripcion: p.description,
        precio: p.price,
        imagen: p.imageUrl,
        ingredientes: p.ingredients,
      });
    }

    return Object.values(map);
  }, [products]);

  const negocio = useMemo(() => {
    if (!business) return null;
    return {
      categorias: [CATEGORY_LABELS[business.category] ?? business.category],
      rating: 4.5,
      reviews: 10,
      tiempoEntrega: "40-45 min",
      distancia: "5 km",
    };
  }, [business]);

  /* ================= HELPERS ================= */

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);

  const totalItems = useMemo(
    () => Object.values(carrito).reduce((a, b) => a + b, 0),
    [carrito],
  );

  const totalPrice = useMemo(() => {
    return Object.entries(carrito).reduce((sum, [id, qty]) => {
      const product = products.find((p) => p.id === Number(id));
      if (!product) return sum;
      return sum + product.price * qty;
    }, 0);
  }, [carrito, products]);

  /* ================= HANDLERS ================= */

  const handleAddToCart = (id: number) =>
    setCarrito((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));

  const handleRemoveFromCart = (id: number) =>
    setCarrito((p) => {
      const n = { ...p };
      if (n[id] > 1) n[id]--;
      else delete n[id];
      return n;
    });

  const handleIngredienteToggle = (pid: number, iid: number) =>
    setIngredientesSeleccionados((p) => {
      const cur = p[pid] || [];
      return {
        ...p,
        [pid]: cur.includes(iid) ? cur.filter((x) => x !== iid) : [...cur, iid],
      };
    });

  /* ================= UI GUARD ================= */

  if (loading || !business || !negocio) return null;

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={
            business.coverUrl
              ? `${FILES_BASE_URL}${business.coverUrl}`
              : "/placeholder/cover.jpg"
          }
          alt={business.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Back Button */}
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

        {/* Favorite Button */}
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
      </div>

      {/* Business Info */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {negocio.categorias.map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>

              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                {business?.name}
              </h1>

              <p className="text-muted-foreground mb-4">
                {business?.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-medium">{negocio.rating}</span>
                  <span className="text-muted-foreground">
                    ({negocio.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {negocio.tiempoEntrega}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {negocio.distancia}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Menu Categories */}
      <div className="container mx-auto px-4 mt-8">
        {categorias.map((categoria, catIndex) => (
          <motion.div
            key={categoria.nombre}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-display font-bold text-foreground mb-4">
              {categoria.nombre}
            </h2>

            <div className="space-y-4">
              {categoria.productos.map((producto) => (
                <Card key={producto.id} className="glass-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Product Image */}
                      <div className="md:w-40 h-40 md:h-auto flex-shrink-0">
                        <img
                          src={
                            producto.imagen
                              ? `${FILES_BASE_URL}${producto.imagen}`
                              : "/placeholder/product.jpg"
                          }
                          alt={producto.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-foreground">
                            {producto.nombre}
                          </h3>
                          <span className="font-bold text-accent">
                            {formatPrice(producto.precio)}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">
                          {producto.descripcion}
                        </p>

                        {/* Ingredients */}
                        <div className="mb-4">
                          <p className="text-xs font-medium text-muted-foreground mb-2">
                            Extras disponibles:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {producto.ingredientes.length === 0 ? (
                              <span className="text-xs text-muted-foreground">
                                Sin extras disponibles
                              </span>
                            ) : (
                              producto.ingredientes.map((ingrediente) => (
                                <label
                                  key={ingrediente.id}
                                  className="flex items-center gap-1.5 text-xs cursor-pointer"
                                >
                                  <Checkbox
                                    checked={(
                                      ingredientesSeleccionados[producto.id] ||
                                      []
                                    ).includes(ingrediente.id)}
                                    onCheckedChange={() =>
                                      handleIngredienteToggle(
                                        producto.id,
                                        ingrediente.id,
                                      )
                                    }
                                    className="w-3.5 h-3.5"
                                  />
                                  <span className="text-muted-foreground">
                                    {ingrediente.name}
                                    {ingrediente.extraPrice > 0 && (
                                      <span className="ml-1">
                                        (+{formatPrice(ingrediente.extraPrice)})
                                      </span>
                                    )}
                                  </span>
                                </label>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="flex items-center justify-end gap-2">
                          {carrito[producto.id] ? (
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleRemoveFromCart(producto.id)
                                }
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {carrito[producto.id]}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => handleAddToCart(producto.id)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
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
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Cart */}
      {totalItems > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-xl border-t border-border"
        >
          <div className="container mx-auto">
            <Button
              variant="hero"
              className="w-full h-14 text-base"
              onClick={() => navigate("/orden/confirmar")}
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
