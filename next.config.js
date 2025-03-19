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
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 