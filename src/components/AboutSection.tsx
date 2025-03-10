const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--secondary-color)]">About CertiPath Compliance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-700 mb-6">
              In today's fast-paced global marketplace, bringing innovative products to market quickly is essential for success. At CertiPath Compliance, we've built our reputation on accelerating the certification process without compromising quality or compliance.
            </p>
            <p className="text-gray-700 mb-6">
              We understand that every manufacturer faces unique regulatory challenges. That's why we've developed a client-centered approach that adapts to your specific needs, providing customized solutions that address your particular compliance requirements.
            </p>
            <p className="text-gray-700">
              Our expertise spans the entire certification spectrum—from initial engineering assessments to final market approval. We partner with you to navigate the complex regulatory landscape, ensuring your products meet all necessary standards while minimizing delays and reducing costs.
            </p>
          </div>
          
          <div className="bg-[var(--gray-light)] rounded-lg p-8 h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-[var(--primary-color)] rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <p className="text-[var(--secondary-color)] font-medium">Global Compliance Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 