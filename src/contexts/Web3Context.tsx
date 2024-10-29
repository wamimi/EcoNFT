// src/contexts/Web3Context.tsx
'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useEcoNFT } from '@/hooks/useEcoNFT'

export interface NFTData {
  tokenId: string
  name: string
  image: string
  carbonCredits: number
  projectId: string
  verificationStandard: string
  vintage: number
  owner: string
}

interface Web3ContextType {
  userNFTs: NFTData[]  // Specify array type explicitly
  userStats: {
    totalNFTs: number
    totalCarbonCredits: number
    retiredCredits: number
  } | null
  isLoading: boolean
  mintNFT: (uri: string, carbonCredits: number) => Promise<`0x${string}`>
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function Web3Provider({ children }: { children: ReactNode }) {
  const ecoNFT = useEcoNFT()

  // Ensure the value matches the expected type
  const value: Web3ContextType = {
    userNFTs: ecoNFT.userNFTs as NFTData[],
    userStats: ecoNFT.userStats,
    isLoading: ecoNFT.isLoading,
    mintNFT: ecoNFT.mintNFT
  }

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider')
  }
  return context
}