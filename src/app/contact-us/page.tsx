'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define the form schema with validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  company: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }
      
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
          <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            Have questions about our services? Ready to start your certification journey? Get in touch with our team of experts.
          </p>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Contact Information - Left Side with Dark Gray Background */}
              <div className="lg:col-span-4 bg-gray-800 p-8">
                <div className="space-y-8">
                  <div>
                    <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold mb-2 text-white">Email</h2>
                    <p className="text-gray-300">contact@certipathcompliance.com</p>
                  </div>
                  
                  <div>
                    <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold mb-2 text-white">Phone</h2>
                    <p className="text-gray-300">214-771-8157</p>
                  </div>
                  
                  <div>
                    <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold mb-2 text-white">Business Hours</h2>
                    <p className="text-gray-300">Monday - Friday: 9AM - 5PM CST</p>
                  </div>
                </div>
              </div>

              {/* Contact Form - Right Side */}
              <div className="lg:col-span-8 p-8">
                {submitSuccess ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                    <p>Your message has been sent successfully. We&apos;ll get back to you as soon as possible.</p>
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-4 bg-[var(--primary-color)] text-white py-2 px-4 rounded hover:bg-[var(--primary-dark)] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-6 text-[var(--secondary-color)]">Send us a message</h2>
                    
                    {submitError && (
                      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
                        <p>{submitError}</p>
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name *</label>
                          <input
                            id="name"
                            {...register('name')}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="company" className="block text-gray-700 text-sm font-medium mb-2">Company Name</label>
                          <input
                            id="company"
                            {...register('company')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email *</label>
                          <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">Phone</label>
                          <input
                            id="phone"
                            type="tel"
                            {...register('phone')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">Message *</label>
                        <textarea
                          id="message"
                          rows={6}
                          {...register('message')}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                        ></textarea>
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                        )}
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[var(--primary-color)] text-white py-3 px-8 rounded-md hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-70"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 