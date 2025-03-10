import Link from 'next/link';

const services = [
  {
    id: 'engineering',
    title: 'Engineering Solution Services',
    description: 'Tailored technical support for product development and compliance design.',
    link: '/our-services/engineering-solutions'
  },
  {
    id: 'certifications',
    title: 'Global Product Certifications',
    description: 'Assistance with certifications across international markets (e.g., BIS, UL, CSA, CE, etc.).',
    link: '/our-services/global-certifications'
  },
  {
    id: 'roadmaps',
    title: 'Compliance Roadmaps',
    description: 'Strategic planning to ensure your products meet regulatory requirements at every stage.',
    link: '/our-services/compliance-roadmaps'
  },
  {
    id: 'integration',
    title: 'Process Integration',
    description: 'Linking compliance procedures seamlessly into your existing business processes.',
    link: '/our-services/process-integration'
  },
  {
    id: 'advisory',
    title: 'Regulatory Advisory Services',
    description: 'Expert guidance on regulatory requirements, updates, and best practices for various regions.',
    link: '/our-services/regulatory-advisory'
  },
  {
    id: 'market-access',
    title: 'Market Access Strategy',
    description: 'Support to navigate market entry requirements and secure certifications for new regions.',
    link: '/our-services/market-access'
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
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  href={service.link} 
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Global Markets We Serve</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <h3 className="text-lg font-bold mb-3">Asia Pacific</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><Link href="/our-services/asia-pacific/china" className="hover:text-blue-600">China</Link></li>
                  <li><Link href="/our-services/asia-pacific/india" className="hover:text-blue-600">India</Link></li>
                  <li><Link href="/our-services/asia-pacific/japan" className="hover:text-blue-600">Japan</Link></li>
                  <li><Link href="/our-services/asia-pacific/south-korea" className="hover:text-blue-600">South Korea</Link></li>
                  <li><Link href="/our-services/asia-pacific/southeast-asia" className="hover:text-blue-600">Southeast Asia</Link></li>
                  <li><Link href="/our-services/asia-pacific/taiwan" className="hover:text-blue-600">Taiwan</Link></li>
                  <li><Link href="/our-services/asia-pacific/australia-new-zealand" className="hover:text-blue-600">Australia/New Zealand</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">Americas</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><Link href="/our-services/americas/united-states-canada" className="hover:text-blue-600">United States & Canada</Link></li>
                  <li><Link href="/our-services/americas/mexico" className="hover:text-blue-600">Mexico</Link></li>
                  <li><Link href="/our-services/americas/argentina" className="hover:text-blue-600">Argentina</Link></li>
                  <li><Link href="/our-services/americas/brazil" className="hover:text-blue-600">Brazil</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">EMEA</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><Link href="/our-services/emea/europe" className="hover:text-blue-600">Europe</Link></li>
                  <li><Link href="/our-services/emea/eurasia" className="hover:text-blue-600">Eurasia</Link></li>
                  <li><Link href="/our-services/emea/africa" className="hover:text-blue-600">Africa</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 