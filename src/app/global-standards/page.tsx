import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { globalStandards } from '@/data/global-standards';

export const metadata: Metadata = {
  title: 'Global Standards Hub | CertiPath Compliance',
  description: 'Explore regulatory compliance requirements for products in different countries and regions around the world.',
  alternates: {
    canonical: '/global-standards',
  },
};

export default function GlobalStandardsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[var(--primary-color)] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Global Standards Hub</h1>
            <div className="relative w-full h-[400px] my-8">
              <Image
                src="/images/world-map.svg"
                alt="World Map"
                fill
                className="object-contain opacity-20"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">Explore Standards By Region</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {globalStandards.map((region) => (
            <div key={region.slug} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4">{region.name}</h3>
                <div className="divide-y divide-gray-200">
                  {region.countries.map((country) => (
                    <div key={country.slug} className="py-3">
                      <Link 
                        href={`/global-standards/${region.slug}/${country.slug}`}
                        className="text-lg font-medium text-[var(--secondary-color)] hover:text-[var(--primary-color)] flex items-center"
                      >
                        {country.name}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 rounded-lg p-8 shadow-md mt-16">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Need Help With Global Compliance?</h2>
          <p className="text-center mb-8 max-w-2xl mx-auto text-gray-700">
            Our team of compliance experts can help you navigate the complexities of global regulations
            and ensure your products meet all necessary requirements for your target markets.
          </p>
          <div className="text-center">
            <Link 
              href="/request-quote" 
              className="inline-block bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-medium px-8 py-3 rounded-md transition-colors"
            >
              Request a Compliance Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 