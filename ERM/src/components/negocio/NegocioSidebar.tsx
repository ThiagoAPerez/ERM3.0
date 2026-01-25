import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, History, Store, User } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from "@/components/ui/sidebar";
import logoElRapidin from "@/assets/logo-elrapidin.png";
const menuItems = [{
  title: "Dashboard",
  url: "/negocio/dashboard",
  icon: LayoutDashboard
}, {
  title: "Pedidos",
  url: "/negocio/pedidos",
  icon: Package
}, {
  title: "Historial",
  url: "/negocio/historial",
  icon: History
}, {
  title: "Perfil",
  url: "/negocio/perfil",
  icon: User
}];
const NegocioSidebar = () => {
  return <Sidebar className="border-r border-border bg-sidebar">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-background flex items-center justify-center">
            <img src={logoElRapidin} alt="EL RAPIDÍN" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-sidebar-foreground">EL RAPIDÍN</h2>
            <p className="text-xs text-primary">Panel Negocio</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={({
                  isActive
                }) => isActive ? "bg-accent/20 text-accent border-l-2 border-accent" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-accent transition-colors"}>
                      <item.icon className="w-4 h-4" />
                      <span className="">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
};
export default NegocioSidebar;