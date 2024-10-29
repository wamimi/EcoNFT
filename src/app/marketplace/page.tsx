// src/app/marketplace/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { NFTGrid } from '@/components/web3/NFTGrid'
import { Card } from '@/components/common/Card'

export default function MarketplacePage() {
  const [marketplaceNFTs, setMarketplaceNFTs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState({
    minCredits: '',
    maxCredits: '',
    verificationStandard: '',
    vintage: ''
  })

  // TODO: Implement fetching marketplace NFTs

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Carbon Credits Marketplace</h1>

      {/* Filters */}
      <Card className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Min Credits</label>
            <input
              type="number"
              value={filter.minCredits}
              onChange={(e) => setFilter(prev => ({ ...prev, minCredits: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Credits</label>
            <input
              type="number"
              value={filter.maxCredits}
              onChange={(e) => setFilter(prev => ({ ...prev, maxCredits: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Standard</label>
            <select
              value={filter.verificationStandard}
              onChange={(e) => setFilter(prev => ({ ...prev, verificationStandard: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="">All Standards</option>
              <option value="VCS">Verified Carbon Standard</option>
              <option value="GS">Gold Standard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Vintage Year</label>
            <select
              value={filter.vintage}
              onChange={(e) => setFilter(prev => ({ ...prev, vintage: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="">All Years</option>
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* NFTs Grid */}
      {isLoading ? (
        <p>Loading marketplace...</p>
      ) : (
        <NFTGrid nfts={marketplaceNFTs} />
      )}
    </div>
  )
}