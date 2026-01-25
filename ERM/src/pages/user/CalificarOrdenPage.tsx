import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Store, Bike, CheckCircle, ArrowLeft, Package, Calendar, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const CalificarOrdenPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [negocioRating, setNegocioRating] = useState(0);
  const [negocioComentario, setNegocioComentario] = useState("");
  const [domiciliarioRating, setDomiciliarioRating] = useState(0);
  const [domiciliarioComentario, setDomiciliarioComentario] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock order data based on orderId
  const orden = {
    id: orderId || "ORD-2024-001",
    negocio: "La Burger House",
    negocioImagen: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100",
    domiciliario: "Carlos Mendoza",
    domiciliarioImagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    tipoServicio: "Delivery",
    fechaEntrega: "15 de Enero, 2024 - 2:35 PM",
    direccion: "Cra 45 #23-12, Marinilla",
    total: "$45.000",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (negocioRating === 0 || domiciliarioRating === 0) {
      toast({
        title: "Calificación requerida",
        description: "Por favor califica tanto al negocio como al domiciliario",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "¡Gracias por tu opinión!",
      description: "Tu calificación nos ayuda a mejorar el servicio",
    });
  };

  const StarRating = ({ 
    rating, 
    onRate, 
    label 
  }: { 
    rating: number; 
    onRate: (rating: number) => void; 
    label: string;
  }) => (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRate(star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                star <= rating
                  ? "fill-accent text-accent"
                  : "text-muted-foreground/30 hover:text-accent/50"
              }`}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-3">
              ¡Gracias por calificar!
            </h1>
            <p className="text-muted-foreground mb-8">
              Tu opinión nos ayuda a mejorar y a mantener la calidad del servicio.
            </p>
            <Button variant="hero" onClick={() => navigate("/dashboard")}>
              Volver al inicio
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Califica tu pedido
          </h1>
          <p className="text-muted-foreground">
            Tu opinión nos ayuda a mejorar
          </p>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-accent/10 to-emphasis/10 px-4 py-3 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-accent" />
                  <span className="font-medium text-foreground">Pedido #{orden.id}</span>
                </div>
                <Badge variant="secondary" className="bg-green-500/20 text-green-600">
                  Entregado
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={orden.negocioImagen} 
                    alt={orden.negocio}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{orden.negocio}</p>
                    <p className="text-sm text-muted-foreground">{orden.tipoServicio}</p>
                  </div>
                  <p className="font-bold text-accent">{orden.total}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{orden.fechaEntrega}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{orden.direccion}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rate Business */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center overflow-hidden">
                    <Store className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <span className="block">Califica al negocio</span>
                    <span className="text-sm font-normal text-muted-foreground">{orden.negocio}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <StarRating
                  rating={negocioRating}
                  onRate={setNegocioRating}
                  label="¿Qué tal estuvo la comida y el servicio?"
                />
                <Textarea
                  placeholder="Cuéntanos sobre tu experiencia con el negocio... (opcional)"
                  value={negocioComentario}
                  onChange={(e) => setNegocioComentario(e.target.value)}
                  rows={3}
                  className="bg-background/50"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Rate Delivery Person */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center overflow-hidden">
                    <Bike className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <span className="block">Califica al domiciliario</span>
                    <span className="text-sm font-normal text-muted-foreground">{orden.domiciliario}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <StarRating
                  rating={domiciliarioRating}
                  onRate={setDomiciliarioRating}
                  label="¿Cómo fue la entrega?"
                />
                <Textarea
                  placeholder="Cuéntanos sobre tu experiencia con el domiciliario... (opcional)"
                  value={domiciliarioComentario}
                  onChange={(e) => setDomiciliarioComentario(e.target.value)}
                  rows={3}
                  className="bg-background/50"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              type="submit"
              variant="hero"
              className="w-full h-12 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Enviando calificación...
                </>
              ) : (
                "Enviar calificación"
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default CalificarOrdenPage;
