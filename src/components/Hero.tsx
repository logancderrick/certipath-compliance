import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative bg-[var(--secondary-color)] text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            EXPERT PRODUCT CERTIFICATION SOLUTIONS
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Streamlining your path to global market access with strategic compliance expertise.
          </p>
          <Link 
            href="/request-quote" 
            className="inline-block bg-[var(--primary-color)] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-[var(--primary-dark)] transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </div>
      
      {/* Certification Marks */}
      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {['ANATAL', 'CE', 'CSA', 'FCC', 'BIS', 'KCC', 'NOM', 'RCM', 'EAC', 'UL', 'VCCI'].map((mark) => (
              <div key={mark} className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--gray-medium)] rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-[var(--secondary-color)] font-bold text-xs">{mark}</span>
                </div>
                <span className="text-[var(--secondary-color)] text-sm">{mark} Mark</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 