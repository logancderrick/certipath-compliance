'use client';

import Link from 'next/link';
import Image from 'next/image';

const certificationMarks = [
  { src: '/images/marks/ANATELlogo.png', alt: 'ANATEL Certification Mark' },
  { src: '/images/marks/BISlogo.gif', alt: 'BIS Certification Mark' },
  { src: '/images/marks/CElogo.gif', alt: 'CE Certification Mark' },
  { src: '/images/marks/CSAlogo.gif', alt: 'CSA Certification Mark' },
  { src: '/images/marks/EAClogo.gif', alt: 'EAC Certification Mark' },
  { src: '/images/marks/FCClogo.gif', alt: 'FCC Certification Mark' },
  { src: '/images/marks/KCLogo.png', alt: 'KC Certification Mark' },
  { src: '/images/marks/NOMmark.gif', alt: 'NOM Certification Mark' },
  { src: '/images/marks/RCMlogo.gif', alt: 'RCM Certification Mark' },
  { src: '/images/marks/ULlogo.jpg', alt: 'UL Certification Mark' },
  { src: '/images/marks/VCCIlogo.gif', alt: 'VCCI Certification Mark' },
];

const Hero = () => {
  // Double the items to create a seamless loop
  const allItems = [...certificationMarks, ...certificationMarks];
  
  return (
    <div className="relative bg-[var(--secondary-color)] text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex items-center justify-between">
          <div className="max-w-2xl">
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

          {/* Vertical Certification Marks Carousel */}
          <div className="hidden lg:block relative w-40 h-[450px] overflow-hidden">
            <div 
              className="flex flex-col gap-6 animate-scroll"
              style={{
                animation: 'scroll 30s linear infinite',
              }}
            >
              {allItems.map((mark, index) => (
                <div 
                  key={`${mark.alt}-${index}`}
                  className="w-full h-[80px] relative bg-white rounded-lg p-1"
                >
                  <Image
                    src={mark.src}
                    alt={mark.alt}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Certification Marks */}
      <div className="bg-white py-6 lg:hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {certificationMarks.map((mark) => (
              <div key={mark.alt} className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[var(--gray-medium)] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Image
                    src={mark.src}
                    alt={mark.alt}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add the keyframe animation */}
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Hero; 