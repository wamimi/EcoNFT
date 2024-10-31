// src/utils/vottun/ipfs.ts
import axios from 'axios'

export const VottunIPFS = {
  async uploadFile(file: File) {
    const formData = new FormData()
    formData.append('filename', file.name)
    formData.append('file', file)

    try {
      // Use our proxy API route instead of calling Vottun directly
      const response = await fetch('/api/vottun/ipfs', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text(); // Capture the error response
        console.error('Failed to upload to IPFS:', errorText);
        throw new Error('Failed to upload to IPFS');
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('IPFS Upload Error:', error)
      throw error
    }
  },

  async uploadMetadata(metadata: any) {
    try {
      const response = await fetch('/api/vottun/ipfs/metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
      })

      if (!response.ok) {
        throw new Error('Failed to upload metadata')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Metadata Upload Error:', error)
      throw error
    }
  }
}