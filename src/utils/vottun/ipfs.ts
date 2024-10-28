// src/utils/vottun/ipfs.ts
import axios from 'axios';
import { VOTTUN_CONFIG } from './config';
import { CarbonCreditMetadata, IPFSMetadataResponse, IPFSUploadResponse } from './types';

export const VottunIPFS = {
  async uploadFile(file: File): Promise<IPFSUploadResponse> {
    const formData = new FormData();
    formData.append('filename', file.name);
    formData.append('file', file);

    const response = await axios.post(
      `${VOTTUN_CONFIG.IPFS_API_URL}/file/upload`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${VOTTUN_CONFIG.API_KEY}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data;
  },

  async uploadMetadata(metadata: CarbonCreditMetadata): Promise<IPFSMetadataResponse> {
    const response = await axios.post(
      `${VOTTUN_CONFIG.IPFS_API_URL}/file/metadata`,
      metadata,
      {
        headers: {
          'Authorization': `Bearer ${VOTTUN_CONFIG.API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  }
};