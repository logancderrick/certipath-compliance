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
  // We no longer need this since we're not using the carousel
  // const allItems = [...certificationMarks, ...certificationMarks];
  
  return (
    <div className="relative bg-[var(--secondary-color)] text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
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

          {/* Certification Marks Image */}
          <div className="relative w-full md:w-auto max-w-md">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <Image
                src="/images/logos/marks-image-generated.png"
                alt="Global Certification Marks"
                width={400}
                height={300}
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[var(--primary-color)] text-white text-sm px-3 py-1 rounded-full shadow-md">
              Global Compliance
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Certification Marks */}
      <div className="bg-white py-6 lg:hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {certificationMarks.slice(0, 6).map((mark) => (
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

      {/* We can also remove the keyframe animation since we're not using it anymore */}
    </div>
  );
};

export default Hero; 