'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
    alert('Thank you for signing up for our newsletter!');
  };

  return (
    <footer className="bg-[var(--gray-light)] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/Certipath Compliance_logo_b4_cropped.png" 
              alt="CertiPath Compliance Logo" 
              width={160} 
              height={45} 
              className="h-auto"
            />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Get Started Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[var(--secondary-color)] mb-4">Get Started!</h3>
            <p className="mb-4">Fill out our quote form to get started!</p>
            <Link 
              href="/request-quote" 
              className="inline-block bg-[var(--primary-color)] text-white px-6 py-2 rounded hover:bg-[var(--primary-dark)] transition-colors"
            >
              Request A Quote
            </Link>
          </div>

          {/* Contact Info Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[var(--secondary-color)] mb-4">Contact Info</h3>
            <p className="font-bold mb-2">214-771-8157</p>
            <p className="font-bold mb-4">contact@certipathcompliance.com</p>
          </div>

          {/* Newsletter Signup */}
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