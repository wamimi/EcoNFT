// src/utils/vottun/nft721.ts
import axios from 'axios';
import { VOTTUN_CONFIG } from './config';
import { NFTDeployResponse, NFTMintResponse } from './types';

export const VottunNFT = {
  async deployContract(name: string, symbol: string): Promise<NFTDeployResponse> {
    const response = await axios.post(
      `${VOTTUN_CONFIG.NFT_API_URL}/deploy`,
      {
        name,
        symbol,
        network: VOTTUN_CONFIG.NETWORK_ID,
        alias: `EcoNFT-${Date.now()}`
      },
      {
        headers: {
          'Authorization': `Bearer ${VOTTUN_CONFIG.API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  },

  async mintNFT(
    contractAddress: string,
    recipientAddress: string,
    tokenId: number,
    ipfsUri: string,
    ipfsHash: string,
    royaltyPercentage: number = 10
  ): Promise<NFTMintResponse> {
    const response = await axios.post(
      `${VOTTUN_CONFIG.NFT_API_URL}/mint`,
      {
        contractAddress,
        recipientAddress,
        tokenId,
        ipfsUri,
        ipfsHash,
        network: VOTTUN_CONFIG.NETWORK_ID,
        royaltyPercentage
      },
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