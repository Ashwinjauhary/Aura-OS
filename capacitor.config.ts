import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ashwin.portfolio',
  appName: 'Aura OS',
  webDir: 'out',
  server: {
    url: 'https://aura-os-theta.vercel.app/',
    cleartext: true
  }
};

export default config;
