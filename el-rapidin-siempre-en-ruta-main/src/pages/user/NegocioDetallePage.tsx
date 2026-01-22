import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

interface Product {
  id: number;
  name: string;
  description?: string;
  price: string | number; // 👈 no confiamos en el tipo
  currency: string;
  imageUrl?: string;
}

interface BusinessDetail {
  id: number;
  name: string;
  description?: string;
  municipality?: string;
  logoUrl?: string;
  coverUrl?: string;
  preparationTimeMinutes?: number;
}

const NegocioDetallePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [negocio, setNegocio] = useState<BusinessDetail | null>(null);
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [carrito, setCarrito] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const [businessRes, productsRes] = await Promise.all([
          api.get<BusinessDetail>(`/businesses/${id}`),
          api.get<Product[]>(`/businesses/${id}/products`),
        ]);

        setNegocio(businessRes.data);
        setProductos(productsRes.data);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "No se pudo cargar el negocio",
          variant: "destructive",
        });
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id, navigate, toast]);

  if (loading || !negocio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cargando negocio...</p>
      </div>
    );
  }

  const categorias = [
    {
      nombre: "Menú",
      productos: productos.map((p) => {
        const precio =
          typeof p.price === "string"
            ? parseFloat(p.price)
            : typeof p.price === "number"
              ? p.price
              : 0;

        return {
          id: p.id,
          nombre: p.name,
          descripcion: p.description,
          precio,
          imagen:
            p.imageUrl || "https://via.placeholder.com/300x300?text=Producto",
        };
      }),
    },
  ];

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
  };

  const handleRemoveFromCart = (productoId: number) => {
    setCarrito((prev) => {
      const next = { ...prev };
      if (next[productoId] > 1) next[productoId]--;
      else delete next[productoId];
      return next;
    });
  };

  const totalItems = Object.values(carrito).reduce((a, b) => a + b, 0);

  const totalPrice = Object.entries(carrito).reduce((sum, [id, qty]) => {
    const producto = categorias
      .flatMap((c) => c.productos)
      .find((p) => p.id === Number(id));
    return sum + (producto?.precio || 0) * qty;
  }, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative h-64 md:h-80">
        <img
          src={
            negocio.coverUrl ||
            "https://via.placeholder.com/1200x600?text=Negocio"
          }
          alt={negocio.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-4 left-4">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full bg-background/80"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="absolute top-4 right-4">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-background/80"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <Card className="glass-card">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-2">{negocio.name}</h1>
            <p className="text-muted-foreground mb-4">{negocio.description}</p>

            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" /> 4.5
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {negocio.preparationTimeMinutes ?? 20} min
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {negocio.municipality}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menú */}
      <div className="container mx-auto px-4 mt-8">
        {categorias.map((categoria) => (
          <div key={categoria.nombre} className="mb-8">
            <h2 className="text-xl font-bold mb-4">{categoria.nombre}</h2>

            {categoria.productos.map((producto) => (
              <Card key={producto.id} className="mb-4">
                <CardContent className="p-4 flex gap-4">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{producto.nombre}</h3>
                      <span className="font-bold text-accent">
                        {formatPrice(producto.precio)}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
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
                            <Minus />
                          </Button>
                          <span>{carrito[producto.id]}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleAddToCart(producto.id)}
                          >
                            <Plus />
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="hero"
                          onClick={() => handleAddToCart(producto.id)}
                        >
                          Agregar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>

      {/* Carrito */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
          <Button
            className="w-full"
            variant="hero"
            onClick={() => navigate("/carrito")}
          >
            <ShoppingBag className="mr-2" />
            Ver carrito ({totalItems}) · {formatPrice(totalPrice)}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NegocioDetallePage;
