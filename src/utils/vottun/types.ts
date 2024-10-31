// src/utils/vottun/types.ts
export interface IPFSUploadResponse {
  hash: string;
}

export interface IPFSMetadataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export interface NFTDeployResponse {
  contractAddress: string;
  txHash: string;
}

export interface NFTMintResponse {
  txHash: string;
  nonce: number;
}

export interface CarbonCreditMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: any;
    max_value?: number;
  }[];
  data: {
    carbonCredits: number;
    projectId: string;
    verificationStandard: string;
    vintage: number;
  };
}