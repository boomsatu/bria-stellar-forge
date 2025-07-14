// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title MachineNFT
 * @dev NFT representing staking machines in BRIA Protocol
 */
contract MachineNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Machine types enum
    enum MachineType { BRONZE, SILVER, GOLD, TITANIUM }
    
    // Machine metadata structure
    struct MachineData {
        MachineType machineType;
        uint256 capacity;         // Maximum BRIA tokens that can be staked
        uint256 profitRate;       // Profit rate in basis points (100 = 1%)
        uint256 expiryTimestamp;  // When the machine expires
        uint256 purchasePrice;    // Original purchase price in USDT
        bool isActive;            // Whether machine is active
    }
    
    mapping(uint256 => MachineData) public machineData;
    mapping(address => bool) public authorizedMinters;
    
    // Machine type configurations
    mapping(MachineType => uint256) public machineCapacities;
    mapping(MachineType => uint256) public machineProfitRates;
    mapping(MachineType => uint256) public machineLifetimes;
    mapping(MachineType => uint256) public machinePrices;
    
    event MachineActivated(uint256 indexed tokenId, address indexed owner, MachineType machineType);
    event MachineBurned(uint256 indexed tokenId);
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);
    
    modifier onlyMinter() {
        require(authorizedMinters[msg.sender], "MachineNFT: caller is not an authorized minter");
        _;
    }
    
    constructor() ERC721("BRIA Staking Machine", "BRIAMACHINE") {
        // Initialize machine configurations
        _initializeMachineTypes();
    }
    
    function _initializeMachineTypes() private {
        // Bronze Machine
        machineCapacities[MachineType.BRONZE] = 1000 * 10**18;    // 1,000 BRIA
        machineProfitRates[MachineType.BRONZE] = 50;              // 0.5%
        machineLifetimes[MachineType.BRONZE] = 90 days;
        machinePrices[MachineType.BRONZE] = 100 * 10**18;         // $100 USDT
        
        // Silver Machine
        machineCapacities[MachineType.SILVER] = 5000 * 10**18;    // 5,000 BRIA
        machineProfitRates[MachineType.SILVER] = 80;              // 0.8%
        machineLifetimes[MachineType.SILVER] = 120 days;
        machinePrices[MachineType.SILVER] = 500 * 10**18;         // $500 USDT
        
        // Gold Machine
        machineCapacities[MachineType.GOLD] = 20000 * 10**18;     // 20,000 BRIA
        machineProfitRates[MachineType.GOLD] = 120;               // 1.2%
        machineLifetimes[MachineType.GOLD] = 180 days;
        machinePrices[MachineType.GOLD] = 2000 * 10**18;          // $2,000 USDT
        
        // Titanium Machine
        machineCapacities[MachineType.TITANIUM] = 100000 * 10**18; // 100,000 BRIA
        machineProfitRates[MachineType.TITANIUM] = 200;            // 2.0%
        machineLifetimes[MachineType.TITANIUM] = 365 days;
        machinePrices[MachineType.TITANIUM] = 10000 * 10**18;      // $10,000 USDT
    }
    
    /**
     * @dev Add authorized minter (StakingPool contract)
     */
    function addMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = true;
        emit MinterAdded(minter);
    }
    
    /**
     * @dev Remove authorized minter
     */
    function removeMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = false;
        emit MinterRemoved(minter);
    }
    
    /**
     * @dev Mint new machine NFT
     */
    function mintMachine(
        address to,
        MachineType machineType,
        uint256 purchasePrice
    ) external onlyMinter returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        machineData[tokenId] = MachineData({
            machineType: machineType,
            capacity: machineCapacities[machineType],
            profitRate: machineProfitRates[machineType],
            expiryTimestamp: block.timestamp + machineLifetimes[machineType],
            purchasePrice: purchasePrice,
            isActive: true
        });
        
        _safeMint(to, tokenId);
        
        emit MachineActivated(tokenId, to, machineType);
        return tokenId;
    }
    
    /**
     * @dev Burn machine NFT (when unstaked early)
     */
    function burnMachine(uint256 tokenId) external onlyMinter {
        require(_exists(tokenId), "MachineNFT: token does not exist");
        machineData[tokenId].isActive = false;
        _burn(tokenId);
        emit MachineBurned(tokenId);
    }
    
    /**
     * @dev Get machine information
     */
    function getMachineInfo(uint256 tokenId) external view returns (MachineData memory) {
        require(_exists(tokenId), "MachineNFT: token does not exist");
        return machineData[tokenId];
    }
    
    /**
     * @dev Check if machine is expired
     */
    function isMachineExpired(uint256 tokenId) external view returns (bool) {
        require(_exists(tokenId), "MachineNFT: token does not exist");
        return block.timestamp >= machineData[tokenId].expiryTimestamp;
    }
    
    /**
     * @dev Get machine type configuration
     */
    function getMachineTypeConfig(MachineType machineType) external view returns (
        uint256 capacity,
        uint256 profitRate,
        uint256 lifetime,
        uint256 price
    ) {
        return (
            machineCapacities[machineType],
            machineProfitRates[machineType],
            machineLifetimes[machineType],
            machinePrices[machineType]
        );
    }
    
    /**
     * @dev Update machine type configuration (owner only)
     */
    function updateMachineTypeConfig(
        MachineType machineType,
        uint256 capacity,
        uint256 profitRate,
        uint256 lifetime,
        uint256 price
    ) external onlyOwner {
        machineCapacities[machineType] = capacity;
        machineProfitRates[machineType] = profitRate;
        machineLifetimes[machineType] = lifetime;
        machinePrices[machineType] = price;
    }
    
    // Override functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}