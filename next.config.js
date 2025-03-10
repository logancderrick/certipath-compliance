/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ul.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'incompliancemag.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets-incompliancemag-com.s3.amazonaws.com',
        pathname: '/**',
      }
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
};

export default nextConfig; 