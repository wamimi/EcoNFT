// src/components/vottun/ipfs.tsx
'use client'

import { useState } from 'react'
import { VottunIPFS } from '@/utils/vottun/ipfs'
import { Button } from '../common/Button'

interface IPFSUploadProps {
  onUploadComplete: (ipfsHash: string) => void;
}

export function IPFSUpload({ onUploadComplete }: IPFSUploadProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;
    
    setIsLoading(true)
    setError(null)
    
    try {
      const file = event.target.files[0]
      const result = await VottunIPFS.uploadFile(file)
      onUploadComplete(result.hash)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading to IPFS')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={handleFileUpload}
        disabled={isLoading}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-green-50 file:text-green-700
          hover:file:bg-green-100"
      />
      {isLoading && <p className="text-sm text-gray-600">Uploading to IPFS...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}