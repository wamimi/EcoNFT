// src/components/web3/MintFormWrapper.tsx
'use client'

import dynamic from 'next/dynamic'

const MintForm = dynamic(
  () => import('./MintForm').then(mod => mod.default as React.ComponentType),
  { 
    ssr: false,
    loading: () => (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <p className="text-center text-gray-600">Loading form...</p>
      </div>
    )
  }
)

export function MintFormWrapper() {
  return <MintForm />
}