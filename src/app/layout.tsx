import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { OrganizationJsonLd, BreadcrumbJsonLd } from "../components/JsonLd";
import PostHogProvider from "../components/PostHogProvider";
import { Suspense } from "react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CertiPath Compliance - Global Certification Services",
  description: "Ensuring your products meet global standards, every step of the way. CertiPath Compliance provides comprehensive regulatory compliance services for manufacturers worldwide.",
  keywords: "product certification, regulatory compliance, global standards, CE mark, UL certification, product testing, compliance services",
  icons: {
    icon: [
      {
        url: '/images/logos/Certipath Compliance_logo_b5.png',
        type: 'image/png',
      }
    ],
    shortcut: '/images/logos/Certipath Compliance_logo_b5.png',
    apple: '/images/logos/Certipath Compliance_logo_b5.png',
  },
  metadataBase: new URL('https://certipath-compliance.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    title: "CertiPath Compliance - Global Certification Services",
    description: "Ensuring your products meet global standards, every step of the way. CertiPath Compliance provides comprehensive regulatory compliance services for manufacturers worldwide.",
    url: 'https://certipath-compliance.com',
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
    title: "CertiPath Compliance - Global Certification Services",
    description: "Ensuring your products meet global standards, every step of the way.",
    images: ['/images/logos/Certipath Compliance_logo_b5.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en-US">
      <head>
        {/* Google Ads Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-974717913"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-974717913');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <PostHogProvider>
          <OrganizationJsonLd />
          <BreadcrumbJsonLd />
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <main>{children}</main>
          </Suspense>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
