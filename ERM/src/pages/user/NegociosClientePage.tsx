import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Clock, MapPin, Filter, Store } from "lucide-react";

const NegociosClientePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "Todos" },
    { id: "restaurante", label: "Restaurantes" },
    { id: "comida_rapida", label: "Comida Rápida" },
    { id: "cafeteria", label: "Cafeterías" },
    { id: "panaderia", label: "Panaderías" },
  ];

  const negocios = [
    {
      id: 1,
      name: "Restaurante La Esquina",
      category: "restaurante",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      rating: 4.8,
      reviews: 124,
      deliveryTime: "25-35 min",
      distance: "1.2 km",
      tags: ["Colombiana", "Casera"],
    },
    {
      id: 2,
      name: "Burger House",
      category: "comida_rapida",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400",
      rating: 4.5,
      reviews: 89,
      deliveryTime: "20-30 min",
      distance: "0.8 km",
      tags: ["Hamburguesas", "Americana"],
    },
    {
      id: 3,
      name: "Café del Parque",
      category: "cafeteria",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
      rating: 4.9,
      reviews: 210,
      deliveryTime: "15-25 min",
      distance: "0.5 km",
      tags: ["Café", "Postres"],
    },
    {
      id: 4,
      name: "Panadería San José",
      category: "panaderia",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
      rating: 4.7,
      reviews: 156,
      deliveryTime: "20-30 min",
      distance: "1.5 km",
      tags: ["Pan artesanal", "Repostería"],
    },
    {
      id: 5,
      name: "Pizza Italiana",
      category: "comida_rapida",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
      rating: 4.6,
      reviews: 178,
      deliveryTime: "30-40 min",
      distance: "2.0 km",
      tags: ["Pizza", "Italiana"],
    },
    {
      id: 6,
      name: "El Asadero",
      category: "restaurante",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
      rating: 4.4,
      reviews: 95,
      deliveryTime: "35-45 min",
      distance: "1.8 km",
      tags: ["Carnes", "Parrilla"],
    },
  ];

  const filteredNegocios = negocios.filter((negocio) => {
    const matchesSearch = negocio.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || negocio.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Restaurantes
            </h1>
            <p className="text-muted-foreground">
              Explora los mejores restaurantes cerca de ti
            </p>
          </div>
          <Link to="/registrar-negocio">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Store className="w-4 h-4 mr-2" />
              Registra tu Negocio
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar restaurantes..."
              className="pl-12 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={
                selectedCategory === category.id 
                  ? "bg-accent text-accent-foreground hover:bg-accent/90 shrink-0" 
                  : "shrink-0 hover:border-accent hover:text-accent"
              }
            >
              {category.label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Negocios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNegocios.map((negocio, index) => (
          <motion.div
            key={negocio.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Link to={`/negocios/${negocio.id}`}>
              <Card className="overflow-hidden border-border hover:border-accent/50 transition-all hover:-translate-y-1 cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={negocio.image}
                    alt={negocio.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">{negocio.name}</h3>
                    <div className="flex gap-2">
                      {negocio.tags.map((tag) => (
                        <Badge key={tag} className="bg-accent/20 text-accent border-accent/30 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-emphasis fill-emphasis" />
                        <span className="text-foreground font-semibold">{negocio.rating}</span>
                        <span className="text-muted-foreground">({negocio.reviews})</span>
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {negocio.deliveryTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {negocio.distance}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredNegocios.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg">No se encontraron restaurantes</p>
          <p className="text-sm text-muted-foreground mt-2">Intenta con otra búsqueda o categoría</p>
        </motion.div>
      )}
    </div>
  );
};

export default NegociosClientePage;
