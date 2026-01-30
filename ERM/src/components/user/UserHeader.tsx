import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ShoppingBag, MapPin, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";

/* ===================== TYPES ===================== */

export type DeliveryZone =
  | "MARINILLA"
  | "RIONEGRO"
  | "EL_CARMEN"
  | "NOASIGNADO";

export interface ClientMeResponse {
  user: {
    id: number;
    name: string;
    phone: string;
    email: string;
    role: "CLIENT";
    status: "ACTIVE" | "SUSPENDED";
  };
  clientProfile: {
    name: string;
    phone: string;
    profilePhotoUrl: string | null;
  };
}

/* ===================== COMPONENT ===================== */

const UserHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>("MARINILLA");

  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Negocios", href: "/negocios" },
    { label: "Tiendas", href: "/tiendas" },
    { label: "Servicios", href: "/servicios" },
    { label: "Pedidos", href: "/pedidos" },
  ];

  const isActive = (href: string) => location.pathname === href;

  /* ===================== USER ===================== */

  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string | null;
  } | null>(null);

  /* ===================== DELIVERY ZONE LABELS ===================== */

  const DELIVERY_ZONE_LABELS: Record<DeliveryZone, string> = {
    MARINILLA: "Marinilla",
    RIONEGRO: "Rionegro",
    EL_CARMEN: "El Carmen de Viboral",
    NOASIGNADO: "",
  };

  /* ===================== LOAD CLIENT ===================== */

  useEffect(() => {
    api
      .get<ClientMeResponse>("/client/me")
      .then((res) => {
        setUser({
          name: res.data.clientProfile.name,
          email: res.data.user.email,
          avatar: res.data.clientProfile.profilePhotoUrl,
        });
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  /* ===================== LOGOUT ===================== */

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  /* ===================== RENDER ===================== */

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-emphasis flex items-center justify-center font-display font-bold text-emphasis-foreground text-lg">
                  R
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-accent to-emphasis opacity-30 blur-lg rounded-lg group-hover:opacity-50 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-foreground tracking-tight">
                  EL RAPIDÍN
                </span>
                <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
                  Siempre en Ruta
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Location Selector - Desktop */}
          <div className="hidden lg:flex items-center">
            <Select
              value={selectedZone}
              onValueChange={(value) => setSelectedZone(value as DeliveryZone)}
            >
              <SelectTrigger className="w-[200px] bg-muted/50 border-border/50 focus:ring-emphasis">
                <MapPin className="w-4 h-4 mr-2 text-emphasis" />
                <SelectValue placeholder="Ubicación" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(DELIVERY_ZONE_LABELS) as DeliveryZone[]).map(
                  (zone) => (
                    <SelectItem key={zone} value={zone}>
                      {DELIVERY_ZONE_LABELS[zone]}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.div key={item.label} whileHover={{ y: -2 }}>
                <Link
                  to={item.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    isActive(item.href)
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                      isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="hero" size="sm" asChild>
              <Link to="/orden/crear">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Nueva Orden
              </Link>
            </Button>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar || undefined} />
                      <AvatarFallback className="bg-accent/20 text-accent">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/perfil" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Mi Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default UserHeader;
