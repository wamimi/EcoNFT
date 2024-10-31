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
  userNFTs: NFTData[]
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

  const value: Web3ContextType = {
    userNFTs: ecoNFT.userNFTs as NFTData[],
    userStats: ecoNFT.userStats,
    isLoading: ecoNFT.isLoading,
    mintNFT: async (uri: string, carbonCredits: number) => {
      try {
        const tx = await ecoNFT.mintNFT(uri, carbonCredits)
        return tx as `0x${string}`
      } catch (error) {
        console.error('Minting error in context:', error)
        throw error
      }
    }
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