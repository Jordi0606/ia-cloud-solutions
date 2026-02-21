import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesBar from '@/components/ServicesBar';
import ServiceDetails from '@/components/ServiceDetails';
import BlogSection from '@/components/BlogSection';
import SocialConnect from '@/components/SocialConnect';
import FaqContact from '@/components/FaqContact';
import Footer from '@/components/Footer';

const Index = () => {
  const [contactVisible, setContactVisible] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onShowContact={() => setContactVisible(true)} />
      <main>
        <HeroSection />
        <ServicesBar />
        <ServiceDetails />
        <BlogSection />
        <SocialConnect />
        <FaqContact visible={contactVisible} />
        
      </main>
      <Footer />
    </div>
  );
};

export default Index;
