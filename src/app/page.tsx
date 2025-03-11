import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import GlobalCertificationsSection from '../components/GlobalCertificationsSection';
import AboutSection from '../components/AboutSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <ProcessSection />
      <GlobalCertificationsSection />
    </main>
  );
}
