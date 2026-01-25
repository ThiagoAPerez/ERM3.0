import { motion } from "framer-motion";
import { ArrowLeft, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CookiesPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. ¿Qué son las Cookies?",
      content: `Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestra plataforma. Estas nos ayudan a:

• Recordar sus preferencias
• Mejorar su experiencia de navegación
• Analizar el uso de nuestra plataforma
• Personalizar el contenido que ve`,
    },
    {
      title: "2. Tipos de Cookies que Utilizamos",
      content: `Utilizamos diferentes tipos de cookies:

**Cookies Esenciales**
Necesarias para el funcionamiento básico del sitio. Sin estas, no podría navegar por el sitio ni usar funciones esenciales.

**Cookies de Rendimiento**
Nos ayudan a entender cómo los visitantes interactúan con nuestra plataforma, permitiéndonos mejorar el funcionamiento.

**Cookies Funcionales**
Permiten recordar las elecciones que hace (como su nombre de usuario, idioma o región) para proporcionar una experiencia más personalizada.

**Cookies de Marketing**
Se utilizan para rastrear visitantes en diferentes sitios web. La intención es mostrar anuncios que sean relevantes para el usuario.`,
    },
    {
      title: "3. Cookies de Terceros",
      content: `Algunos de nuestros socios pueden establecer cookies en su dispositivo:

• **Google Analytics**: Para analizar el tráfico del sitio
• **Redes Sociales**: Para integrar funciones de compartir
• **Proveedores de Pago**: Para procesar transacciones seguras

Estas cookies están sujetas a las políticas de privacidad de terceros.`,
    },
    {
      title: "4. Duración de las Cookies",
      content: `Las cookies pueden ser:

**Cookies de Sesión**
Se eliminan cuando cierra su navegador.

**Cookies Persistentes**
Permanecen en su dispositivo durante un período específico o hasta que las elimine manualmente.

La mayoría de nuestras cookies persisten entre 30 días y 1 año.`,
    },
    {
      title: "5. Gestión de Cookies",
      content: `Puede controlar y gestionar las cookies de varias formas:

**Configuración del Navegador**
La mayoría de los navegadores le permiten:
• Ver qué cookies tiene y eliminarlas individualmente
• Bloquear cookies de terceros
• Bloquear cookies de sitios específicos
• Bloquear todas las cookies
• Eliminar todas las cookies al cerrar el navegador

**Importante**: Bloquear todas las cookies afectará el funcionamiento de muchos sitios web, incluyendo el nuestro.`,
    },
    {
      title: "6. Cookies y Privacidad",
      content: `Las cookies que utilizamos no recopilan información que pueda identificarlo personalmente sin su consentimiento. Para más información sobre cómo protegemos su privacidad, consulte nuestra Política de Privacidad.`,
    },
    {
      title: "7. Cambios en esta Política",
      content: `Podemos actualizar esta política de cookies periódicamente para reflejar cambios en nuestras prácticas o por otras razones operativas, legales o regulatorias.

Le recomendamos revisar esta página regularmente para estar informado sobre nuestro uso de cookies.`,
    },
    {
      title: "8. Más Información",
      content: `Si tiene preguntas sobre nuestra política de cookies, puede contactarnos:

• Email: privacidad@elrapidin.com
• Teléfono: +57 300 123 4567

También puede obtener más información sobre cookies en:
• www.allaboutcookies.org
• www.youronlinechoices.eu`,
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
                <Cookie className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Política de Cookies
                </h1>
                <p className="text-muted-foreground">
                  Última actualización: Enero 2024
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground text-lg">
              Esta política explica cómo El Rapidín utiliza cookies y tecnologías 
              similares para reconocerlo cuando visita nuestra plataforma.
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

export default CookiesPage;
