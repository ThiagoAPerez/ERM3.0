import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";

/* ===================== TYPES ===================== */

export type UserRole = "CLIENT" | "ADMIN" | "DELIVERY";

export interface LoginResponse {
  accessToken: string; // ✅ nombre correcto
  role: UserRole;
}

/* ===================== COMPONENT ===================== */

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      // 🔐 Login: backend devuelve token + role
      const authRes: LoginResponse = await authService.login(formData);

      switch (authRes.role) {
        case "CLIENT":
          navigate("/dashboard");
          break;

        case "ADMIN":
          navigate("/admin");
          break;

        case "DELIVERY":
          navigate("/domiciliario");
          break;

        default:
          localStorage.removeItem("token");

          toast({
            variant: "destructive",
            title: "Acceso no permitido",
            description: "Rol de usuario no válido",
          });
          return;
      }

      toast({
        title: "Login Exitoso",
        description: "¡Bienvenido de nuevo!",
      });
    } catch (error) {
      localStorage.removeItem("token");

      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: "Credenciales inválidas",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emphasis/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center mb-8">
          <img
            src="/src/assets/logo-elrapidin.png"
            alt="EL RAPIDÍN"
            className="h-20 w-auto object-contain"
          />
        </Link>

        <Card className="glass border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-display">
              Iniciar Sesión
            </CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="identifier">Correo electrónico o número</Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                  <Input
                    id="identifier"
                    name="identifier"
                    type="text"
                    placeholder="3107214521   o   elrapidin@oriente.com"
                    className="pl-10"
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">Recordarme</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-accent hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button
                type="submit"
                variant="hero"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Ingresando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Ingresar
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                ¿No tienes una cuenta?{" "}
              </span>
              <Link
                to="/register"
                className="text-accent hover:underline font-medium"
              >
                Regístrate aquí
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
