'use client';

import { usePathname } from 'next/navigation';

interface JsonLdProps {
  type: 'Organization' | 'LocalBusiness' | 'BreadcrumbList' | 'FAQPage' | 'Service';
  data: Record<string, unknown>;
}

const JsonLd: React.FC<JsonLdProps> = ({ type, data }) => {
  // Remove unused pathname variable
  
  // Add @context and @type to the data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
};

export default JsonLd;

// Example usage for organization data
export const OrganizationJsonLd: React.FC = () => {
  return (
    <JsonLd
      type="Organization"
      data={{
        name: 'CertiPath Compliance',
        url: 'https://certipath-compliance.com',
        logo: 'https://certipath-compliance.com/images/logos/Certipath Compliance_logo_b5.png',
        sameAs: [
          'https://www.linkedin.com/company/certipath-compliance',
          // Add other social profiles here
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-555-123-4567',
          contactType: 'customer service',
          email: 'info@certipath-compliance.com',
          availableLanguage: ['English'],
        },
      }}
    />
  );
};

// Example usage for service data
export const ServiceJsonLd: React.FC = () => {
  return (
    <JsonLd
      type="Service"
      data={{
        name: 'Global Product Certification Services',
        provider: {
          '@type': 'Organization',
          name: 'CertiPath Compliance',
        },
        serviceType: 'Product Certification',
        description: 'Comprehensive regulatory compliance services for manufacturers worldwide.',
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 0,
            longitude: 0,
          },
          geoRadius: '20000 km',
        },
      }}
    />
  );
};

// Example usage for breadcrumb data
export const BreadcrumbJsonLd: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://certipath-compliance.com',
    },
  ];
  
  // Add additional breadcrumb items based on the path
  pathSegments.forEach((segment, index) => {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: index + 2,
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      item: `https://certipath-compliance.com/${pathSegments.slice(0, index + 1).join('/')}`,
    });
  });
  
  return (
    <JsonLd
      type="BreadcrumbList"
      data={{
        itemListElement: breadcrumbItems,
      }}
    />
  );
}; 