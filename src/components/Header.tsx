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
              <li>
                <PostHogClickTracking 
                  eventName="header_nav_click" 
                  properties={{ link: "services", position: "main" }}
                  className="text-[var(--gray-dark)] py-2 block"
                >
                  <Link href="/our-services">Services</Link>
                </PostHogClickTracking>
              </li>
              <li>
                <PostHogClickTracking 
                  eventName="header_nav_click" 
                  properties={{ link: "about", position: "main" }}
                  className="text-[var(--gray-dark)] py-2 block"
                >
                  <Link href="/about-us">About Us</Link>
                </PostHogClickTracking>
              </li>
              <li>
                <PostHogClickTracking 
                  eventName="header_nav_click" 
                  properties={{ link: "news", position: "main" }}
                  className="text-[var(--gray-dark)] py-2 block"
                >
                  <Link href="/news">News</Link>
                </PostHogClickTracking>
              </li>
              <li>
                <PostHogClickTracking 
                  eventName="header_nav_click" 
                  properties={{ link: "contact", position: "main" }}
                  className="text-[var(--gray-dark)] py-2 block"
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
            <ul className="space-y-4 text-gray-700">
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
                <PostHogClickTracking 
                  eventName="mobile_nav_click" 
                  properties={{ link: "services" }}
                  className="block hover:text-[var(--primary-color)]"
                >
                  <Link href="/our-services">Services</Link>
                </PostHogClickTracking>
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