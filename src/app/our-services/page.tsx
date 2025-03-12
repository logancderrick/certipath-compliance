const services = [
  {
    id: 'engineering',
    title: 'Engineering Solution Services',
    description: 'Tailored technical support for product development and compliance design.',
  },
  {
    id: 'certifications',
    title: 'Global Product Certifications',
    description: 'Assistance with certifications across international markets (e.g., BIS, UL, CSA, CE, etc.).',
  },
  {
    id: 'roadmaps',
    title: 'Compliance Roadmaps',
    description: 'Strategic planning to ensure your products meet regulatory requirements at every stage.',
  },
  {
    id: 'integration',
    title: 'Process Integration',
    description: 'Linking compliance procedures seamlessly into your existing business processes.',
  },
  {
    id: 'advisory',
    title: 'Regulatory Advisory Services',
    description: 'Expert guidance on regulatory requirements, updates, and best practices for various regions.',
  },
  {
    id: 'market-access',
    title: 'Market Access Strategy',
    description: 'Support to navigate market entry requirements and secure certifications for new regions.',
  }
];

export default function OurServices() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
          <p className="text-lg text-gray-700 mb-12 text-center">
            At CertiPath Compliance, we offer a comprehensive range of services designed to help you navigate the complex world of global compliance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-3">{service.title}</h2>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Global Markets We Serve</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <h3 className="text-lg font-bold mb-3">Asia Pacific</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>China</li>
                  <li>India</li>
                  <li>Japan</li>
                  <li>South Korea</li>
                  <li>Southeast Asia</li>
                  <li>Taiwan</li>
                  <li>Australia/New Zealand</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">Americas</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>United States & Canada</li>
                  <li>Mexico</li>
                  <li>Argentina</li>
                  <li>Brazil</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">EMEA</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Europe</li>
                  <li>Eurasia</li>
                  <li>Africa</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 