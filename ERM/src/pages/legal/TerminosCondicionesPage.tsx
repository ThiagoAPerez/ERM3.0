import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TerminosCondicionesPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Aceptación de los Términos",
      content: `Al acceder y utilizar la plataforma El Rapidín, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio.

Nos reservamos el derecho de modificar estos términos en cualquier momento. Su uso continuado del servicio después de dichos cambios constituye su aceptación de los nuevos términos.`,
    },
    {
      title: "2. Descripción del Servicio",
      content: `El Rapidín es una plataforma de intermediación que conecta usuarios con restaurantes, tiendas y servicios de entrega. Nuestros servicios incluyen:

• Pedidos de comida a domicilio
• Servicio de paquetería
• Servicio de motocarguero
• Encargos especiales

No somos responsables de la calidad de los productos entregados por terceros.`,
    },
    {
      title: "3. Registro y Cuenta",
      content: `Para utilizar nuestros servicios, debe:

• Ser mayor de 18 años
• Proporcionar información veraz y actualizada
• Mantener la confidencialidad de su cuenta
• Notificarnos inmediatamente sobre cualquier uso no autorizado

Usted es responsable de todas las actividades que ocurran bajo su cuenta.`,
    },
    {
      title: "4. Pedidos y Pagos",
      content: `Al realizar un pedido:

• Los precios mostrados incluyen impuestos aplicables
• El costo de envío se muestra antes de confirmar el pedido
• Aceptamos pagos por PSE, tarjetas y efectivo contra entrega
• Los pedidos son vinculantes una vez confirmados

Nos reservamos el derecho de cancelar pedidos en caso de:
• Información incorrecta
• Productos no disponibles
• Problemas de pago`,
    },
    {
      title: "5. Entregas",
      content: `Sobre nuestras entregas:

• Los tiempos de entrega son estimados
• Factores externos pueden afectar los tiempos
• El cliente debe estar disponible para recibir el pedido
• Si el cliente no está disponible, se intentará contactar

No nos hacemos responsables por demoras causadas por:
• Condiciones climáticas adversas
• Tráfico inusual
• Direcciones incorrectas proporcionadas por el cliente`,
    },
    {
      title: "6. Cancelaciones y Reembolsos",
      content: `Política de cancelaciones:

• Puede cancelar un pedido antes de que sea preparado
• Una vez iniciada la preparación, no se admiten cancelaciones
• Reembolsos aplicables solo en casos justificados

Para solicitar un reembolso, contacte a nuestro servicio al cliente dentro de las 24 horas siguientes a la entrega.`,
    },
    {
      title: "7. Conducta del Usuario",
      content: `Los usuarios se comprometen a:

• No usar el servicio para fines ilegales
• No acosar o amenazar a domiciliarios o personal
• No proporcionar información falsa
• No intentar acceder a áreas restringidas del sistema
• Tratar con respeto a todos los involucrados en el servicio

El incumplimiento puede resultar en la suspensión de su cuenta.`,
    },
    {
      title: "8. Propiedad Intelectual",
      content: `Todo el contenido de la plataforma, incluyendo pero no limitado a:

• Logos y marcas
• Diseño e interfaz
• Textos y contenido
• Software y código

Es propiedad de El Rapidín o sus licenciantes y está protegido por leyes de propiedad intelectual.`,
    },
    {
      title: "9. Limitación de Responsabilidad",
      content: `El Rapidín no será responsable por:

• Daños indirectos o consecuentes
• Pérdida de datos o beneficios
• Interrupciones del servicio
• Acciones de terceros

Nuestra responsabilidad máxima se limita al valor del pedido afectado.`,
    },
    {
      title: "10. Ley Aplicable",
      content: `Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa será resuelta en los tribunales competentes de Bogotá, Colombia.`,
    },
    {
      title: "11. Contacto",
      content: `Para consultas sobre estos términos:

• Email: legal@elrapidin.com
• Teléfono: +57 300 123 4567
• Dirección: Calle Principal #123, Bogotá, Colombia`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Términos y Condiciones
                </h1>
                <p className="text-muted-foreground">
                  Última actualización: Enero 2024
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground text-lg">
              Por favor lea atentamente estos términos y condiciones antes de utilizar 
              nuestros servicios. Al usar El Rapidín, usted acepta cumplir con estos términos.
            </p>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-xl p-6"
              >
                <h2 className="text-xl font-display font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TerminosCondicionesPage;
