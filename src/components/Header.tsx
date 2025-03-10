'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
              <li><Link href="/" className="hover:text-[var(--primary-color)]">HOME</Link></li>
              <li><Link href="/contact-us" className="hover:text-[var(--primary-color)]">CONTACT</Link></li>
              <li><Link href="/request-quote" className="hover:text-[var(--primary-color)]">RFQ</Link></li>
              <li><Link href="/cats" className="hover:text-[var(--primary-color)]">CATS</Link></li>
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
                src="/images/Certipath Compliance_logo_b4_cropped.png" 
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
            <ul className="flex space-x-8 text-sm font-medium">
              <li className="group relative">
                <button className="hover:text-[var(--primary-color)] flex items-center focus:outline-none">
                  Services
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg rounded-md p-4 hidden group-hover:block z-50">
                  <ul className="space-y-2">
                    <li className="font-semibold text-[var(--secondary-color)]">Our Services</li>
                    <li className="pl-4"><a href="/#services-engineering" className="hover:text-[var(--primary-color)] text-gray-600">Engineering Solution Services</a></li>
                    <li className="pl-4"><a href="/#services-certifications" className="hover:text-[var(--primary-color)] text-gray-600">Global Product Certifications</a></li>
                    <li className="pl-4"><a href="/#services-roadmaps" className="hover:text-[var(--primary-color)] text-gray-600">Compliance Roadmaps</a></li>
                    <li className="pl-4"><a href="/#services-integration" className="hover:text-[var(--primary-color)] text-gray-600">Process Integration</a></li>
                    <li className="pl-4"><a href="/#services-advisory" className="hover:text-[var(--primary-color)] text-gray-600">Regulatory Advisory Services</a></li>
                    <li className="pl-4"><a href="/#services-market-access" className="hover:text-[var(--primary-color)] text-gray-600">Market Access Strategy</a></li>
                    <li className="font-semibold text-[var(--secondary-color)] mt-4">View All Services</li>
                    <li className="pl-4"><Link href="/our-services" className="hover:text-[var(--primary-color)] text-gray-600">Services Overview</Link></li>
                  </ul>
                </div>
              </li>
              <li><Link href="/about-us" className="hover:text-[var(--primary-color)]">About Us</Link></li>
              <li><Link href="/articles" className="hover:text-[var(--primary-color)]">News/Blog</Link></li>
              <li><Link href="/contact-us" className="hover:text-[var(--primary-color)]">Contact Us</Link></li>
              <li><Link href="/request-quote" className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:bg-[var(--primary-dark)] transition-colors">Quote</Link></li>
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
              <li><Link href="/" className="block hover:text-[var(--primary-color)]">HOME</Link></li>
              <li>
                <div className="block hover:text-[var(--primary-color)] mb-2">Services</div>
                <ul className="pl-4 space-y-2">
                  <li><a href="/#services-engineering" className="block hover:text-[var(--primary-color)] text-gray-600">Engineering Solution Services</a></li>
                  <li><a href="/#services-certifications" className="block hover:text-[var(--primary-color)] text-gray-600">Global Product Certifications</a></li>
                  <li><a href="/#services-roadmaps" className="block hover:text-[var(--primary-color)] text-gray-600">Compliance Roadmaps</a></li>
                  <li><a href="/#services-integration" className="block hover:text-[var(--primary-color)] text-gray-600">Process Integration</a></li>
                  <li><a href="/#services-advisory" className="block hover:text-[var(--primary-color)] text-gray-600">Regulatory Advisory Services</a></li>
                  <li><a href="/#services-market-access" className="block hover:text-[var(--primary-color)] text-gray-600">Market Access Strategy</a></li>
                </ul>
              </li>
              <li><Link href="/about-us" className="block hover:text-[var(--primary-color)]">About Us</Link></li>
              <li><Link href="/articles" className="block hover:text-[var(--primary-color)]">News/Blog</Link></li>
              <li><Link href="/contact-us" className="block hover:text-[var(--primary-color)]">Contact Us</Link></li>
              <li><Link href="/request-quote" className="block hover:text-[var(--primary-color)]">Quote</Link></li>
              <li><Link href="/cats" className="block hover:text-[var(--primary-color)]">CATS</Link></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 