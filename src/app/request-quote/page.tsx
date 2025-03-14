'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ServiceJsonLd } from '../../components/JsonLd';

// Define the form schema with validation
const quoteFormSchema = z.object({
  // General Information
  name: z.string().min(2, { message: 'Name is required' }),
  title: z.string().optional(),
  company: z.string().min(2, { message: 'Company name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(5, { message: 'Phone number is required' }),
  website: z.string().optional(),
  address: z.string().optional(),
  
  // Certification Areas
  certificationAreas: z.array(z.string()).min(1, { message: 'Please select at least one certification area' }),
  
  // Product Information
  productType: z.string().min(5, { message: 'Product description is required' }),
  powerInput: z.string().optional(),
  clockFrequency: z.string().optional(),
  environmentalRating: z.string().min(1, { message: 'Environmental rating is required' }),
  modelNumbers: z.string().min(1, { message: 'At least one model number is required' }),
  productWeight: z.string().optional(),
  
  // Specific Certifications
  ceSpecific: z.array(z.string()).optional(),
  northAmericaSpecific: z.array(z.string()).optional(),
  chinaSpecific: z.array(z.string()).optional(),
  indiaSpecific: z.array(z.string()).optional(),
  japanSpecific: z.array(z.string()).optional(),
  koreaSpecific: z.array(z.string()).optional(),
  mexicoSpecific: z.array(z.string()).optional(),
  russiaSpecific: z.array(z.string()).optional(),
  southAmericaSpecific: z.array(z.string()).optional(),
  taiwanSpecific: z.array(z.string()).optional(),
  australiaSpecific: z.array(z.string()).optional(),
  
  // Timeline
  deadline: z.string().optional(),
  
  // Additional Information
  comments: z.string().optional(),
  leadSource: z.string().min(1, { message: 'Please select how you heard about us' }),
  keyword: z.string().optional()
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

export default function RequestQuote() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showCertificationDetails, setShowCertificationDetails] = useState<Record<string, boolean>>({
    ce: false,
    northAmerica: false,
    china: false,
    india: false,
    japan: false,
    korea: false,
    mexico: false,
    russia: false,
    southAmerica: false,
    taiwan: false,
    australia: false
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      certificationAreas: [],
      ceSpecific: [],
      northAmericaSpecific: [],
      chinaSpecific: [],
      indiaSpecific: [],
      japanSpecific: [],
      koreaSpecific: [],
      mexicoSpecific: [],
      russiaSpecific: [],
      southAmericaSpecific: [],
      taiwanSpecific: [],
      australiaSpecific: []
    }
  });

  const watchCertificationAreas = watch('certificationAreas');

  // Toggle certification detail sections based on selected areas
  const updateCertificationDetails = useCallback((areas: string[] | undefined) => {
    if (!areas) return;
    
    setShowCertificationDetails((prevState) => {
      const newState = { ...prevState };
      
      // Reset all to false first
      Object.keys(newState).forEach(key => {
        newState[key] = false;
      });
      
      // Set selected ones to true
      areas.forEach(area => {
        if (area === 'European CE Mark') newState.ce = true;
        if (area === 'North America') newState.northAmerica = true;
        if (area === 'China') newState.china = true;
        if (area === 'India') newState.india = true;
        if (area === 'Japan') newState.japan = true;
        if (area === 'Korea') newState.korea = true;
        if (area === 'Mexico') newState.mexico = true;
        if (area === 'Russia') newState.russia = true;
        if (area === 'South America') newState.southAmerica = true;
        if (area === 'Taiwan') newState.taiwan = true;
        if (area === 'Australia/New Zeland') newState.australia = true;
      });
      
      return newState;
    });
  }, []);

  // Watch for changes in certification areas
  useEffect(() => {
    updateCertificationDetails(watchCertificationAreas);
  }, [watchCertificationAreas, updateCertificationDetails]);

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const formData = new FormData();
      
      // Add all form fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => {
            formData.append(key, item);
          });
        } else if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
      
      const response = await fetch('/api/quote', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send quote request');
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
    <div className="bg-gray-50 min-h-screen">
      <ServiceJsonLd />
      {/* Hero Section */}
      <div className="bg-[var(--primary-color)] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Request For Quote</h1>
            <p className="text-white/80">
              Get a customized quote for your certification needs
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            Fill out the form below to request a customized quote for your certification needs. Our team will review your requirements and get back to you promptly.
          </p>
          
          {submitSuccess ? (
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                <p>Your quote request has been submitted successfully. Our team will review your requirements and get back to you as soon as possible.</p>
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 bg-[var(--primary-color)] text-white py-2 px-4 rounded hover:bg-[var(--primary-dark)] transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8">
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
                  <p>{submitError}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">General Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      id="title"
                      {...register('title')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-gray-700 text-sm font-medium mb-2">Company Name *</label>
                    <input
                      type="text"
                      id="company"
                      {...register('company')}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900 ${errors.company ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.company && (
                      <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-gray-700 text-sm font-medium mb-2">Website</label>
                    <input
                      type="url"
                      id="website"
                      {...register('website')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900"
                    />
                  </div>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">Address</label>
                  <textarea
                    id="address"
                    {...register('address')}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900"
                    placeholder="Street Address, City, State, ZIP, Country"
                  ></textarea>
                </div>
                
                <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Certification Areas *</h2>
                
                <div className="mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'CB Certification',
                      'North America',
                      'European CE Mark',
                      'China',
                      'India',
                      'Russia',
                      'Korea',
                      'Mexico',
                      'South America',
                      'Taiwan',
                      'Japan',
                      'Australia/New Zeland'
                    ].map((area) => (
                      <div key={area} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`area-${area}`}
                          value={area}
                          {...register('certificationAreas')}
                          className="mr-2"
                        />
                        <label htmlFor={`area-${area}`} className="text-gray-700">{area}</label>
                      </div>
                    ))}
                  </div>
                  {errors.certificationAreas && (
                    <p className="text-red-500 text-sm mt-1">{errors.certificationAreas.message}</p>
                  )}
                </div>
                
                {/* Specific certification sections */}
                {showCertificationDetails.ce && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">CE Certification (EU) Specific</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="ce-safety"
                          value="Safety"
                          {...register('ceSpecific')}
                          className="mr-2"
                        />
                        <label htmlFor="ce-safety" className="text-gray-700">Safety</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="ce-emc"
                          value="EMC"
                          {...register('ceSpecific')}
                          className="mr-2"
                        />
                        <label htmlFor="ce-emc" className="text-gray-700">EMC</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="ce-red"
                          value="Radio Equipment Directive - Wireless"
                          {...register('ceSpecific')}
                          className="mr-2"
                        />
                        <label htmlFor="ce-red" className="text-gray-700">Radio Equipment Directive - Wireless</label>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">For multiple selections hold CTRL and left click on all applicable options</p>
                  </div>
                )}

                {showCertificationDetails.northAmerica && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">North America Specific Certifications</h3>
                    <div className="space-y-2">
                      {['UL', 'ETL', 'CSA', 'TUV', 'RNA', 'FCC/IC'].map((cert) => (
                        <div key={cert} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`na-${cert}`}
                            value={cert}
                            {...register('northAmericaSpecific')}
                            className="mr-2"
                          />
                          <label htmlFor={`na-${cert}`} className="text-gray-700">{cert}</label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">For multiple selections hold CTRL and left click on all applicable options</p>
                  </div>
                )}

                {showCertificationDetails.china && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">China Specific Certifications</h3>
                    <div className="space-y-2">
                      {['CCC', 'CQC', 'SRRC'].map((cert) => (
                        <div key={cert} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`china-${cert}`}
                            value={cert}
                            {...register('chinaSpecific')}
                            className="mr-2"
                          />
                          <label htmlFor={`china-${cert}`} className="text-gray-700">{cert}</label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">For multiple selections hold CTRL and left click on all applicable options</p>
                  </div>
                )}

                {showCertificationDetails.india && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">India Specific Certifications</h3>
                    <div className="space-y-2">
                      {['BIS', 'WPC', 'TEC'].map((cert) => (
                        <div key={cert} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`india-${cert}`}
                            value={cert}
                            {...register('indiaSpecific')}
                            className="mr-2"
                          />
                          <label htmlFor={`india-${cert}`} className="text-gray-700">{cert}</label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">For multiple selections hold CTRL and left click on all applicable options</p>
                  </div>
                )}

                {showCertificationDetails.japan && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">Japan Specific Certifications</h3>
                    <div className="space-y-2">
                      {['VCCI', 'PSE'].map((cert) => (
                        <div key={cert} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`japan-${cert}`}
                            value={cert}
                            {...register('japanSpecific')}
                            className="mr-2"
                          />
                          <label htmlFor={`japan-${cert}`} className="text-gray-700">{cert}</label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">For multiple selections hold CTRL and left click on all applicable options</p>
                  </div>
                )}

                {showCertificationDetails.korea && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">Korea Specific Certifications</h3>
                    <div className="space-y-2">
                      {['MIC', 'KC'].map((cert) => (
                        <div key={cert} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`korea-${cert}`}
                            value={cert}
                            {...register('koreaSpecific')}
                            className="mr-2"
                          />
                          <label htmlFor={`korea-${cert}`} className="text-gray-700">{cert}</label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">For multiple selections hold CTRL and left click on all applicable options</p>
                  </div>
                )}

                {showCertificationDetails.mexico && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">Mexico Specific Certifications</h3>
                    <div className="space-y-2">
                      {['NOM', 'IFETEL'].map((cert) => (
                        <div key={cert} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`mexico-${cert}`}
                            value={cert}
                            {...register('mexicoSpecific')}
                            className="mr-2"
                          />
                          <label htmlFor={`mexico-${cert}`} className="text-gray-700">{cert}</label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">For multiple selections hold CTRL and left click on all applicable options</p>
                  </div>
                )}

                {showCertificationDetails.russia && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">Russia Specific Certifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="russia-eac"
                          value="EAC"
                          {...register('russiaSpecific')}
                          className="mr-2"
                        />
                        <label htmlFor="russia-eac" className="text-gray-700">EAC</label>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">For multiple selections hold CTRL and left click on all applicable options</p>
                  </div>
                )}

                {showCertificationDetails.southAmerica && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">South America Specific Certifications</h3>
                    <div className="space-y-2">
                      {['Brazil', 'Argentina'].map((cert) => (
                        <div key={cert} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`sa-${cert}`}
                            value={cert}
                            {...register('southAmericaSpecific')}
                            className="mr-2"
                          />
                          <label htmlFor={`sa-${cert}`} className="text-gray-700">{cert}</label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">For multiple selections hold CTRL and left click on all applicable options</p>
                  </div>
                )}

                {showCertificationDetails.taiwan && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">Taiwan Specific Certifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="taiwan-bsmi"
                          value="BSMI"
                          {...register('taiwanSpecific')}
                          className="mr-2"
                        />
                        <label htmlFor="taiwan-bsmi" className="text-gray-700">BSMI</label>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">For multiple selections hold CTRL and left click on all applicable options</p>
                  </div>
                )}

                {showCertificationDetails.australia && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">Australia/New Zealand Specific Certifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="aus-rcm"
                          value="RCM"
                          {...register('australiaSpecific')}
                          className="mr-2"
                        />
                        <label htmlFor="aus-rcm" className="text-gray-700">RCM</label>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">For multiple selections hold CTRL and left click on all applicable options</p>
                  </div>
                )}
                
                <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Product Information</h2>
                
                <div className="mb-6">
                  <label htmlFor="productType" className="block text-gray-700 text-sm font-medium mb-2">Product Type/Description *</label>
                  <textarea
                    id="productType"
                    {...register('productType')}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900 ${errors.productType ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="This should contain detail about the unit's main functions, and how it achieves those functions. This should be a general, but technical description."
                  ></textarea>
                  {errors.productType && (
                    <p className="text-red-500 text-sm mt-1">{errors.productType.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="powerInput" className="block text-gray-700 text-sm font-medium mb-2">Power Input Rating (V,A)</label>
                    <input
                      type="text"
                      id="powerInput"
                      {...register('powerInput')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="clockFrequency" className="block text-gray-700 text-sm font-medium mb-2">Highest Clock Frequency in Device</label>
                    <input
                      type="text"
                      id="clockFrequency"
                      {...register('clockFrequency')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Environmental Rating *</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="envRating1"
                        value="Indoor only"
                        {...register('environmentalRating')}
                        className="mr-2"
                      />
                      <label htmlFor="envRating1" className="text-gray-700">Indoor only</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="envRating2"
                        value="Indoor/Outdoor"
                        {...register('environmentalRating')}
                        className="mr-2"
                      />
                      <label htmlFor="envRating2" className="text-gray-700">Indoor/Outdoor</label>
                    </div>
                  </div>
                  {errors.environmentalRating && (
                    <p className="text-red-500 text-sm mt-1">{errors.environmentalRating.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="modelNumbers" className="block text-gray-700 text-sm font-medium mb-2">Model Numbers *</label>
                  <textarea
                    id="modelNumbers"
                    {...register('modelNumbers')}
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900 ${errors.modelNumbers ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Please separate model numbers by commas (10 max). Indicate model differences and family groupings."
                  ></textarea>
                  {errors.modelNumbers && (
                    <p className="text-red-500 text-sm mt-1">{errors.modelNumbers.message}</p>
                  )}
                </div>
                
                <div className="mb-8">
                  <label htmlFor="productWeight" className="block text-gray-700 text-sm font-medium mb-2">Approximate Product Weight (lbs)</label>
                  <input
                    type="text"
                    id="productWeight"
                    {...register('productWeight')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900"
                  />
                </div>
                
                <div className="mb-8">
                  <label htmlFor="deadline" className="block text-gray-700 text-sm font-medium mb-2">Deadline for Certification</label>
                  <input
                    type="date"
                    id="deadline"
                    {...register('deadline')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900"
                  />
                </div>
                
                <div className="mb-8">
                  <label htmlFor="comments" className="block text-gray-700 text-sm font-medium mb-2">Additional Comments</label>
                  <textarea
                    id="comments"
                    {...register('comments')}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900"
                    placeholder="Please provide any additional details about your product and certification needs."
                  ></textarea>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="leadSource" className="block text-gray-700 text-sm font-medium mb-2">How did you hear about us? *</label>
                  <select
                    id="leadSource"
                    {...register('leadSource')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900 ${errors.leadSource ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Please Choose</option>
                    <option value="Google Ad">Google Ad</option>
                    <option value="Google Search (organic)">Google Search (organic)</option>
                    <option value="Yahoo Search">Yahoo Search</option>
                    <option value="Bing Search">Bing Search</option>
                    <option value="Referral">Referral</option>
                    <option value="Existing Customer">Existing Customer</option>
                    <option value="Trade Show">Trade Show</option>
                    <option value="E-mail Campaign">E-mail Campaign</option>
                    <option value="Magazine/Journal">Magazine/Journal</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.leadSource && (
                    <p className="text-red-500 text-sm mt-1">{errors.leadSource.message}</p>
                  )}
                </div>
                
                <div className="mb-8">
                  <label htmlFor="keyword" className="block text-gray-700 text-sm font-medium mb-2">Keyword used for search</label>
                  <input
                    type="text"
                    id="keyword"
                    {...register('keyword')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-gray-900"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[var(--primary-color)] text-white py-3 px-8 rounded-md hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 