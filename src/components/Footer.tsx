'use client';

import Link from 'next/link';
import Image from 'next/image';
import PostHogClickTracking from './PostHogClickTracking';

const Footer = () => {
  return (
    <footer className="bg-[var(--gray-light)] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logos/Certipath Compliance_logo_b4_cropped.png" 
              alt="CertiPath Compliance Logo" 
              width={160} 
              height={45} 
              className="h-auto"
            />
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Get Started Section */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold text-[var(--secondary-color)] mb-4">Ready to Get Started?</h3>
              <p className="mb-6 text-gray-600">Take the first step towards certification compliance by requesting a quote today.</p>
              <PostHogClickTracking 
                eventName="quote_button_click" 
                properties={{ position: "footer" }}
                className="inline-block bg-[var(--primary-color)] text-white px-8 py-3 rounded-md hover:bg-[var(--primary-dark)] transition-colors font-medium"
              >
                <Link href="/request-quote">
                  Request A Quote
                </Link>
              </PostHogClickTracking>
            </div>

            {/* Contact Info Section */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold text-[var(--secondary-color)] mb-4">Contact Us</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-1">Phone</p>
                  <PostHogClickTracking 
                    eventName="contact_click" 
                    properties={{ type: "phone", position: "footer" }}
                    className="text-lg font-medium text-[var(--primary-color)] hover:text-[var(--primary-dark)] transition-colors"
                  >
                    <a href="tel:214-771-8157">
                      214-771-8157
                    </a>
                  </PostHogClickTracking>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Email</p>
                  <PostHogClickTracking 
                    eventName="contact_click" 
                    properties={{ type: "email", position: "footer" }}
                    className="text-lg font-medium text-[var(--primary-color)] hover:text-[var(--primary-dark)] transition-colors break-all"
                  >
                    <a href="mailto:contact@certipathcompliance.com">
                      contact@certipathcompliance.com
                    </a>
                  </PostHogClickTracking>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-600 text-sm border-t border-gray-300 pt-6">
          <p>© {new Date().getFullYear()} CertiPath Compliance, All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 