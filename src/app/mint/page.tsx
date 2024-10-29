// src/app/mint/page.tsx
import { MintForm } from '@/components/web3/MintForm'

export default function MintPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Mint Carbon Credit NFT
      </h1>
      <MintForm />
    </div>
  )
}