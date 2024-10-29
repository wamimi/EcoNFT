// src/config/contracts.ts
export const CONTRACT_ADDRESS = {
    // Replace these with your deployed contract addresses
    ECONFT: process.env.NEXT_PUBLIC_ECONFT_ADDRESS || '',
    CARBON_REGISTRY: process.env.NEXT_PUBLIC_CARBON_REGISTRY_ADDRESS || '',
    REWARDS: process.env.NEXT_PUBLIC_REWARDS_ADDRESS || ''
  } as const
  
  export const SUPPORTED_CHAINS = {
    ARBITRUM_SEPOLIA: 421614
  } as const