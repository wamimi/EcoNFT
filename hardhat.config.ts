// hardhat.config.ts
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const config = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    arbitrumOne: {
      url: `https://arb1.arbitrum.io/rpc`,
      chainId: 42161,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    arbitrumGoerli: {
      url: `https://goerli-rollup.arbitrum.io/rpc`,
      chainId: 421613,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    arbitrumSepolia: {
      url: `https://sepolia-rollup.arbitrum.io/rpc`,
      chainId: 421614,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    }
  },
  etherscan: {
    apiKey: {
      arbitrumOne: process.env.ARBISCAN_API_KEY || "",
      arbitrumGoerli: process.env.ARBISCAN_API_KEY || "",
      arbitrumSepolia: process.env.ARBISCAN_API_KEY || "",
    },
  },
};

module.exports = config;