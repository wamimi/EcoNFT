// src/components/web3/MintForm.tsx
'use client'

import { useState } from 'react'
import { useWeb3 } from '@/contexts/Web3Context'
import { VottunIPFS } from '@/utils/vottun/ipfs'
import { VottunNFT } from '@/utils/vottun/nft721'
import { Card } from '../common/Card'

export function MintForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    carbonCredits: '',
    projectId: '',
    verificationStandard: '',
    vintage: new Date().getFullYear().toString()
  })
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return

    try {
      setIsLoading(true)
      
      // Upload image to IPFS
      const imageUpload = await VottunIPFS.uploadFile(file)
      
      // Create metadata
      const metadata = {
        name: formData.name,
        description: formData.description,
        image: imageUpload.hash,
        attributes: [
          {
            trait_type: "Carbon Credits",
            value: parseInt(formData.carbonCredits)
          }
        ],
        data: {
          carbonCredits: parseInt(formData.carbonCredits),
          projectId: formData.projectId,
          verificationStandard: formData.verificationStandard,
          vintage: parseInt(formData.vintage)
        }
      }

      // Upload metadata to IPFS
      const metadataUpload = await VottunIPFS.uploadMetadata(metadata)

      // TODO: Call your smart contract to mint the NFT
      
    } catch (error) {
      console.error('Error minting NFT:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carbon Credits (tons)
            </label>
            <input
              type="number"
              name="carbonCredits"
              value={formData.carbonCredits}
              onChange={handleChange}
              required
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project ID
            </label>
            <input
              type="text"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Verification Standard
            </label>
            <input
              type="text"
              name="verificationStandard"
              value={formData.verificationStandard}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vintage Year
            </label>
            <input
              type="number"
              name="vintage"
              value={formData.vintage}
              onChange={handleChange}
              required
              min="2000"
              max={new Date().getFullYear()}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Minting...' : 'Mint NFT'}
        </button>
      </form>
    </Card>
  )
}