// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Rewards is AccessControl {
    // Roles
    bytes32 public constant REWARD_MANAGER_ROLE = keccak256("REWARD_MANAGER_ROLE");

    // State variables
    mapping(address => uint256) public userRewards; // Tracks rewards for each user
    uint256 public totalRewardsIssued; // Total rewards issued across all users

    // Events
    event RewardsIssued(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(REWARD_MANAGER_ROLE, msg.sender);
    }

    // Function to issue rewards to a user
    function issueRewards(address user, uint256 amount) external onlyRole(REWARD_MANAGER_ROLE) {
        require(user != address(0), "Invalid user address");
        require(amount > 0, "Amount must be greater than 0");

        userRewards[user] += amount; // Increment user's rewards
        totalRewardsIssued += amount; // Increment total rewards issued

        emit RewardsIssued(user, amount); // Emit event for issued rewards
    }

    // Function for users to claim their rewards
    function claimRewards() external {
        uint256 amount = userRewards[msg.sender]; // Get the user's rewards
        require(amount > 0, "No rewards to claim");

        userRewards[msg.sender] = 0; // Reset user's rewards after claiming
        // Transfer logic would go here (e.g., transferring tokens or native currency)

        emit RewardsClaimed(msg.sender, amount); // Emit event for claimed rewards
    }

    // Function to check user rewards
    function checkRewards(address user) external view returns (uint256) {
        return userRewards[user]; // Return the user's rewards balance
    }
}