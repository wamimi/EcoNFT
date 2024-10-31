// src/components/web3/MintForm.tsx
'use client'

import { useState, useCallback } from 'react'
import { useWeb3 } from '@/contexts/Web3Context'
import { Card } from '../common/Card'
import { VottunIPFS } from '@/utils/vottun/ipfs'
import { useRouter } from 'next/navigation'

function MintForm() {
  const router = useRouter()
  const { mintNFT } = useWeb3()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    carbonCredits: '',
    projectId: '',
    verificationStandard: '',
    vintage: String(new Date().getFullYear())
  })
  const [file, setFile] = useState<File | null>(null)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // 1. Upload image to IPFS
      console.log('Uploading image to IPFS...')
      console.log('File to upload:', file)
      const imageUpload = await VottunIPFS.uploadFile(file)
      console.log('Image uploaded:', imageUpload)

      // 2. Create and upload metadata
      const metadata = {
        name: formData.name,
        description: formData.description,
        image: imageUpload.hash,
        attributes: [
          {
            trait_type: "Carbon Credits",
            value: parseInt(formData.carbonCredits)
          },
          {
            trait_type: "Project ID",
            value: formData.projectId
          },
          {
            trait_type: "Verification Standard",
            value: formData.verificationStandard
          },
          {
            trait_type: "Vintage Year",
            value: parseInt(formData.vintage)
          }
        ],
        data: {
          carbonCredits: parseInt(formData.carbonCredits),
          projectId: formData.projectId,
          verificationStandard: formData.verificationStandard,
          vintage: parseInt(formData.vintage)
        }
      }

      console.log('Uploading metadata to IPFS...')
      console.log('Metadata to upload:', metadata)
      const metadataUpload = await VottunIPFS.uploadMetadata(metadata)
      console.log('Metadata uploaded:', metadataUpload)

      // 3. Mint NFT
      console.log('Minting NFT...')
      const txHash = await mintNFT(
        metadataUpload.IpfsHash, 
        parseInt(formData.carbonCredits)
      )
      console.log('NFT minted successfully:', txHash)

      // Reset form
      setFormData({
        name: '',
        description: '',
        carbonCredits: '',
        projectId: '',
        verificationStandard: '',
        vintage: String(new Date().getFullYear())
      })
      setFile(null)

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      if (fileInput) {
        fileInput.value = ''
      }

      // Show success message
      alert('NFT minted successfully!')
      
      // Redirect to dashboard
      router.push('/dashboard')

    } catch (error) {
      console.error('Minting error:', error)
      setError(error instanceof Error ? error.message : 'Error minting NFT')
    } finally {
      setIsLoading(false)
    }
  }, [file, formData, mintNFT, router])

// Add this return statement with all the form JSX
return (
    <Card className="max-w-2xl mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

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
          {isLoading ? 'Processing...' : 'Mint NFT'}
        </button>
      </form>
    </Card>
);
  // Rest of your component remains the same...
  // (Keep all the JSX exactly as it was)
}

export default MintForm