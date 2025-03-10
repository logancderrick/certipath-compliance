'use client';

import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    quote: "CertiPath Compliance revolutionized our approach to global market entry. Their strategic methodology identified certification synergies we hadn't considered, allowing us to enter three additional markets with minimal additional testing. Their proactive approach to regulatory monitoring has since helped us stay ahead of compliance changes, turning what was once a bottleneck into a competitive advantage.",
    name: "Alexandra Chen",
    title: "VP of Product Development, NexGen Devices"
  },
  {
    id: 2,
    quote: "What sets CertiPath apart is their integrated approach to compliance. Rather than treating certification as an afterthought, they helped us incorporate regulatory considerations directly into our design process. This forward-thinking strategy reduced our development cycles by nearly 30% and eliminated the costly redesigns we previously experienced when entering new markets.",
    name: "Marcus Rodriguez",
    title: "Chief Innovation Officer, Quantum Technologies"
  },
  {
    id: 3,
    quote: "The depth of expertise at CertiPath Compliance is truly exceptional. Their team's specialized knowledge of emerging markets saved us months of research and prevented several potential compliance pitfalls. Their ability to coordinate testing requirements across multiple certification bodies streamlined what had previously been our most frustrating business process.",
    name: "Priya Sharma",
    title: "Global Operations Director, Innovate Solutions Ltd."
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--secondary-color)]">Client Success Stories</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[var(--gray-light)] rounded-lg p-8 shadow-md">
            {/* Quote Icon */}
            <div className="absolute -top-5 -left-5 bg-[var(--primary-color)] rounded-full w-10 h-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 italic mb-6">{testimonials[activeIndex].quote}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--gray-medium)] rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-[var(--secondary-color)]">{testimonials[activeIndex].name}</p>
                  <p className="text-gray-600 text-sm">{testimonials[activeIndex].title}</p>
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button 
                onClick={prevTestimonial}
                className="bg-[var(--gray-medium)] hover:bg-[var(--gray-dark)] rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-[var(--primary-color)]' : 'bg-[var(--gray-medium)]'}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextTestimonial}
                className="bg-[var(--gray-medium)] hover:bg-[var(--gray-dark)] rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 