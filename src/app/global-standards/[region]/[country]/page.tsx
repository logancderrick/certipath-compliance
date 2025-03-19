import Link from 'next/link';
import { notFound } from 'next/navigation';
import { globalStandards, Region, Country } from '@/data/global-standards';

type StaticParams = {
  region: string;
  country: string;
};

function findCountryAndRegion(regionSlug: string, countrySlug: string): { region: Region | null, country: Country | null } {
  const region = globalStandards.find(r => r.slug === regionSlug) || null;
  const country = region?.countries.find(c => c.slug === countrySlug) || null;
  return { region, country };
}

export function generateStaticParams(): Array<StaticParams> {
  const params: Array<StaticParams> = [];
  
  globalStandards.forEach((region) => {
    if (region.countries) {
      region.countries.forEach((country) => {
        params.push({
          region: region.slug,
          country: country.slug,
        });
      });
    }
  });
  
  return params;
}

export async function generateMetadata({ 
  params 
}: { 
  params: { region: string; country: string } 
}) {
  const { region, country } = findCountryAndRegion(params.region, params.country);

  if (!region || !country) {
    return {
      title: 'Not Found',
      description: 'The requested country or region was not found.',
    };
  }

  return {
    title: `${country.name} Certification Requirements - Global Standards Hub`,
    description: country.description,
  };
}

export default function CountryPage({ params }: { params: StaticParams }) {
  const { region, country } = findCountryAndRegion(params.region, params.country);
  
  if (!region || !country) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[var(--primary-color)] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-2">
              <Link 
                href="/global-standards" 
                className="text-white/90 hover:underline flex items-center mr-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Global Standards
              </Link>
              <span className="text-white/60">•</span>
              <span className="ml-2 text-white/80">{region.name}</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{country.name}</h1>
            <p className="text-white/80 mb-4">
              Certification requirements and regulatory standards
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{country.description}</p>
          </div>
          
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Required Certifications</h2>
          
          <div className="space-y-8 mb-12">
            {country.certifications.map((cert, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-[var(--primary-color)] px-6 py-4">
                  <h3 className="text-xl font-bold text-white">{cert.name}</h3>
                  {cert.discipline && (
                    <p className="text-sm font-medium text-white/80">{cert.discipline}</p>
                  )}
                </div>
                
                <div className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">{cert.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <CertificationDetail
                      title="Mandatory"
                      value={cert.mandatory ? "Yes" : "No"}
                      positive={cert.mandatory}
                    />
                    {cert.followUpInspections !== undefined && (
                      <CertificationDetail
                        title="Follow-up Inspections"
                        value={cert.followUpInspections ? "Required" : "Not Required"}
                        positive={!cert.followUpInspections}
                      />
                    )}
                    {cert.validityPeriod && (
                      <CertificationDetail
                        title="Validity Period"
                        value={cert.validityPeriod}
                      />
                    )}
                    {cert.markRequired !== undefined && (
                      <CertificationDetail
                        title="Mark Required"
                        value={cert.markRequired ? "Yes" : "No"}
                        positive={!cert.markRequired}
                      />
                    )}
                    {cert.localRepRequired !== undefined && (
                      <CertificationDetail
                        title="Local Representative"
                        value={cert.localRepRequired ? "Required" : "Not Required"}
                        positive={!cert.localRepRequired}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Need Help With {country.name} Compliance?</h2>
            <p className="text-center mb-8 max-w-2xl mx-auto text-gray-700">
              Our team of compliance experts specializes in {country.name} certification requirements 
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

// Helper component for certification details
function CertificationDetail({ 
  title, 
  value, 
  positive 
}: { 
  title: string; 
  value: string; 
  positive?: boolean 
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
      <p className="text-sm font-semibold text-gray-600 mb-1">{title}</p>
      <p className={`font-medium ${positive !== undefined ? (positive ? 'text-green-600' : 'text-amber-600') : 'text-gray-800'}`}>
        {value}
      </p>
    </div>
  );
} 