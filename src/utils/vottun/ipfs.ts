// src/utils/vottun/ipfs.ts
import axios from 'axios';

export const VottunIPFS = {
  async uploadFile(file: File) {
    // Initialize FormData and append the file and filename
    const formData = new FormData();
    formData.append('filename', file.name);
    formData.append('file', file);

    try {
      // Log the form data setup for debugging
      console.log('Uploading to IPFS with formData:', {
        filename: formData.get('filename'),
        hasFile: formData.has('file')
      });

      // Use the proxy API route instead of calling Vottun directly
      const response = await fetch('/api/vottun/ipfs', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text(); // Capture the error response from the backend
        console.error('Failed to upload to IPFS:', errorText);
        throw new Error(errorText || 'Failed to upload to IPFS');
      }

      const data = await response.json();
      return data; // Successfully uploaded, return data
    } catch (error) {
      console.error('IPFS Upload Error:', error);
      throw error;
    }
  },

  async uploadMetadata(metadata: any) {
    try {
      // Log metadata being uploaded for debugging
      console.log('Uploading metadata to IPFS:', metadata);

      const response = await fetch('/api/vottun/ipfs/metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Capture the error response from the backend
        console.error('Failed to upload metadata to IPFS:', errorText);
        throw new Error(errorText || 'Failed to upload metadata');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Metadata Upload Error:', error);
      throw error;
    }
  }
};
