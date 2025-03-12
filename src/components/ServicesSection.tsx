import Link from 'next/link';

const services = [
  {
    id: 'engineering',
    title: 'Engineering Solution Services',
    description: 'Expert technical guidance to integrate compliance requirements into your product development cycle from the earliest stages.',
  },
  {
    id: 'certifications',
    title: 'Global Product Certifications',
    description: 'Strategic management of certification processes across multiple international markets with optimized testing protocols.',
  },
  {
    id: 'roadmaps',
    title: 'Compliance Roadmaps',
    description: 'Customized planning that anticipates regulatory requirements throughout your product lifecycle, preventing costly delays.',
  },
  {
    id: 'integration',
    title: 'Process Integration',
    description: 'Seamless incorporation of compliance protocols into your existing workflows, enhancing efficiency without disruption.',
  },
  {
    id: 'advisory',
    title: 'Regulatory Advisory Services',
    description: 'Proactive monitoring of changing regulations with strategic guidance on how these changes impact your specific products.',
  },
  {
    id: 'market-access',
    title: 'Market Access Strategy',
    description: 'Tailored approaches for entering new markets with comprehensive analysis of regional requirements and competitive landscapes.',
  }
];

const ServicesSection = () => {
  return (
    <section className="py-16 bg-[var(--gray-light)]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-[var(--secondary-color)]">Our Specialized Services</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          We offer a suite of integrated solutions designed to transform regulatory compliance from a challenge into a competitive advantage for your business.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} id={`services-${service.id}`} className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <div className="text-[var(--primary-color)] mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-[var(--secondary-color)]">{service.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 