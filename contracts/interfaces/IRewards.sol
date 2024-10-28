// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IRewards {
    function awardPoints(address user, uint256 amount) external;
}