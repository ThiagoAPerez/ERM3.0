import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ShoppingBag, MapPin, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

const municipios = [
  { value: "all", label: "Todas las ubicaciones" },
  { value: "marinilla", label: "Marinilla" },
  { value: "el-retiro", label: "El Retiro" },
  { value: "la-ceja", label: "La Ceja" },
  { value: "rionegro", label: "Rionegro" },
  { value: "el-carmen", label: "El Carmen de Viboral" },
  { value: "guarne", label: "Guarne" },
  { value: "el-santuario", label: "El Santuario" },
  { value: "san-vicente", label: "San Vicente" },
];

const UserHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const location = useLocation();

  const navItems = [
    { label: "Negocios", href: "/negocios" },
    { label: "Tiendas", href: "/tiendas" },
    { label: "Servicios", href: "/servicios" },
    { label: "Pedidos", href: "/pedidos" },
  ];

  const isActive = (href: string) => location.pathname === href;

  // Mock user data
  const user = {
    name: "Juan Pérez",
    email: "juan@example.com",
    avatar: null,
  };

  const selectedMunicipio = municipios.find(m => m.value === selectedLocation);

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
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
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
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[200px] bg-muted/50 border-border/50 focus:ring-emphasis">
                <MapPin className="w-4 h-4 mr-2 text-emphasis" />
                <SelectValue placeholder="Ubicación" />
              </SelectTrigger>
              <SelectContent>
                {municipios.map((municipio) => (
                  <SelectItem key={municipio.value} value={municipio.value}>
                    {municipio.label}
                  </SelectItem>
                ))}
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
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/perfil" className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Mi Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/perfil/direcciones" className="cursor-pointer">
                    <MapPin className="w-4 h-4 mr-2" />
                    Mis Direcciones
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login" className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden border-t border-border/50 bg-card/95 backdrop-blur-xl"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Location Selector - Mobile */}
            <div className="pb-4 border-b border-border/50">
              <p className="text-xs text-muted-foreground mb-2">Ubicación</p>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full bg-muted/50 border-border/50">
                  <MapPin className="w-4 h-4 mr-2 text-emphasis" />
                  <SelectValue placeholder="Seleccionar ubicación" />
                </SelectTrigger>
                <SelectContent>
                  {municipios.map((municipio) => (
                    <SelectItem key={municipio.value} value={municipio.value}>
                      {municipio.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`block font-medium py-2 ${
                  isActive(item.href) ? "text-accent" : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border/50 space-y-3">
              <Button variant="hero" className="w-full" asChild>
                <Link to="/orden/crear">Nueva Orden</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/perfil">Mi Perfil</Link>
              </Button>
              <Button variant="ghost" className="w-full text-destructive" asChild>
                <Link to="/login">Cerrar Sesión</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default UserHeader;
