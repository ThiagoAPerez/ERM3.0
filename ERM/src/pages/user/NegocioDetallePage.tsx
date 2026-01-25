import { motion } from "framer-motion";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  MapPin, 
  Plus, 
  Minus,
  ShoppingBag,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NegocioDetallePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [carrito, setCarrito] = useState<{ [key: number]: number }>({});
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<{ [key: number]: string[] }>({});

  // Mock business data
  const negocio = {
    id: id || "1",
    nombre: "La Burger House",
    descripcion: "Las mejores hamburguesas artesanales de la ciudad. Preparadas con ingredientes frescos y recetas únicas que te harán volver por más.",
    imagen: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
    rating: 4.8,
    reviews: 234,
    tiempoEntrega: "25-35 min",
    distancia: "1.2 km",
    categorias: ["Hamburguesas", "Americana", "Fast Food"],
    horario: "11:00 AM - 10:00 PM",
  };

  const categorias = [
    {
      nombre: "Hamburguesas Clásicas",
      productos: [
        {
          id: 1,
          nombre: "Burger Clásica",
          descripcion: "Carne 100% res, queso americano, lechuga, tomate y salsa especial",
          precio: 18000,
          imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
          ingredientes: ["Queso extra", "Tocino", "Cebolla caramelizada", "Jalapeños", "Huevo frito"],
        },
        {
          id: 2,
          nombre: "Doble Carne",
          descripcion: "Doble carne de res, doble queso, lechuga, tomate y salsa BBQ",
          precio: 25000,
          imagen: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400",
          ingredientes: ["Queso extra", "Tocino", "Cebolla caramelizada", "Jalapeños", "Huevo frito"],
        },
        {
          id: 3,
          nombre: "Burger BBQ",
          descripcion: "Carne de res, tocino crujiente, aros de cebolla y salsa BBQ ahumada",
          precio: 22000,
          imagen: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400",
          ingredientes: ["Queso extra", "Tocino extra", "Cebolla caramelizada", "Jalapeños"],
        },
      ],
    },
    {
      nombre: "Hamburguesas Premium",
      productos: [
        {
          id: 4,
          nombre: "Burger Gourmet",
          descripcion: "Carne angus, queso brie, rúcula, cebolla caramelizada y reducción de vino",
          precio: 32000,
          imagen: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400",
          ingredientes: ["Trufa", "Foie gras", "Queso azul", "Champiñones salteados"],
        },
        {
          id: 5,
          nombre: "Burger Tex-Mex",
          descripcion: "Carne de res, guacamole, pico de gallo, jalapeños y crema ácida",
          precio: 26000,
          imagen: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400",
          ingredientes: ["Queso cheddar extra", "Nachos", "Frijoles negros", "Chorizo"],
        },
      ],
    },
    {
      nombre: "Acompañamientos",
      productos: [
        {
          id: 6,
          nombre: "Papas Fritas",
          descripcion: "Papas crujientes con sal marina y salsa de la casa",
          precio: 8000,
          imagen: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
          ingredientes: ["Queso cheddar", "Tocino bits", "Cebollín"],
        },
        {
          id: 7,
          nombre: "Aros de Cebolla",
          descripcion: "Aros de cebolla empanizados con salsa ranch",
          precio: 10000,
          imagen: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400",
          ingredientes: ["Salsa BBQ", "Salsa buffalo"],
        },
      ],
    },
    {
      nombre: "Bebidas",
      productos: [
        {
          id: 8,
          nombre: "Malteada Clásica",
          descripcion: "Malteada cremosa disponible en chocolate, vainilla o fresa",
          precio: 12000,
          imagen: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
          ingredientes: ["Chispas de chocolate", "Crema batida extra", "Cereza"],
        },
        {
          id: 9,
          nombre: "Limonada Natural",
          descripcion: "Limonada fresca preparada al momento",
          precio: 6000,
          imagen: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400",
          ingredientes: ["Hierbabuena", "Jengibre"],
        },
      ],
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

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
      const newCart = { ...prev };
      if (newCart[productoId] > 1) {
        newCart[productoId]--;
      } else {
        delete newCart[productoId];
      }
      return newCart;
    });
  };

  const handleIngredienteToggle = (productoId: number, ingrediente: string) => {
    setIngredientesSeleccionados((prev) => {
      const current = prev[productoId] || [];
      if (current.includes(ingrediente)) {
        return {
          ...prev,
          [productoId]: current.filter((i) => i !== ingrediente),
        };
      } else {
        return {
          ...prev,
          [productoId]: [...current, ingrediente],
        };
      }
    });
  };

  const totalItems = Object.values(carrito).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = Object.entries(carrito).reduce((sum, [id, qty]) => {
    const producto = categorias
      .flatMap((c) => c.productos)
      .find((p) => p.id === parseInt(id));
    return sum + (producto?.precio || 0) * qty;
  }, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={negocio.imagen}
          alt={negocio.nombre}
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
                {negocio.nombre}
              </h1>
              
              <p className="text-muted-foreground mb-4">
                {negocio.descripcion}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-medium">{negocio.rating}</span>
                  <span className="text-muted-foreground">({negocio.reviews})</span>
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
                          src={producto.imagen}
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
                            {producto.ingredientes.map((ingrediente) => (
                              <label
                                key={ingrediente}
                                className="flex items-center gap-1.5 text-xs cursor-pointer"
                              >
                                <Checkbox
                                  checked={(ingredientesSeleccionados[producto.id] || []).includes(ingrediente)}
                                  onCheckedChange={() => handleIngredienteToggle(producto.id, ingrediente)}
                                  className="w-3.5 h-3.5"
                                />
                                <span className="text-muted-foreground">{ingrediente}</span>
                              </label>
                            ))}
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
