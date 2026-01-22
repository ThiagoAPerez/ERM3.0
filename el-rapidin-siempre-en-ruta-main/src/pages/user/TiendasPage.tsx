import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Clock, MapPin, ShoppingCart } from "lucide-react";

const TiendasPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "Todas" },
    { id: "supermercado", label: "Supermercados" },
    { id: "farmacia", label: "Farmacias" },
    { id: "licoreria", label: "Licorerías" },
    { id: "mascotas", label: "Mascotas" },
  ];

  const tiendas = [
    {
      id: 1,
      name: "Supermercado El Ahorro",
      category: "supermercado",
      image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400",
      rating: 4.6,
      reviews: 234,
      deliveryTime: "30-45 min",
      distance: "1.0 km",
      tags: ["Abarrotes", "Frutas", "Carnes"],
    },
    {
      id: 2,
      name: "Farmacia Santa Cruz",
      category: "farmacia",
      image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400",
      rating: 4.8,
      reviews: 156,
      deliveryTime: "20-30 min",
      distance: "0.6 km",
      tags: ["Medicamentos", "Cuidado personal"],
    },
    {
      id: 3,
      name: "Licores del Valle",
      category: "licoreria",
      image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400",
      rating: 4.4,
      reviews: 89,
      deliveryTime: "25-35 min",
      distance: "1.3 km",
      tags: ["Vinos", "Licores", "Cervezas"],
    },
    {
      id: 4,
      name: "Pet Shop Amigos",
      category: "mascotas",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
      rating: 4.9,
      reviews: 112,
      deliveryTime: "30-40 min",
      distance: "2.0 km",
      tags: ["Alimentos", "Accesorios", "Juguetes"],
    },
    {
      id: 5,
      name: "Mini Market Express",
      category: "supermercado",
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400",
      rating: 4.3,
      reviews: 67,
      deliveryTime: "15-25 min",
      distance: "0.4 km",
      tags: ["Snacks", "Bebidas", "Básicos"],
    },
  ];

  const filteredTiendas = tiendas.filter((tienda) => {
    const matchesSearch = tienda.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tienda.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Tiendas
        </h1>
        <p className="text-muted-foreground">
          Encuentra todo lo que necesitas en las tiendas cercanas
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 space-y-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tiendas..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-accent text-accent-foreground" : ""}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Tiendas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTiendas.map((tienda, index) => (
          <motion.div
            key={tienda.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Link to={`/tiendas/${tienda.id}`}>
              <Card className="glass border-border/50 overflow-hidden hover:border-accent/50 transition-all hover:-translate-y-1 cursor-pointer">
                <div className="relative h-48">
                  <img
                    src={tienda.image}
                    alt={tienda.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-full bg-accent/90 flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-accent-foreground" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white mb-1">{tienda.name}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {tienda.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-white/20 text-white text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-foreground font-medium">{tienda.rating}</span>
                        <span>({tienda.reviews})</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tienda.deliveryTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {tienda.distance}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredTiendas.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">No se encontraron tiendas</p>
        </motion.div>
      )}
    </div>
  );
};

export default TiendasPage;
