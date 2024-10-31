// src/components/vottun/nftminter.tsx
'use client'

import { useState } from 'react'
import { useWeb3 } from '@/contexts/Web3Context'
import { VottunIPFS } from '@/utils/vottun/ipfs'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { IPFSUpload } from './IPFSUpload'

export function NFTMinter() {
  const { mintNFT } = useWeb3()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    carbonCredits: '',
    projectId: '',
    verificationStandard: '',
    vintage: new Date().getFullYear().toString()
  })
  const [ipfsHash, setIpfsHash] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ipfsHash) {
      setError('Please upload an image first')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Create metadata
      const metadata = {
        name: formData.name,
        description: formData.description,
        image: ipfsHash,
        attributes: [
          {
            trait_type: 'Carbon Credits',
            value: parseInt(formData.carbonCredits)
          },
          {
            trait_type: 'Project ID',
            value: formData.projectId
          },
          {
            trait_type: 'Verification Standard',
            value: formData.verificationStandard
          },
          {
            trait_type: 'Vintage Year',
            value: parseInt(formData.vintage)
          }
        ],
        data: {}
      }

      // Upload metadata to IPFS
      const metadataUpload = await VottunIPFS.uploadMetadata(metadata)

      // Mint NFT
      await mintNFT(metadataUpload.IpfsHash, parseInt(formData.carbonCredits))

      // Reset form
      setFormData({
        name: '',
        description: '',
        carbonCredits: '',
        projectId: '',
        verificationStandard: '',
        vintage: new Date().getFullYear().toString()
      })
      setIpfsHash('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error minting NFT')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <IPFSUpload onUploadComplete={setIpfsHash} />
      
      <Input
        label="NFT Name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        required
      />

      <Input
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        required
        type="textarea"
      />

      <Input
        label="Carbon Credits (tons)"
        value={formData.carbonCredits}
        onChange={(e) => setFormData(prev => ({ ...prev, carbonCredits: e.target.value }))}
        required
        type="number"
        min="1"
      />

      <Input
        label="Project ID"
        value={formData.projectId}
        onChange={(e) => setFormData(prev => ({ ...prev, projectId: e.target.value }))}
        required
      />

      <Input
        label="Verification Standard"
        value={formData.verificationStandard}
        onChange={(e) => setFormData(prev => ({ ...prev, verificationStandard: e.target.value }))}
        required
      />

      <Input
        label="Vintage Year"
        value={formData.vintage}
        onChange={(e) => setFormData(prev => ({ ...prev, vintage: e.target.value }))}
        required
        type="number"
        min="2000"
        max={new Date().getFullYear()}
      />

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Minting...' : 'Mint NFT'}
      </Button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  )
}