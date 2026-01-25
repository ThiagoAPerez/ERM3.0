import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RegistrarNegocioPage from "./pages/RegistrarNegocioPage";
import OpinionesPage from "./pages/OpinionesPage";
import NotFound from "./pages/NotFound";

// Admin imports
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NegociosPage from "./pages/admin/NegociosPage";
import TiendasAdminPage from "./pages/admin/TiendasAdminPage";
import ProductosPage from "./pages/admin/ProductosPage";
import DomiciliariosPage from "./pages/admin/DomiciliariosPage";
import ServiciosPage from "./pages/admin/ServiciosPage";
import ConfiguracionPage from "./pages/admin/ConfiguracionPage";

// Auth imports
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// User imports
import UserLayout from "./components/user/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import NegociosClientePage from "./pages/user/NegociosClientePage";
import NegocioDetallePage from "./pages/user/NegocioDetallePage";
import TiendasPage from "./pages/user/TiendasPage";
import TiendaDetallePage from "./pages/user/TiendaDetallePage";
import ServiciosClientePage from "./pages/user/ServiciosClientePage";
import MotocargueroPage from "./pages/user/MotocargueroPage";
import PaqueteriaPage from "./pages/user/PaqueteriaPage";
import CrearOrdenPage from "./pages/user/CrearOrdenPage";
import CarritoPage from "./pages/user/CarritoPage";
import ConfirmarOrdenPage from "./pages/user/ConfirmarOrdenPage";
import CalificarOrdenPage from "./pages/user/CalificarOrdenPage";
import PagoPage from "./pages/user/PagoPage";
import MisPedidosPage from "./pages/user/MisPedidosPage";
import PedidoDetalleUserPage from "./pages/user/PedidoDetallePage";
import PerfilPage from "./pages/user/PerfilPage";
import DireccionesPage from "./pages/user/DireccionesPage";
import SeguridadPage from "./pages/user/SeguridadPage";

// Domiciliario imports
import DomiciliarioLayout from "./components/domiciliario/DomiciliarioLayout";
import LoginDomiciliarioPage from "./pages/domiciliario/LoginDomiciliarioPage";
import DomiciliarioDashboard from "./pages/domiciliario/DomiciliarioDashboard";
import PedidosDisponiblesPage from "./pages/domiciliario/PedidosDisponiblesPage";
import PedidoDetalleDomiciliarioPage from "./pages/domiciliario/PedidoDetallePage";
import HistorialPedidosPage from "./pages/domiciliario/HistorialPedidosPage";
import PerfilDomiciliarioPage from "./pages/domiciliario/PerfilDomiciliarioPage";
import SeguridadDomiciliarioPage from "./pages/domiciliario/SeguridadDomiciliarioPage";

// Negocio imports
import NegocioLayout from "./components/negocio/NegocioLayout";
import LoginNegocioPage from "./pages/negocio/LoginNegocioPage";
import NegocioDashboard from "./pages/negocio/NegocioDashboard";
import PedidosNegocioPage from "./pages/negocio/PedidosNegocioPage";
import PedidoDetalleNegocioPage from "./pages/negocio/PedidoDetalleNegocioPage";
import HistorialNegocioPage from "./pages/negocio/HistorialNegocioPage";
import PerfilNegocioPage from "./pages/negocio/PerfilNegocioPage";

// Legal imports
import PoliticasPrivacidadPage from "./pages/legal/PoliticasPrivacidadPage";
import TerminosCondicionesPage from "./pages/legal/TerminosCondicionesPage";
import CookiesPage from "./pages/legal/CookiesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/registrar-negocio" element={<RegistrarNegocioPage />} />
          <Route path="/opiniones" element={<OpinionesPage />} />
          
          {/* Legal Routes */}
          <Route path="/politicas-privacidad" element={<PoliticasPrivacidadPage />} />
          <Route path="/terminos-condiciones" element={<TerminosCondicionesPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* User Routes */}
          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/negocios" element={<NegociosClientePage />} />
            <Route path="/negocios/:id" element={<NegocioDetallePage />} />
            <Route path="/tiendas" element={<TiendasPage />} />
            <Route path="/tiendas/:id" element={<TiendaDetallePage />} />
            <Route path="/servicios" element={<ServiciosClientePage />} />
            <Route path="/servicios/motocarguero" element={<MotocargueroPage />} />
            <Route path="/servicios/paqueteria" element={<PaqueteriaPage />} />
            <Route path="/orden/crear" element={<CrearOrdenPage />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/orden/confirmar" element={<ConfirmarOrdenPage />} />
            <Route path="/orden/calificar/:orderId" element={<CalificarOrdenPage />} />
            <Route path="/orden/pago" element={<PagoPage />} />
            <Route path="/pedidos" element={<MisPedidosPage />} />
            <Route path="/pedidos/:id" element={<PedidoDetalleUserPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/perfil/direcciones" element={<DireccionesPage />} />
            <Route path="/perfil/seguridad" element={<SeguridadPage />} />
          </Route>
          
          {/* Domiciliario Routes */}
          <Route path="/domiciliario/login" element={<LoginDomiciliarioPage />} />
          <Route path="/domiciliario" element={<DomiciliarioLayout />}>
            <Route path="dashboard" element={<DomiciliarioDashboard />} />
            <Route path="pedidos" element={<PedidosDisponiblesPage />} />
            <Route path="pedido/:id" element={<PedidoDetalleDomiciliarioPage />} />
            <Route path="historial" element={<HistorialPedidosPage />} />
            <Route path="perfil" element={<PerfilDomiciliarioPage />} />
            <Route path="seguridad" element={<SeguridadDomiciliarioPage />} />
          </Route>
          
          {/* Negocio Routes */}
          <Route path="/negocio/login" element={<LoginNegocioPage />} />
          <Route path="/negocio" element={<NegocioLayout />}>
            <Route path="dashboard" element={<NegocioDashboard />} />
            <Route path="pedidos" element={<PedidosNegocioPage />} />
            <Route path="pedido/:id" element={<PedidoDetalleNegocioPage />} />
            <Route path="historial" element={<HistorialNegocioPage />} />
            <Route path="perfil" element={<PerfilNegocioPage />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="negocios" element={<NegociosPage />} />
            <Route path="tiendas" element={<TiendasAdminPage />} />
            <Route path="productos" element={<ProductosPage />} />
            <Route path="domiciliarios" element={<DomiciliariosPage />} />
            <Route path="servicios" element={<ServiciosPage />} />
            <Route path="configuracion" element={<ConfiguracionPage />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
