import withPWA from '@ducanh2912/next-pwa';

const nextConfig = {
  /* config options here */
  reactCompiler: false,
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})(nextConfig);
