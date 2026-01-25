import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import ForBusinessSection from "@/components/sections/ForBusinessSection";
import EmpleoSection from "@/components/sections/EmpleoSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <ForBusinessSection />
        <EmpleoSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
