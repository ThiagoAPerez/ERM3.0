import { Outlet } from "react-router-dom";
import NegocioSidebar from "./NegocioSidebar";
import NegocioHeader from "./NegocioHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

const NegocioLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <NegocioSidebar />
        <div className="flex-1 flex flex-col">
          <NegocioHeader />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default NegocioLayout;
