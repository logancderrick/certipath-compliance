export default function AboutUsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[var(--primary-color)] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-white/80">
              Learn more about our expertise and approach to compliance solutions
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At CertiPath Compliance, we&apos;re committed to making the complex world of product certifications simpler, faster, and more reliable for your business, wherever you operate globally.
            </p>
            <p className="text-gray-700">
              Our mission is to provide comprehensive regulatory compliance services that enable manufacturers to navigate global certification requirements efficiently, allowing them to focus on what they do best - creating innovative products.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Expertise</h2>
            <p className="text-gray-700 mb-4">
              We specialize in providing comprehensive regulatory compliance services tailored for manufacturers of electronic products and machinery. With an understanding that each business has its own unique operational needs, we offer flexible and customized solutions designed to meet your specific compliance requirements.
            </p>
            <p className="text-gray-700 mb-4">
              Our core services include Engineering Solutions, Global Product Certifications, and Compliance Roadmaps. We work closely with clients to ensure they meet global standards for certification, providing expert guidance and efficient pathways to achieve regulatory compliance across all global markets including India BIS, CE, NRTL Certification (UL/CSA), and many more.
            </p>
            <p className="text-gray-700">
              With over 35 years of combined experience in the industry, our team of experts has the knowledge and connections to streamline the certification process, saving you time and resources.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Client-Centered</h3>
                <p className="text-gray-700 mb-6">
                  We prioritize understanding your unique needs and challenges, tailoring our services to provide the most effective solutions for your specific situation.
                </p>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900">Expertise-Driven</h3>
                <p className="text-gray-700">
                  Our team consists of industry veterans with deep knowledge of global regulatory requirements and certification processes, ensuring you receive the highest level of service.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Efficiency-Focused</h3>
                <p className="text-gray-700 mb-6">
                  We streamline the certification process, leveraging our expertise and connections to minimize delays and accelerate your time to market.
                </p>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900">Globally Connected</h3>
                <p className="text-gray-700">
                  With access to certification bodies and testing laboratories worldwide, we facilitate seamless compliance across multiple markets, supporting your global business strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 