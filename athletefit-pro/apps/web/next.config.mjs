/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@athletefit/database',
    '@athletefit/design-system',
    '@athletefit/sport-configs',
  ],
};

export default nextConfig;
