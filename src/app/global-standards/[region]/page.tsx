import Link from 'next/link';
import { notFound } from 'next/navigation';
import { globalStandards, Region } from '@/data/global-standards';
import { extractRegionSvg } from '@/utils/svg-utils';

type RegionParams = {
  region: string;
};

function findRegion(regionSlug: string): Region | null {
  return globalStandards.find(r => r.slug === regionSlug) || null;
}

export function generateStaticParams(): Array<RegionParams> {
  const params: Array<RegionParams> = [];
  
  globalStandards.forEach((region) => {
    params.push({
      region: region.slug,
    });
  });
  
  return params;
}

export async function generateMetadata({ params }: { params: RegionParams }) {
  const region = findRegion(params.region);

  if (!region) {
    return {
      title: 'Not Found',
      description: 'The requested region was not found.',
    };
  }

  return {
    title: `${region.name} Certification Requirements - Global Standards Hub`,
    description: `Explore regulatory compliance requirements for products in the ${region.name} region.`,
  };
}

export default function RegionPage({ params }: { params: RegionParams }) {
  const region = findRegion(params.region);
  
  if (!region) {
    notFound();
  }

  // Extract the SVG for this region
  const regionSvg = extractRegionSvg(region.slug);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[var(--primary-color)] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-2">
              <Link 
                href="/global-standards" 
                className="text-white/90 hover:underline flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Global Standards
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-4">{region.name}</h1>
            <p className="text-white/80">
              Certification requirements and regulatory standards
            </p>
            
            {/* Region SVG Map */}
            <div className="relative w-full h-[300px] my-8">
              <div
                className="w-full h-full text-white/30"
                dangerouslySetInnerHTML={{ __html: regionSvg }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Explore regulatory compliance requirements for products in {region.name}. 
              Select a country below to see detailed certification information.
            </p>
          </div>
          
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Countries in {region.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {region.countries.map((country) => (
              <Link
                key={country.slug}
                href={`/global-standards/${region.slug}/${country.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
              >
                <h3 className="text-xl font-bold text-[var(--primary-color)] mb-3">{country.name}</h3>
                <p className="text-gray-700 text-sm line-clamp-3">{country.description}</p>
                <div className="mt-4 text-[var(--secondary-color)] font-medium flex items-center">
                  View details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="bg-blue-50 rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Need Help With {region.name} Compliance?</h2>
            <p className="text-center mb-8 max-w-2xl mx-auto text-gray-700">
              Our team of compliance experts specializes in {region.name} certification requirements 
              and can help you navigate the entire process from application to approval.
            </p>
            <div className="text-center">
              <Link 
                href="/request-quote" 
                className="inline-block bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-medium px-8 py-3 rounded-md transition-colors"
              >
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 