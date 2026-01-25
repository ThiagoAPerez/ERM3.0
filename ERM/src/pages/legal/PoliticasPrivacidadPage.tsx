import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PoliticasPrivacidadPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Información que Recopilamos",
      content: `Recopilamos información que usted nos proporciona directamente cuando:
      
• Se registra para una cuenta
• Realiza un pedido o transacción
• Se comunica con nuestro servicio de atención al cliente
• Participa en encuestas o promociones

Esta información puede incluir su nombre, dirección de correo electrónico, número de teléfono, dirección de entrega y preferencias de pago.`,
    },
    {
      title: "2. Uso de la Información",
      content: `Utilizamos la información recopilada para:

• Procesar y entregar sus pedidos
• Comunicarnos con usted sobre su cuenta y pedidos
• Enviar actualizaciones, ofertas promocionales y novedades
• Mejorar nuestros servicios y experiencia de usuario
• Cumplir con obligaciones legales`,
    },
    {
      title: "3. Compartir Información",
      content: `Podemos compartir su información con:

• Restaurantes y negocios afiliados para procesar sus pedidos
• Domiciliarios para realizar las entregas
• Proveedores de servicios de pago
• Autoridades legales cuando sea requerido por ley

No vendemos ni alquilamos su información personal a terceros con fines de marketing.`,
    },
    {
      title: "4. Seguridad de Datos",
      content: `Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal, incluyendo:

• Encriptación de datos sensibles
• Acceso restringido a información personal
• Monitoreo continuo de nuestros sistemas
• Actualizaciones regulares de seguridad`,
    },
    {
      title: "5. Sus Derechos",
      content: `Usted tiene derecho a:

• Acceder a sus datos personales
• Rectificar información incorrecta
• Solicitar la eliminación de sus datos
• Oponerse al procesamiento de sus datos
• Portabilidad de datos

Para ejercer estos derechos, contáctenos a través de nuestros canales oficiales.`,
    },
    {
      title: "6. Cookies y Tecnologías Similares",
      content: `Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestra plataforma. Para más información, consulte nuestra Política de Cookies.`,
    },
    {
      title: "7. Cambios a esta Política",
      content: `Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos sobre cambios significativos a través de nuestra plataforma o por correo electrónico.`,
    },
    {
      title: "8. Contacto",
      content: `Si tiene preguntas sobre esta política de privacidad o sobre cómo manejamos su información, puede contactarnos a:

• Email: privacidad@elrapidin.com
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
                <Shield className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Políticas de Privacidad
                </h1>
                <p className="text-muted-foreground">
                  Última actualización: Enero 2024
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground text-lg">
              En El Rapidín, nos comprometemos a proteger su privacidad y garantizar 
              la seguridad de su información personal. Esta política describe cómo 
              recopilamos, usamos y protegemos sus datos.
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

export default PoliticasPrivacidadPage;
