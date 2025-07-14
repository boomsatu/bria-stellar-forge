// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PriceOracle
 * @dev Price oracle contract for BRIA Protocol
 * Note: This is a simplified oracle. In production, integrate with Chainlink Price Feeds
 */
contract PriceOracle is Ownable {
    
    struct PriceData {
        uint256 price;
        uint256 timestamp;
        bool isValid;
    }
    
    mapping(string => PriceData) public prices;
    mapping(address => bool) public authorizedUpdaters;
    
    uint256 public constant PRICE_VALIDITY_PERIOD = 1 hours;
    
    event PriceUpdated(string indexed symbol, uint256 price, uint256 timestamp);
    event UpdaterAdded(address indexed updater);
    event UpdaterRemoved(address indexed updater);
    
    modifier onlyUpdater() {
        require(authorizedUpdaters[msg.sender] || msg.sender == owner(), "PriceOracle: unauthorized updater");
        _;
    }
    
    constructor() {
        // Initialize with some default prices (in USD with 8 decimals)
        prices["BNB"] = PriceData(30000000000, block.timestamp, true);  // $300.00
        prices["ETH"] = PriceData(200000000000, block.timestamp, true); // $2000.00
        prices["USDT"] = PriceData(100000000, block.timestamp, true);   // $1.00
        prices["BUSD"] = PriceData(100000000, block.timestamp, true);   // $1.00
        prices["BRIA"] = PriceData(4500000, block.timestamp, true);     // $0.045
    }
    
    /**
     * @dev Add authorized price updater
     */
    function addUpdater(address updater) external onlyOwner {
        authorizedUpdaters[updater] = true;
        emit UpdaterAdded(updater);
    }
    
    /**
     * @dev Remove authorized price updater
     */
    function removeUpdater(address updater) external onlyOwner {
        authorizedUpdaters[updater] = false;
        emit UpdaterRemoved(updater);
    }
    
    /**
     * @dev Update price for a symbol
     */
    function updatePrice(string memory symbol, uint256 price) external onlyUpdater {
        require(price > 0, "PriceOracle: price must be greater than 0");
        
        prices[symbol] = PriceData(price, block.timestamp, true);
        emit PriceUpdated(symbol, price, block.timestamp);
    }
    
    /**
     * @dev Update multiple prices at once
     */
    function updatePrices(
        string[] memory symbols, 
        uint256[] memory priceValues
    ) external onlyUpdater {
        require(symbols.length == priceValues.length, "PriceOracle: arrays length mismatch");
        
        for (uint256 i = 0; i < symbols.length; i++) {
            require(priceValues[i] > 0, "PriceOracle: price must be greater than 0");
            prices[symbols[i]] = PriceData(priceValues[i], block.timestamp, true);
            emit PriceUpdated(symbols[i], priceValues[i], block.timestamp);
        }
    }
    
    /**
     * @dev Get latest price for a symbol
     */
    function getPrice(string memory symbol) external view returns (uint256 price, uint256 timestamp) {
        PriceData memory priceData = prices[symbol];
        require(priceData.isValid, "PriceOracle: price not available");
        require(
            block.timestamp <= priceData.timestamp + PRICE_VALIDITY_PERIOD,
            "PriceOracle: price data too old"
        );
        
        return (priceData.price, priceData.timestamp);
    }
    
    /**
     * @dev Get price without validity check (for emergency cases)
     */
    function getPriceUnsafe(string memory symbol) external view returns (uint256 price, uint256 timestamp) {
        PriceData memory priceData = prices[symbol];
        return (priceData.price, priceData.timestamp);
    }
    
    /**
     * @dev Check if price is valid and not expired
     */
    function isPriceValid(string memory symbol) external view returns (bool) {
        PriceData memory priceData = prices[symbol];
        return priceData.isValid && (block.timestamp <= priceData.timestamp + PRICE_VALIDITY_PERIOD);
    }
    
    /**
     * @dev Convert amount from one currency to another
     */
    function convertPrice(
        string memory fromSymbol,
        string memory toSymbol,
        uint256 amount
    ) external view returns (uint256) {
        (uint256 fromPrice, ) = this.getPrice(fromSymbol);
        (uint256 toPrice, ) = this.getPrice(toSymbol);
        
        return (amount * fromPrice) / toPrice;
    }
    
    /**
     * @dev Get multiple prices at once
     */
    function getPrices(string[] memory symbols) external view returns (
        uint256[] memory priceValues,
        uint256[] memory timestamps,
        bool[] memory validities
    ) {
        priceValues = new uint256[](symbols.length);
        timestamps = new uint256[](symbols.length);
        validities = new bool[](symbols.length);
        
        for (uint256 i = 0; i < symbols.length; i++) {
            PriceData memory priceData = prices[symbols[i]];
            priceValues[i] = priceData.price;
            timestamps[i] = priceData.timestamp;
            validities[i] = priceData.isValid && (block.timestamp <= priceData.timestamp + PRICE_VALIDITY_PERIOD);
        }
    }
}