import Link from 'next/link';

const services = [
  {
    id: 'engineering',
    title: 'Engineering Solution Services',
    description: 'Expert technical guidance to integrate compliance requirements into your product development cycle from the earliest stages.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    link: '/our-services/engineering-solutions'
  },
  {
    id: 'certifications',
    title: 'Global Product Certifications',
    description: 'Strategic management of certification processes across multiple international markets with optimized testing protocols.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    link: '/our-services/global-certifications'
  },
  {
    id: 'roadmaps',
    title: 'Compliance Roadmaps',
    description: 'Customized planning that anticipates regulatory requirements throughout your product lifecycle, preventing costly delays.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    link: '/our-services/compliance-roadmaps'
  },
  {
    id: 'integration',
    title: 'Process Integration',
    description: 'Seamless incorporation of compliance protocols into your existing workflows, enhancing efficiency without disruption.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    link: '/our-services/process-integration'
  },
  {
    id: 'advisory',
    title: 'Regulatory Advisory Services',
    description: 'Proactive monitoring of changing regulations with strategic guidance on how these changes impact your specific products.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    link: '/our-services/regulatory-advisory'
  },
  {
    id: 'market-access',
    title: 'Market Access Strategy',
    description: 'Tailored approaches for entering new markets with comprehensive analysis of regional requirements and competitive landscapes.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    link: '/our-services/market-access'
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
              <Link 
                href={service.link} 
                className="text-[var(--primary-color)] font-medium hover:text-[var(--primary-dark)] transition-colors"
              >
                Learn more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 