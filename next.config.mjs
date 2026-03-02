import withPWA from '@ducanh2912/next-pwa';

const nextConfig = {
  /* config options here */
  reactCompiler: false,
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  output: (process.env.NODE_ENV === 'production' && !process.env.VERCEL) ? 'export' : undefined,
};

const finalConfig = process.env.NODE_ENV === 'production'
  ? withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
  })(nextConfig)
  : nextConfig;

export default finalConfig;
