// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./BRIAToken.sol";
import "./MachineNFT.sol";
import "./StakingPool.sol";
import "./PriceOracle.sol";
import "./AetherGovernor.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";

/**
 * @title DeploymentScript
 * @dev Deployment helper contract for BRIA Protocol
 * Deploy this contract to automatically deploy and configure all protocol contracts
 */
contract DeploymentScript {
    
    struct DeployedContracts {
        address briaToken;
        address machineNFT;
        address stakingPool;
        address priceOracle;
        address timelock;
        address governor;
        address paymentToken; // USDT/BUSD address
    }
    
    event ProtocolDeployed(DeployedContracts contracts);
    
    /**
     * @dev Deploy all protocol contracts
     * @param paymentTokenAddress Address of USDT/BUSD token for payments
     * @param initialOwner Address that will own the contracts initially
     */
    function deployProtocol(
        address paymentTokenAddress,
        address initialOwner
    ) external returns (DeployedContracts memory) {
        require(paymentTokenAddress != address(0), "DeploymentScript: invalid payment token");
        require(initialOwner != address(0), "DeploymentScript: invalid owner");
        
        // Deploy core tokens
        BRIAToken briaToken = new BRIAToken();
        MachineNFT machineNFT = new MachineNFT();
        PriceOracle priceOracle = new PriceOracle();
        
        // Deploy timelock for governance (1 day delay)
        address[] memory proposers = new address[](1);
        address[] memory executors = new address[](1);
        proposers[0] = initialOwner;
        executors[0] = initialOwner;
        
        TimelockController timelock = new TimelockController(
            86400, // 1 day delay
            proposers,
            executors,
            initialOwner
        );
        
        // Deploy governance
        AetherGovernor governor = new AetherGovernor(
            IVotes(address(briaToken)),
            timelock
        );
        
        // Deploy staking pool
        StakingPool stakingPool = new StakingPool(
            address(briaToken),
            address(machineNFT),
            paymentTokenAddress
        );
        
        // Configure permissions
        briaToken.addMinter(address(stakingPool));
        machineNFT.addMinter(address(stakingPool));
        
        // Transfer ownership to initialOwner
        briaToken.transferOwnership(initialOwner);
        machineNFT.transferOwnership(initialOwner);
        stakingPool.transferOwnership(initialOwner);
        priceOracle.transferOwnership(initialOwner);
        governor.transferOwnership(initialOwner);
        
        DeployedContracts memory deployed = DeployedContracts({
            briaToken: address(briaToken),
            machineNFT: address(machineNFT),
            stakingPool: address(stakingPool),
            priceOracle: address(priceOracle),
            timelock: address(timelock),
            governor: address(governor),
            paymentToken: paymentTokenAddress
        });
        
        emit ProtocolDeployed(deployed);
        
        return deployed;
    }
    
    /**
     * @dev Deploy with BSC testnet USDT
     */
    function deployForBSCTestnet(address initialOwner) external returns (DeployedContracts memory) {
        // BSC Testnet USDT: 0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684
        return deployProtocol(0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684, initialOwner);
    }
    
    /**
     * @dev Deploy with BSC mainnet USDT
     */
    function deployForBSCMainnet(address initialOwner) external returns (DeployedContracts memory) {
        // BSC Mainnet USDT: 0x55d398326f99059fF775485246999027B3197955
        return deployProtocol(0x55d398326f99059fF775485246999027B3197955, initialOwner);
    }
    
    /**
     * @dev Deploy with Arbitrum USDT
     */
    function deployForArbitrum(address initialOwner) external returns (DeployedContracts memory) {
        // Arbitrum USDT: 0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9
        return deployProtocol(0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9, initialOwner);
    }
}