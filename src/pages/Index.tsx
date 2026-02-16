import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesBar from '@/components/ServicesBar';
import ServiceDetails from '@/components/ServiceDetails';
import SocialConnect from '@/components/SocialConnect';
import FaqContact from '@/components/FaqContact';

import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesBar />
        <ServiceDetails />
        <SocialConnect />
        <FaqContact />
        
      </main>
      <Footer />
    </div>
  );
};

export default Index;
