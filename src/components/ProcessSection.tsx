const ProcessSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--secondary-color)]">Our Methodology</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-700 mb-6">
              CertiPath Compliance employs a distinctive methodology that begins with a comprehensive analysis of your product ecosystem. We don&apos;t just look at individual products—we examine how your entire portfolio interacts with global regulatory frameworks to identify strategic opportunities for streamlining compliance.
            </p>
            <p className="text-gray-700 mb-6">
              Our approach integrates compliance considerations directly into your development process. By identifying potential regulatory challenges early, we help you make design decisions that satisfy multiple market requirements simultaneously, reducing the need for costly redesigns or market-specific variants.
            </p>
            <p className="text-gray-700">
              We leverage advanced data analytics to continuously monitor regulatory trends across industries and regions. This proactive stance allows us to anticipate changes before they impact your business, transforming compliance from a reactive necessity into a strategic advantage that differentiates your products in the marketplace.
            </p>
          </div>
          
          <div className="bg-[var(--gray-light)] rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-bold mb-6 text-[var(--secondary-color)]">Our Strategic Framework</h3>
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  1
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-[var(--secondary-color)]">Comprehensive Analysis</h4>
                  <p className="text-gray-600">We conduct a thorough evaluation of your product portfolio and target markets to develop a customized compliance strategy.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  2
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-[var(--secondary-color)]">Strategic Roadmapping</h4>
                  <p className="text-gray-600">We create a detailed certification plan that optimizes testing sequences and documentation to minimize redundancy.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  3
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-[var(--secondary-color)]">Coordinated Execution</h4>
                  <p className="text-gray-600">We manage the entire certification process with precision, leveraging our established relationships with testing laboratories and regulatory bodies.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  4
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-[var(--secondary-color)]">Continuous Optimization</h4>
                  <p className="text-gray-600">We implement ongoing monitoring and proactive management of your certification portfolio to maintain compliance as regulations evolve.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 