import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Banknote,
  Shield,
  ArrowRight,
  CheckCircle2,
  Building,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PagoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const orderData = location.state || {
    total: "$15,000",
  };

  const paymentMethods = [
    {
      id: "pse",
      icon: Building,
      title: "PSE",
      description: "Pago seguro con tu banco",
      badge: "Popular",
    },
    {
      id: "efectivo",
      icon: Banknote,
      title: "Efectivo",
      description: "Paga al recibir tu pedido",
      badge: null,
    },
    {
      id: "tarjeta",
      icon: CreditCard,
      title: "Tarjeta",
      description: "Crédito o débito",
      badge: "Próximamente",
      disabled: true,
    },
  ];

  const handlePayment = async () => {
    if (!paymentMethod) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "¡Orden confirmada!",
      description: "Tu pedido ha sido enviado. Pronto recibirás actualizaciones.",
    });

    setIsProcessing(false);
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">
          Método de Pago
        </h1>
        <p className="text-muted-foreground">
          Selecciona cómo quieres pagar tu pedido
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Payment Methods */}
        <Card className="glass border-border/50 mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Selecciona un método</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-4"
            >
              {paymentMethods.map((method) => (
                <Label
                  key={method.id}
                  htmlFor={method.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    method.disabled
                      ? "opacity-50 cursor-not-allowed border-border/30"
                      : paymentMethod === method.id
                      ? "border-accent bg-accent/10 cursor-pointer"
                      : "border-border/50 hover:border-accent/50 cursor-pointer"
                  }`}
                >
                  <RadioGroupItem
                    value={method.id}
                    id={method.id}
                    className="sr-only"
                    disabled={method.disabled}
                  />
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      paymentMethod === method.id && !method.disabled
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{method.title}</p>
                      {method.badge && (
                        <Badge
                          variant="outline"
                          className={
                            method.disabled
                              ? "text-muted-foreground border-muted"
                              : "text-accent border-accent/30"
                          }
                        >
                          {method.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                  {!method.disabled && paymentMethod === method.id && (
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  )}
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* PSE Banks (if selected) */}
        {paymentMethod === "pse" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <Card className="glass border-border/50 mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Selecciona tu banco</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Bancolombia",
                    "Davivienda",
                    "BBVA",
                    "Banco de Bogotá",
                    "Nequi",
                    "Daviplata",
                  ].map((bank) => (
                    <Button
                      key={bank}
                      variant="outline"
                      className="justify-start h-auto py-3"
                    >
                      <Building className="w-4 h-4 mr-2 text-muted-foreground" />
                      {bank}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Cash Instructions (if selected) */}
        {paymentMethod === "efectivo" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <Card className="glass border-border/50 border-accent/30 bg-accent/5 mb-6">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Banknote className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Pago en efectivo</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ten el monto exacto listo para cuando llegue el domiciliario. 
                      El pago se realiza al momento de la entrega.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Order Summary */}
        <Card className="glass border-border/50 mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total a pagar</span>
              <span className="text-2xl font-bold text-accent">{orderData.total}</span>
            </div>
          </CardContent>
        </Card>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
          <Shield className="w-4 h-4" />
          <span>Pago seguro y protegido</span>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex-1"
          >
            Volver
          </Button>
          <Button
            variant="hero"
            onClick={handlePayment}
            className="flex-1"
            disabled={!paymentMethod || isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Procesando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Confirmar Pago
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PagoPage;
