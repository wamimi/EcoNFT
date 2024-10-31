// src/utils/vottun/test.ts
import axios from 'axios';

export const testVottunConnection = async () => {
  try {
    // Just log the configuration first
    console.log('Testing Vottun connection with config:', {
      hasApiKey: !!process.env.NEXT_PUBLIC_VOTTUN_API_KEY,
      apiUrl: process.env.NEXT_PUBLIC_VOTTUN_IPFS_API_URL
    });
    return true;
  } catch (error) {
    console.error('Test error:', error);
    return false;
  }
};