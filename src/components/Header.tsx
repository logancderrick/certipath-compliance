'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PostHogClickTracking from './PostHogClickTracking';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Contact Info */}
          <div className="hidden md:flex text-sm text-gray-600">
            <span className="mr-4">Call Us 214-771-8157</span>
            <span>·</span>
            <span className="ml-4">contact@certipathcompliance.com</span>
          </div>

          {/* Top Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 text-sm font-medium">
              <li>
                <PostHogClickTracking 
                  eventName="header_nav_click" 
                  properties={{ link: "home", position: "top" }}
                  className="hover:text-[var(--primary-color)]"
                >
                  <Link href="/">HOME</Link>
                </PostHogClickTracking>
              </li>
              <li>
                <PostHogClickTracking 
                  eventName="header_nav_click" 
                  properties={{ link: "contact", position: "top" }}
                  className="hover:text-[var(--primary-color)]"
                >
                  <Link href="/contact-us">CONTACT</Link>
                </PostHogClickTracking>
              </li>
              <li>
                <PostHogClickTracking 
                  eventName="header_nav_click" 
                  properties={{ link: "rfq", position: "top" }}
                  className="hover:text-[var(--primary-color)]"
                >
                  <Link href="/request-quote">RFQ</Link>
                </PostHogClickTracking>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Logo and Main Navigation */}
        <div className="flex justify-between items-center py-4 border-t border-gray-200">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logos/Certipath Compliance_logo_b4_cropped.png" 
                alt="CertiPath Compliance Logo" 
                width={180} 
                height={50} 
                className="h-auto"
                priority
              />
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-8 text-sm font-medium items-center">
              <li className="group relative">
                <button className="hover:text-[var(--primary-color)] flex items-center focus:outline-none py-2">
                  Services
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 top-[calc(100%+0.5rem)] w-64 bg-white rounded-lg shadow-lg py-4 px-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <ul className="space-y-2">
                    <li className="font-semibold text-[var(--secondary-color)]">Our Services</li>
                    <li className="pl-4">
                      <PostHogClickTracking 
                        eventName="service_nav_click" 
                        properties={{ service: "engineering" }}
                        className="hover:text-[var(--primary-color)] text-gray-600 block py-1"
                      >
                        <Link href="/#services-engineering">Engineering Solution Services</Link>
                      </PostHogClickTracking>
                    </li>
                    <li className="pl-4">
                      <PostHogClickTracking 
                        eventName="service_nav_click" 
                        properties={{ service: "certifications" }}
                        className="hover:text-[var(--primary-color)] text-gray-600 block py-1"
                      >
                        <Link href="/#services-certifications">Global Product Certifications</Link>
                      </PostHogClickTracking>
                    </li>
                    <li className="pl-4">
                      <PostHogClickTracking 
                        eventName="service_nav_click" 
                        properties={{ service: "roadmaps" }}
                        className="hover:text-[var(--primary-color)] text-gray-600 block py-1"
                      >
                        <Link href="/#services-roadmaps">Compliance Roadmaps</Link>
                      </PostHogClickTracking>
                    </li>
                    <li className="pl-4">
                      <PostHogClickTracking 
                        eventName="service_nav_click" 
                        properties={{ service: "integration" }}
                        className="hover:text-[var(--primary-color)] text-gray-600 block py-1"
                      >
                        <Link href="/#services-integration">Process Integration</Link>
                      </PostHogClickTracking>
                    </li>
                    <li className="pl-4">
                      <PostHogClickTracking 
                        eventName="service_nav_click" 
                        properties={{ service: "advisory" }}
                        className="hover:text-[var(--primary-color)] text-gray-600 block py-1"
                      >
                        <Link href="/#services-advisory">Regulatory Advisory Services</Link>
                      </PostHogClickTracking>
                    </li>
                    <li className="pl-4">
                      <PostHogClickTracking 
                        eventName="service_nav_click" 
                        properties={{ service: "market-access" }}
                        className="hover:text-[var(--primary-color)] text-gray-600 block py-1"
                      >
                        <Link href="/#services-market-access">Market Access Strategy</Link>
                      </PostHogClickTracking>
                    </li>
                    <li className="font-semibold text-[var(--secondary-color)] mt-4">View All Services</li>
                    <li className="pl-4">
                      <PostHogClickTracking 
                        eventName="service_nav_click" 
                        properties={{ service: "overview" }}
                        className="hover:text-[var(--primary-color)] text-gray-600 block py-1"
                      >
                        <Link href="/our-services">Services Overview</Link>
                      </PostHogClickTracking>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <PostHogClickTracking 
                  eventName="header_nav_click" 
                  properties={{ link: "about", position: "main" }}
                  className="hover:text-[var(--primary-color)] py-2 block"
                >
                  <Link href="/about-us">About Us</Link>
                </PostHogClickTracking>
              </li>
              <li>
                <PostHogClickTracking 
                  eventName="header_nav_click" 
                  properties={{ link: "news", position: "main" }}
                  className="hover:text-[var(--primary-color)] py-2 block"
                >
                  <Link href="/news">News</Link>
                </PostHogClickTracking>
              </li>
              <li>
                <PostHogClickTracking 
                  eventName="header_nav_click" 
                  properties={{ link: "contact", position: "main" }}
                  className="hover:text-[var(--primary-color)] py-2 block"
                >
                  <Link href="/contact-us">Contact Us</Link>
                </PostHogClickTracking>
              </li>
              <li>
                <PostHogClickTracking 
                  eventName="quote_button_click" 
                  properties={{ position: "header" }}
                  className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:bg-[var(--primary-dark)] transition-colors"
                >
                  <Link href="/request-quote">Quote</Link>
                </PostHogClickTracking>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-6">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/images/logos/Certipath Compliance_logo_b4_cropped.png" 
                  alt="CertiPath Compliance Logo" 
                  width={140} 
                  height={40} 
                  className="h-auto"
                />
              </Link>
            </div>
            <ul className="space-y-4">
              <li>
                <PostHogClickTracking 
                  eventName="mobile_nav_click" 
                  properties={{ link: "home" }}
                  className="block hover:text-[var(--primary-color)]"
                >
                  <Link href="/">HOME</Link>
                </PostHogClickTracking>
              </li>
              <li>
                <div className="block hover:text-[var(--primary-color)] mb-2">Services</div>
                <ul className="pl-4 space-y-2">
                  <li>
                    <PostHogClickTracking 
                      eventName="mobile_service_click" 
                      properties={{ service: "engineering" }}
                      className="block hover:text-[var(--primary-color)] text-gray-600"
                    >
                      <Link href="/#services-engineering">Engineering Solution Services</Link>
                    </PostHogClickTracking>
                  </li>
                  <li>
                    <PostHogClickTracking 
                      eventName="mobile_service_click" 
                      properties={{ service: "certifications" }}
                      className="block hover:text-[var(--primary-color)] text-gray-600"
                    >
                      <Link href="/#services-certifications">Global Product Certifications</Link>
                    </PostHogClickTracking>
                  </li>
                  <li>
                    <PostHogClickTracking 
                      eventName="mobile_service_click" 
                      properties={{ service: "roadmaps" }}
                      className="block hover:text-[var(--primary-color)] text-gray-600"
                    >
                      <Link href="/#services-roadmaps">Compliance Roadmaps</Link>
                    </PostHogClickTracking>
                  </li>
                  <li>
                    <PostHogClickTracking 
                      eventName="mobile_service_click" 
                      properties={{ service: "integration" }}
                      className="block hover:text-[var(--primary-color)] text-gray-600"
                    >
                      <Link href="/#services-integration">Process Integration</Link>
                    </PostHogClickTracking>
                  </li>
                  <li>
                    <PostHogClickTracking 
                      eventName="mobile_service_click" 
                      properties={{ service: "advisory" }}
                      className="block hover:text-[var(--primary-color)] text-gray-600"
                    >
                      <Link href="/#services-advisory">Regulatory Advisory Services</Link>
                    </PostHogClickTracking>
                  </li>
                  <li>
                    <PostHogClickTracking 
                      eventName="mobile_service_click" 
                      properties={{ service: "market-access" }}
                      className="block hover:text-[var(--primary-color)] text-gray-600"
                    >
                      <Link href="/#services-market-access">Market Access Strategy</Link>
                    </PostHogClickTracking>
                  </li>
                </ul>
              </li>
              <li>
                <PostHogClickTracking 
                  eventName="mobile_nav_click" 
                  properties={{ link: "about" }}
                  className="block hover:text-[var(--primary-color)]"
                >
                  <Link href="/about-us">About Us</Link>
                </PostHogClickTracking>
              </li>
              <li>
                <PostHogClickTracking 
                  eventName="mobile_nav_click" 
                  properties={{ link: "news" }}
                  className="block hover:text-[var(--primary-color)]"
                >
                  <Link href="/news">News</Link>
                </PostHogClickTracking>
              </li>
              <li>
                <PostHogClickTracking 
                  eventName="mobile_nav_click" 
                  properties={{ link: "contact" }}
                  className="block hover:text-[var(--primary-color)]"
                >
                  <Link href="/contact-us">Contact Us</Link>
                </PostHogClickTracking>
              </li>
              <li>
                <PostHogClickTracking 
                  eventName="quote_button_click" 
                  properties={{ position: "mobile_menu" }}
                  className="block hover:text-[var(--primary-color)]"
                >
                  <Link href="/request-quote">Quote</Link>
                </PostHogClickTracking>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 