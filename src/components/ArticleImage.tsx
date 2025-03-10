'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ArticleImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
}

// Base64 encoded placeholder image (light gray with CertiPath text)
const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzljYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNlcnRpUGF0aCBDb21wbGlhbmNlPC90ZXh0Pjwvc3ZnPg==';

export default function ArticleImage({ src, alt, className, fill = false }: ArticleImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className || ''}`}>
      <Image
        src={imgSrc}
        alt={alt}
        fill={fill}
        className={`duration-700 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={() => setImgSrc(defaultImage)}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
} 