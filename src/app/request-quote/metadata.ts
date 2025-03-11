import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request a Quote | CertiPath Compliance - Global Certification Services',
  description: 'Get a customized quote for your product certification needs. Our experts will help you navigate global regulatory requirements and streamline your compliance process.',
  keywords: 'product certification, compliance quote, regulatory compliance, global certification, CE mark, UL certification, product testing',
  openGraph: {
    title: 'Request a Quote | CertiPath Compliance',
    description: 'Get a customized quote for your product certification needs. Our experts will help you navigate global regulatory requirements and streamline your compliance process.',
    url: 'https://certipath-compliance.com/request-quote',
    siteName: 'CertiPath Compliance',
    images: [
      {
        url: '/images/logos/Certipath Compliance_logo_b5.png',
        width: 1200,
        height: 630,
        alt: 'CertiPath Compliance Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request a Quote | CertiPath Compliance',
    description: 'Get a customized quote for your product certification needs. Our experts will help you navigate global regulatory requirements.',
    images: ['/images/logos/Certipath Compliance_logo_b5.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}; 