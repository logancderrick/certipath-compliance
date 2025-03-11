import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import GlobalCertificationsSection from '../components/GlobalCertificationsSection';

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
