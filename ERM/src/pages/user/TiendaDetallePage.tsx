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
  ShoppingCart,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TiendaDetallePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [carrito, setCarrito] = useState<{ [key: number]: number }>({});
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState<{ [key: number]: string[] }>({});

  // Mock store data based on id
  const tiendasData: { [key: string]: typeof tiendaDefault } = {
    "1": {
      id: "1",
      nombre: "Supermercado El Ahorro",
      descripcion: "Tu supermercado de confianza con los mejores precios en abarrotes, frutas frescas y productos de primera calidad.",
      imagen: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800",
      rating: 4.6,
      reviews: 234,
      tiempoEntrega: "30-45 min",
      distancia: "1.0 km",
      categorias: ["Supermercado", "Abarrotes", "Frutas"],
      horario: "7:00 AM - 10:00 PM",
    },
    "2": {
      id: "2",
      nombre: "Farmacia Santa Cruz",
      descripcion: "Farmacia de turno con amplio stock de medicamentos, productos de cuidado personal y atención farmacéutica profesional.",
      imagen: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800",
      rating: 4.8,
      reviews: 156,
      tiempoEntrega: "20-30 min",
      distancia: "0.6 km",
      categorias: ["Farmacia", "Medicamentos", "Cuidado personal"],
      horario: "24 horas",
    },
    "3": {
      id: "3",
      nombre: "Licores del Valle",
      descripcion: "La mejor selección de vinos, licores importados y cervezas artesanales para todas tus celebraciones.",
      imagen: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800",
      rating: 4.4,
      reviews: 89,
      tiempoEntrega: "25-35 min",
      distancia: "1.3 km",
      categorias: ["Licorería", "Vinos", "Cervezas"],
      horario: "10:00 AM - 11:00 PM",
    },
    "4": {
      id: "4",
      nombre: "Pet Shop Amigos",
      descripcion: "Todo para tu mascota: alimentos premium, accesorios, juguetes y productos de higiene de las mejores marcas.",
      imagen: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800",
      rating: 4.9,
      reviews: 112,
      tiempoEntrega: "30-40 min",
      distancia: "2.0 km",
      categorias: ["Mascotas", "Alimentos", "Accesorios"],
      horario: "9:00 AM - 8:00 PM",
    },
    "5": {
      id: "5",
      nombre: "Mini Market Express",
      descripcion: "Tu tienda de conveniencia abierta hasta tarde. Snacks, bebidas, productos básicos y mucho más.",
      imagen: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800",
      rating: 4.3,
      reviews: 67,
      tiempoEntrega: "15-25 min",
      distancia: "0.4 km",
      categorias: ["Mini Market", "Snacks", "Bebidas"],
      horario: "6:00 AM - 12:00 AM",
    },
  };

  const tiendaDefault = {
    id: id || "1",
    nombre: "Supermercado El Ahorro",
    descripcion: "Tu supermercado de confianza con los mejores precios.",
    imagen: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800",
    rating: 4.6,
    reviews: 234,
    tiempoEntrega: "30-45 min",
    distancia: "1.0 km",
    categorias: ["Supermercado", "Abarrotes"],
    horario: "7:00 AM - 10:00 PM",
  };

  const tienda = tiendasData[id || "1"] || tiendaDefault;

  // Mock products based on store type
  const productosPorTienda: { [key: string]: typeof categoriasDefault } = {
    "1": [
      {
        nombre: "Bebidas",
        productos: [
          {
            id: 101,
            nombre: "Gaseosa Cola 2L",
            descripcion: "Bebida carbonatada sabor cola, botella grande familiar",
            precio: 5500,
            imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400",
            opciones: ["Fría", "Normal"],
          },
          {
            id: 102,
            nombre: "Jugo de Naranja 1L",
            descripcion: "Jugo 100% natural sin conservantes ni azúcar añadida",
            precio: 8000,
            imagen: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400",
            opciones: ["Con pulpa", "Sin pulpa"],
          },
          {
            id: 103,
            nombre: "Agua Mineral 6 pack",
            descripcion: "Pack de 6 botellas de agua mineral pura 500ml",
            precio: 9000,
            imagen: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400",
            opciones: ["Con gas", "Sin gas"],
          },
        ],
      },
      {
        nombre: "Snacks y Dulces",
        productos: [
          {
            id: 104,
            nombre: "Papas Fritas Familiar",
            descripcion: "Bolsa grande de papas fritas crujientes sabor natural",
            precio: 7500,
            imagen: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400",
            opciones: ["Natural", "BBQ", "Limón"],
          },
          {
            id: 105,
            nombre: "Galletas de Chocolate",
            descripcion: "Paquete de galletas con chispas de chocolate premium",
            precio: 4500,
            imagen: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
            opciones: ["Chocolate negro", "Chocolate con leche"],
          },
        ],
      },
      {
        nombre: "Lácteos",
        productos: [
          {
            id: 106,
            nombre: "Leche Entera 1L",
            descripcion: "Leche fresca entera pasteurizada de alta calidad",
            precio: 4200,
            imagen: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
            opciones: ["Entera", "Deslactosada", "Light"],
          },
          {
            id: 107,
            nombre: "Yogurt Griego 500g",
            descripcion: "Yogurt griego cremoso con probióticos naturales",
            precio: 8500,
            imagen: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
            opciones: ["Natural", "Fresa", "Mora"],
          },
        ],
      },
    ],
    "2": [
      {
        nombre: "Medicamentos Básicos",
        productos: [
          {
            id: 201,
            nombre: "Acetaminofén 500mg x 10",
            descripcion: "Tabletas para alivio del dolor y la fiebre",
            precio: 3500,
            imagen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
            opciones: ["Tabletas", "Cápsulas"],
          },
          {
            id: 202,
            nombre: "Ibuprofeno 400mg x 10",
            descripcion: "Antiinflamatorio de venta libre para dolores musculares",
            precio: 5000,
            imagen: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400",
            opciones: ["400mg", "600mg"],
          },
        ],
      },
      {
        nombre: "Cuidado Personal",
        productos: [
          {
            id: 203,
            nombre: "Crema Hidratante Facial",
            descripcion: "Crema humectante con vitamina E para todo tipo de piel",
            precio: 25000,
            imagen: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
            opciones: ["Piel seca", "Piel mixta", "Piel grasa"],
          },
          {
            id: 204,
            nombre: "Protector Solar FPS 50",
            descripcion: "Protección solar de amplio espectro resistente al agua",
            precio: 35000,
            imagen: "https://images.unsplash.com/photo-1556227703-3ff6e5b4e2f6?w=400",
            opciones: ["50ml", "100ml"],
          },
        ],
      },
      {
        nombre: "Vitaminas",
        productos: [
          {
            id: 205,
            nombre: "Vitamina C 1000mg x 30",
            descripcion: "Suplemento vitamínico para fortalecer el sistema inmune",
            precio: 18000,
            imagen: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400",
            opciones: ["Tabletas", "Efervescente"],
          },
        ],
      },
    ],
    "3": [
      {
        nombre: "Vinos",
        productos: [
          {
            id: 301,
            nombre: "Vino Tinto Reserva",
            descripcion: "Vino tinto cabernet sauvignon con 12 meses en barrica",
            precio: 45000,
            imagen: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
            opciones: ["750ml", "1.5L"],
          },
          {
            id: 302,
            nombre: "Vino Blanco Sauvignon",
            descripcion: "Vino blanco fresco y afrutado, ideal para mariscos",
            precio: 38000,
            imagen: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=400",
            opciones: ["750ml"],
          },
        ],
      },
      {
        nombre: "Licores",
        productos: [
          {
            id: 303,
            nombre: "Whisky Premium 750ml",
            descripcion: "Whisky escocés envejecido 12 años en barricas de roble",
            precio: 120000,
            imagen: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400",
            opciones: ["12 años", "18 años"],
          },
          {
            id: 304,
            nombre: "Tequila Reposado",
            descripcion: "Tequila 100% agave reposado por 6 meses",
            precio: 85000,
            imagen: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400",
            opciones: ["750ml", "1L"],
          },
        ],
      },
      {
        nombre: "Cervezas",
        productos: [
          {
            id: 305,
            nombre: "Cerveza Artesanal 6 pack",
            descripcion: "Pack de cervezas artesanales IPA con lúpulo aromático",
            precio: 35000,
            imagen: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400",
            opciones: ["IPA", "Lager", "Stout"],
          },
        ],
      },
    ],
    "4": [
      {
        nombre: "Alimentos para Perros",
        productos: [
          {
            id: 401,
            nombre: "Alimento Premium Adulto 15kg",
            descripcion: "Alimento balanceado premium para perros adultos",
            precio: 95000,
            imagen: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400",
            opciones: ["Pollo", "Carne", "Cordero"],
          },
          {
            id: 402,
            nombre: "Snacks Dentales x 10",
            descripcion: "Premios masticables para la salud dental de tu mascota",
            precio: 18000,
            imagen: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400",
            opciones: ["Pequeño", "Mediano", "Grande"],
          },
        ],
      },
      {
        nombre: "Alimentos para Gatos",
        productos: [
          {
            id: 403,
            nombre: "Alimento Premium Gatos 8kg",
            descripcion: "Alimento completo para gatos adultos con omega 3 y 6",
            precio: 78000,
            imagen: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400",
            opciones: ["Pollo", "Pescado", "Mix"],
          },
        ],
      },
      {
        nombre: "Accesorios",
        productos: [
          {
            id: 404,
            nombre: "Cama Ortopédica Mascotas",
            descripcion: "Cama con espuma viscoelástica para mayor comodidad",
            precio: 85000,
            imagen: "https://images.unsplash.com/photo-1520087619250-584c0cbd35e8?w=400",
            opciones: ["S", "M", "L", "XL"],
          },
          {
            id: 405,
            nombre: "Juguete Interactivo",
            descripcion: "Juguete dispensador de premios para entretenimiento",
            precio: 28000,
            imagen: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400",
            opciones: ["Pelota", "Hueso", "Cuerda"],
          },
        ],
      },
    ],
    "5": [
      {
        nombre: "Bebidas Frías",
        productos: [
          {
            id: 501,
            nombre: "Bebida Energizante",
            descripcion: "Bebida energética para mantenerte activo todo el día",
            precio: 6500,
            imagen: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400",
            opciones: ["Original", "Sin azúcar"],
          },
          {
            id: 502,
            nombre: "Cerveza Lata 6 pack",
            descripcion: "Pack de cervezas nacionales lata 355ml",
            precio: 18000,
            imagen: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400",
            opciones: ["Rubia", "Negra"],
          },
        ],
      },
      {
        nombre: "Snacks Rápidos",
        productos: [
          {
            id: 503,
            nombre: "Combo Nachos + Dip",
            descripcion: "Nachos crujientes con dip de queso listo para servir",
            precio: 12000,
            imagen: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400",
            opciones: ["Queso", "Guacamole", "Mixto"],
          },
          {
            id: 504,
            nombre: "Chocolatina Premium",
            descripcion: "Barra de chocolate con leche y almendras",
            precio: 5500,
            imagen: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400",
            opciones: ["Con almendras", "Con maní", "Simple"],
          },
        ],
      },
      {
        nombre: "Productos Básicos",
        productos: [
          {
            id: 505,
            nombre: "Pan Tajado Integral",
            descripcion: "Pan integral fresco ideal para desayunos saludables",
            precio: 6000,
            imagen: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
            opciones: ["Integral", "Blanco", "Multigrano"],
          },
          {
            id: 506,
            nombre: "Huevos AA x 12",
            descripcion: "Docena de huevos frescos de gallinas libres",
            precio: 8500,
            imagen: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400",
            opciones: ["AA", "A", "Jumbo"],
          },
        ],
      },
    ],
  };

  const categoriasDefault = [
    {
      nombre: "Productos Destacados",
      productos: [
        {
          id: 1,
          nombre: "Producto de Ejemplo",
          descripcion: "Descripción del producto de ejemplo",
          precio: 10000,
          imagen: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400",
          opciones: ["Opción 1", "Opción 2"],
        },
      ],
    },
  ];

  const categorias = productosPorTienda[id || "1"] || categoriasDefault;

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

  const handleOpcionToggle = (productoId: number, opcion: string) => {
    setOpcionesSeleccionadas((prev) => {
      const current = prev[productoId] || [];
      if (current.includes(opcion)) {
        return {
          ...prev,
          [productoId]: current.filter((o) => o !== opcion),
        };
      } else {
        return {
          ...prev,
          [productoId]: [...current, opcion],
        };
      }
    });
  };

  const totalItems = Object.values(carrito).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = Object.entries(carrito).reduce((sum, [itemId, qty]) => {
    const producto = categorias
      .flatMap((c) => c.productos)
      .find((p) => p.id === parseInt(itemId));
    return sum + (producto?.precio || 0) * qty;
  }, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={tienda.imagen}
          alt={tienda.nombre}
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

      {/* Store Info */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {tienda.categorias.map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                {tienda.nombre}
              </h1>
              
              <p className="text-muted-foreground mb-4">
                {tienda.descripcion}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-medium">{tienda.rating}</span>
                  <span className="text-muted-foreground">({tienda.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {tienda.tiempoEntrega}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {tienda.distancia}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Products by Category */}
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
                        
                        {/* Options */}
                        {producto.opciones && producto.opciones.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs font-medium text-muted-foreground mb-2">
                              Opciones disponibles:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {producto.opciones.map((opcion) => (
                                <label
                                  key={opcion}
                                  className="flex items-center gap-1.5 text-xs cursor-pointer"
                                >
                                  <Checkbox
                                    checked={(opcionesSeleccionadas[producto.id] || []).includes(opcion)}
                                    onCheckedChange={() => handleOpcionToggle(producto.id, opcion)}
                                    className="w-3.5 h-3.5"
                                  />
                                  <span className="text-muted-foreground">{opcion}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                        
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
              onClick={() => navigate("/carrito", { state: { tiendaNombre: tienda.nombre, items: carrito } })}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Ver carrito ({totalItems}) · {formatPrice(totalPrice)}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TiendaDetallePage;
