// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract CarbonRegistry is AccessControl, Pausable {
    // Roles
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    
    // Structs
    struct CarbonCredit {
        uint256 amount;
        string projectId;
        string verificationStandard; // e.g., "VCS", "GoldStandard"
        uint256 vintage;            // Year of credit generation
        bool isVerified;
        string metadata;           // Additional project details
    }
    
    // State variables
    mapping(bytes32 => CarbonCredit) public carbonCredits;
    mapping(address => uint256) public userRetiredCredits;
    uint256 public totalRetiredCredits;
    
    // Events
    event CarbonCreditsVerified(
        bytes32 indexed batchId,
        uint256 amount,
        string projectId,
        uint256 vintage
    );
    event CarbonCreditsRetired(
        address indexed user,
        uint256 amount,
        string projectId
    );
    event VerificationStandardUpdated(
        string projectId,
        string oldStandard,
        string newStandard
    );

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
    }

    // Verification functions
    function verifyCarbonCredits(
        bytes32 batchId,
        uint256 amount,
        string memory projectId,
        string memory standard,
        uint256 vintage,
        string memory metadata
    ) external onlyRole(VERIFIER_ROLE) whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(bytes(projectId).length > 0, "Project ID required");
        require(vintage > 0 && vintage <= block.timestamp / 365 days + 1970, "Invalid vintage year");
        
        carbonCredits[batchId] = CarbonCredit({
            amount: amount,
            projectId: projectId,
            verificationStandard: standard,
            vintage: vintage,
            isVerified: true,
            metadata: metadata
        });

        emit CarbonCreditsVerified(batchId, amount, projectId, vintage);
    }

    function verifyCarbonCredits(uint256 amount) external pure returns (bool) {
        // Simple verification for the EcoNFT contract
        // In production, you would implement more complex verification logic
        return amount > 0;
    }

    // Retirement functions
    function recordRetirement(uint256 amount, address user) external whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(user != address(0), "Invalid user address");
        
        userRetiredCredits[user] += amount;
        totalRetiredCredits += amount;
        
        emit CarbonCreditsRetired(user, amount, "");
    }

    // Query functions
    function getUserRetiredCredits(address user) external view returns (uint256) {
        return userRetiredCredits[user];
    }

    function getCarbonCreditDetails(bytes32 batchId) external view returns (
        uint256 amount,
        string memory projectId,
        string memory standard,
        uint256 vintage,
        bool isVerified,
        string memory metadata
    ) {
        CarbonCredit memory credit = carbonCredits[batchId];
        return (
            credit.amount,
            credit.projectId,
            credit.verificationStandard,
            credit.vintage,
            credit.isVerified,
            credit.metadata
        );
    }

    // Admin functions
    function updateVerificationStandard(
        bytes32 batchId,
        string memory newStandard
    ) external onlyRole(VERIFIER_ROLE) {
        require(carbonCredits[batchId].isVerified, "Credit batch not found");
        
        string memory oldStandard = carbonCredits[batchId].verificationStandard;
        carbonCredits[batchId].verificationStandard = newStandard;
        
        emit VerificationStandardUpdated(
            carbonCredits[batchId].projectId,
            oldStandard,
            newStandard
        );
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}