// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICarbonRegistry {
    function verifyCarbonCredits(uint256 amount) external view returns (bool);
    function recordRetirement(uint256 amount, address user) external;
}