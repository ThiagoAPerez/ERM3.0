import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  History,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/domiciliario/dashboard",
  },
  {
    title: "Pedidos",
    icon: Package,
    href: "/domiciliario/pedidos",
  },
  {
    title: "Historial",
    icon: History,
    href: "/domiciliario/historial",
  },
  {
    title: "Mi Perfil",
    icon: User,
    href: "/domiciliario/perfil",
  },
];

const DomiciliarioSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-sidebar border-r border-sidebar-border flex flex-col sticky top-0"
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <motion.div
            initial={false}
            animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto" }}
            className="flex items-center gap-3 overflow-hidden"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-emphasis flex items-center justify-center font-display font-bold text-emphasis-foreground text-lg shrink-0">
              R
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-display font-bold text-foreground">
                EL RAPIDÍN
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                Domiciliario
              </span>
            </div>
          </motion.div>
          
          {collapsed && (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-emphasis flex items-center justify-center font-display font-bold text-emphasis-foreground text-lg mx-auto">
              R
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border hover:bg-emphasis hover:text-emphasis-foreground z-10"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== "/domiciliario/dashboard" && location.pathname.startsWith(item.href));
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                isActive
                  ? "bg-emphasis/10 text-emphasis"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="domiciliarioActiveIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emphasis rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={cn(
                "w-5 h-5 shrink-0 transition-colors",
                isActive ? "text-emphasis" : "group-hover:text-emphasis"
              )} />
              <motion.span
                initial={false}
                animate={{ 
                  opacity: collapsed ? 0 : 1,
                  width: collapsed ? 0 : "auto"
                }}
                className="font-medium whitespace-nowrap overflow-hidden"
              >
                {item.title}
              </motion.span>
              
              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-card border border-border rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                  {item.title}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <NavLink
          to="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <motion.span
            initial={false}
            animate={{ 
              opacity: collapsed ? 0 : 1,
              width: collapsed ? 0 : "auto"
            }}
            className="font-medium whitespace-nowrap overflow-hidden"
          >
            Salir
          </motion.span>
        </NavLink>
      </div>
    </motion.aside>
  );
};

export default DomiciliarioSidebar;
