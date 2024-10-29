// src/hooks/useEcoNFT.ts
'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { CONTRACT_ADDRESS } from '@/config/contracts'

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

interface UserStats {
  totalNFTs: number
  totalCarbonCredits: number
  retiredCredits: number
}

export function useEcoNFT() {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  const { data: userNFTs } = useReadContract({
    address: CONTRACT_ADDRESS.ECONFT as `0x${string}`,
    abi: [
      'function getUserNFTs(address) view returns (tuple(uint256 tokenId, string name, string image, uint256 carbonCredits, string projectId, string verificationStandard, uint256 vintage, address owner)[])',
    ],
    functionName: 'getUserNFTs',
    args: [address],
  }) as { data: NFTData[] }

  const { data: userStats } = useReadContract({
    address: CONTRACT_ADDRESS.ECONFT as `0x${string}`,
    abi: [
      'function getUserStats(address) view returns (uint256 totalNFTs, uint256 totalCarbonCredits, uint256 retiredCredits)',
    ],
    functionName: 'getUserStats',
    args: [address],
  }) as { data: [bigint, bigint, bigint] }

  const { writeContractAsync: mintNFT } = useWriteContract()

  const handleMint = async (uri: string, carbonCredits: number) => {
    setIsLoading(true)
    try {
      const hash = await mintNFT({
        address: CONTRACT_ADDRESS.ECONFT as `0x${string}`,
        abi: [
          'function safeMint(string uri, uint256 carbonCredits)',
        ],
        functionName: 'safeMint',
        args: [uri, carbonCredits],
      })
      return hash
    } finally {
      setIsLoading(false)
    }
  }

  return {
    userNFTs: userNFTs || [],
    userStats: userStats ? {
      totalNFTs: Number(userStats[0]),
      totalCarbonCredits: Number(userStats[1]),
      retiredCredits: Number(userStats[2]),
    } : null,
    isLoading,
    mintNFT: handleMint,
  }
}