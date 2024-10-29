// src/components/web3/NFTGrid.tsx
'use client'

import { NFTCard } from './NFTCard'

interface NFT {
  tokenId: string;
  name: string;
  image: string;
  carbonCredits: number;
  projectId: string;
}

interface NFTGridProps {
  nfts: NFT[];
  onRetire?: (tokenId: string) => void;
  showRetireButton?: boolean;
}

export function NFTGrid({ nfts, onRetire, showRetireButton = false }: NFTGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {nfts.map((nft) => (
        <NFTCard
          key={nft.tokenId}
          {...nft}
          onRetire={showRetireButton ? () => onRetire?.(nft.tokenId) : undefined}
        />
      ))}
    </div>
  )
}