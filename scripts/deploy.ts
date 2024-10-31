// scripts/deploy.ts
import { ethers } from "hardhat";

async function main() {
  console.log("Starting deployment...");

  // Deploy Carbon Registry
  console.log("Deploying Carbon Registry...");
  const CarbonRegistry = await ethers.getContractFactory("CarbonRegistry");
  const carbonRegistry = await CarbonRegistry.deploy();
  await carbonRegistry.waitForDeployment();
  const carbonRegistryAddress = await carbonRegistry.getAddress();
  console.log("CarbonRegistry deployed to:", carbonRegistryAddress);

  // Deploy Rewards
  console.log("Deploying Rewards Contract...");
  const Rewards = await ethers.getContractFactory("Rewards");
  const rewards = await Rewards.deploy();
  await rewards.waitForDeployment();
  const rewardsAddress = await rewards.getAddress();
  console.log("Rewards deployed to:", rewardsAddress);

  // Deploy EcoNFT
  console.log("Deploying EcoNFT...");
  const EcoNFT = await ethers.getContractFactory("EcoNFT");
  const ecoNFT = await EcoNFT.deploy(carbonRegistryAddress, rewardsAddress);
  await ecoNFT.waitForDeployment();
  const ecoNFTAddress = await ecoNFT.getAddress();
  console.log("EcoNFT deployed to:", ecoNFTAddress);

  // Set up permissions
  console.log("Setting up permissions...");
  const minterRole = await ecoNFT.MINTER_ROLE();
  const grantRoleTx = await carbonRegistry.grantRole(minterRole, ecoNFTAddress);
  await grantRoleTx.wait();
  console.log("Permissions configured");

  console.log("Deployment completed!");
  console.log({
    carbonRegistry: carbonRegistryAddress,
    rewards: rewardsAddress,
    ecoNFT: ecoNFTAddress
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });