// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract EcoNFT is ERC721, ERC721URIStorage, ERC721Burnable, AccessControl {
    // Counter for token IDs
    uint256 private _nextTokenId;
    
    // Roles
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
    // Mapping from token ID to carbon credits amount
    mapping(uint256 => uint256) public carbonCredits;
    
    // Registry contract reference
    address public carbonRegistry;
    
    // Rewards contract reference
    address public rewardsContract;

    // Events
    event CarbonCreditsRetired(uint256 indexed tokenId, uint256 amount, address indexed retiredBy);
    event CarbonCreditsIssued(uint256 indexed tokenId, uint256 amount, address indexed issuedTo);
    event RegistryUpdated(address indexed oldRegistry, address indexed newRegistry);
    event RewardsContractUpdated(address indexed oldRewards, address indexed newRewards);

    constructor(
        address _carbonRegistry,
        address _rewardsContract
    ) ERC721("EcoNFT", "ECO") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        carbonRegistry = _carbonRegistry;
        rewardsContract = _rewardsContract;
    }

    function safeMint(
        address to,
        string memory uri,
        uint256 creditAmount
    ) public onlyRole(MINTER_ROLE) {
        // Verify carbon credits through registry
        require(
            ICarbonRegistry(carbonRegistry).verifyCarbonCredits(creditAmount),
            "Invalid carbon credits"
        );
        
        uint256 tokenId = _nextTokenId++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        carbonCredits[tokenId] = creditAmount;

        emit CarbonCreditsIssued(tokenId, creditAmount, to);
    }

    function retireCredits(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        uint256 amount = carbonCredits[tokenId];
        
        // Burn the NFT
        _burn(tokenId);
        
        // Record the retirement in registry
        ICarbonRegistry(carbonRegistry).recordRetirement(amount, msg.sender);
        
        // Award points through rewards contract
        IRewards(rewardsContract).awardPoints(msg.sender, amount);
        
        emit CarbonCreditsRetired(tokenId, amount, msg.sender);
    }

    // Admin functions
    function updateCarbonRegistry(address newRegistry) public onlyRole(DEFAULT_ADMIN_ROLE) {
        emit RegistryUpdated(carbonRegistry, newRegistry);
        carbonRegistry = newRegistry;
    }

    function updateRewardsContract(address newRewards) public onlyRole(DEFAULT_ADMIN_ROLE) {
        emit RewardsContractUpdated(rewardsContract, newRewards);
        rewardsContract = newRewards;
    }

    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage)
        returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage, AccessControl)
        returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

// Interface declarations
interface ICarbonRegistry {
    function verifyCarbonCredits(uint256 amount) external view returns (bool);
    function recordRetirement(uint256 amount, address user) external;
}

interface IRewards {
    function awardPoints(address user, uint256 amount) external;
}