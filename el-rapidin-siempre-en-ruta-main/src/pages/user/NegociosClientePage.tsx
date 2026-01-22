import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Clock, MapPin, Filter, Store } from "lucide-react";
import { api } from "@/lib/api";

interface Business {
  id: number;
  name: string;
  description?: string;
  municipality?: string;
  logoUrl?: string;
  preparationTimeMinutes?: number;
}

const NegociosClientePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [negocios, setNegocios] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", label: "Todos" },
    { id: "restaurante", label: "Restaurantes" },
    { id: "comida_rapida", label: "Comida Rápida" },
    { id: "cafeteria", label: "Cafeterías" },
    { id: "panaderia", label: "Panaderías" },
  ];

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await api.get<Business[]>("/businesses");
        setNegocios(res.data);
      } catch (error) {
        console.error("Error cargando negocios", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const filteredNegocios = negocios.filter((negocio) =>
    negocio.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Cargando negocios...</p>
      </div>
    );
  }

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
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Store className="w-4 h-4 mr-2" />
              Registra tu Negocio
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Search */}
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
      </motion.div>

      {/* Grid */}
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
                    src={
                      negocio.logoUrl ||
                      "https://via.placeholder.com/400x300?text=Negocio"
                    }
                    alt={negocio.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">
                      {negocio.name}
                    </h3>
                    <div className="flex gap-2">
                      <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                        {negocio.municipality ?? "Disponible"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-emphasis fill-emphasis" />
                        <span className="text-foreground font-semibold">
                          4.5
                        </span>
                        <span className="text-muted-foreground">(100+)</span>
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {negocio.preparationTimeMinutes ?? 20} min
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      Cerca
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
          <p className="text-muted-foreground text-lg">
            No se encontraron restaurantes
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default NegociosClientePage;
