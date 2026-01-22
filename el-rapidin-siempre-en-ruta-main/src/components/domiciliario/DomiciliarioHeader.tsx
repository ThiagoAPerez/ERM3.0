import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const DomiciliarioHeader = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  // Mock domiciliario data
  const domiciliario = {
    name: "Carlos Pérez",
    avatar: null,
    pedidosActivos: 1,
  };

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Estado:</span>
          <div className="flex items-center gap-2">
            <Switch
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
              className="data-[state=checked]:bg-success"
            />
            <span className={`text-sm font-medium ${isAvailable ? "text-success" : "text-muted-foreground"}`}>
              {isAvailable ? "Disponible" : "No disponible"}
            </span>
          </div>
        </div>
        {domiciliario.pedidosActivos > 0 && (
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
            {domiciliario.pedidosActivos} pedido activo
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={domiciliario.avatar || undefined} />
                <AvatarFallback className="bg-emphasis/20 text-emphasis">
                  {domiciliario.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-medium">{domiciliario.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link to="/domiciliario/perfil" className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Mi Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login" className="cursor-pointer text-destructive">
                Cerrar Sesión
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DomiciliarioHeader;
