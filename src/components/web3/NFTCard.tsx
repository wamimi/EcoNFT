// src/components/web3/NFTCard.tsx
'use client'

import { Card } from '../common/Card'
import Image from 'next/image'

interface NFTCardProps {
  tokenId: string
  name: string
  image: string
  carbonCredits: number
  projectId: string
  onRetire?: () => void
}

export function NFTCard({ 
  tokenId, 
  name, 
  image, 
  carbonCredits, 
  projectId,
  onRetire 
}: NFTCardProps) {
  return (
    <Card className="max-w-sm">
      <div className="relative h-48 w-full mb-4">
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <div className="space-y-2 text-sm text-gray-600">
        <p>Token ID: {tokenId}</p>
        <p>Carbon Credits: {carbonCredits} tons</p>
        <p>Project ID: {projectId}</p>
      </div>
      {onRetire && (
        <button
          onClick={onRetire}
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        >
          Retire Credits
        </button>
      )}
    </Card>
  )
}