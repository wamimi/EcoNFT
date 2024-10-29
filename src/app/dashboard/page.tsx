// src/app/dashboard/page.tsx
'use client'

import { NFTGrid } from '@/components/web3/NFTGrid'
import { Card } from '@/components/common/Card'
import { useWeb3 } from '@/contexts/Web3Context'
import { useAccount } from 'wagmi'

export default function DashboardPage() {
  const { address } = useAccount()
  const { userNFTs, userStats, retireCredits, isLoading } = useWeb3()

  const handleRetire = async (tokenId: string) => {
    try {
      await retireCredits(tokenId)
    } catch (error) {
      console.error('Error retiring credits:', error)
    }
  }

  if (!address) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <p className="text-center text-gray-600">
            Please connect your wallet to view your dashboard
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Total NFTs</h3>
          <p className="text-3xl font-bold text-green-600">
            {userStats?.totalNFTs ?? 0}
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Total Carbon Credits</h3>
          <p className="text-3xl font-bold text-green-600">
            {userStats?.totalCarbonCredits ?? 0} tons
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Retired Credits</h3>
          <p className="text-3xl font-bold text-green-600">
            {userStats?.retiredCredits ?? 0} tons
          </p>
        </Card>
      </div>

      {/* NFTs Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Carbon Credit NFTs</h2>
        {isLoading ? (
          <Card>
            <p className="text-center text-gray-600">Loading your NFTs...</p>
          </Card>
        ) : userNFTs.length === 0 ? (
          <Card>
            <p className="text-center text-gray-600">
              You don't have any Carbon Credit NFTs yet
            </p>
          </Card>
        ) : (
          <NFTGrid 
            nfts={userNFTs} 
            onRetire={handleRetire}
            showRetireButton={true}
          />
        )}
      </div>
    </div>
  )
}