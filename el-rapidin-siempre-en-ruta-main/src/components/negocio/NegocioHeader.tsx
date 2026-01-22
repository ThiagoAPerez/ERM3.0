import { useState } from "react";
import { Bell, LogOut, User, Package, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NegocioHeader = () => {
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Mock data
  const negocio = {
    nombre: "Restaurante El Sabor",
    logo: "",
    pedidosNuevos: 3
  };

  const notificaciones = [
    {
      id: 1,
      titulo: "Nuevo pedido #1234",
      descripcion: "Tienes un nuevo pedido pendiente",
      tiempo: "Hace 5 min",
      leida: false
    },
    {
      id: 2,
      titulo: "Pedido #1230 entregado",
      descripcion: "El pedido fue entregado exitosamente",
      tiempo: "Hace 15 min",
      leida: false
    },
    {
      id: 3,
      titulo: "Nueva calificación",
      descripcion: "Un cliente te calificó con 5 estrellas",
      tiempo: "Hace 1 hora",
      leida: false
    }
  ];

  const handleLogout = () => {
    navigate("/negocio/login");
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-foreground hover:text-accent" />
        <div>
          <h1 className="font-display font-semibold text-foreground">{negocio.nombre}</h1>
          <p className="text-xs text-muted-foreground">Panel de control</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notificaciones */}
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-foreground hover:text-accent hover:bg-accent/10">
              <Bell className="w-5 h-5" />
              {negocio.pedidosNuevos > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground"
                >
                  {negocio.pedidosNuevos}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0 bg-card border-border">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-display font-semibold text-foreground">Notificaciones</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
                onClick={() => setNotificationsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notificaciones.map((notif) => (
                <div 
                  key={notif.id}
                  className="p-4 border-b border-border last:border-b-0 hover:bg-accent/10 cursor-pointer transition-colors"
                  onClick={() => {
                    navigate("/negocio/pedidos");
                    setNotificationsOpen(false);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-accent/20">
                      <Package className="w-4 h-4 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{notif.titulo}</p>
                      <p className="text-xs text-muted-foreground">{notif.descripcion}</p>
                      <p className="text-xs text-emphasis mt-1">{notif.tiempo}</p>
                    </div>
                    {!notif.leida && (
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border">
              <Button 
                variant="ghost" 
                className="w-full text-sm text-accent hover:bg-accent/10"
                onClick={() => {
                  navigate("/negocio/pedidos");
                  setNotificationsOpen(false);
                }}
              >
                Ver todos los pedidos
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Perfil */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-accent/10">
              <Avatar className="h-8 w-8 border-2 border-accent">
                <AvatarImage src={negocio.logo} />
                <AvatarFallback className="bg-gradient-to-br from-accent to-emphasis text-white font-bold">
                  {negocio.nombre.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card border-border">
            <DropdownMenuLabel className="text-foreground">Mi Negocio</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem 
              onClick={() => navigate("/negocio/perfil")}
              className="text-foreground hover:bg-accent/10 hover:text-accent cursor-pointer"
            >
              <User className="w-4 h-4 mr-2" />
              Ver perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem 
              onClick={handleLogout} 
              className="text-destructive hover:bg-destructive/10 cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default NegocioHeader;
