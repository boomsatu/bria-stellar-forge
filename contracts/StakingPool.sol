// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./BRIAToken.sol";
import "./MachineNFT.sol";

/**
 * @title StakingPool
 * @dev Core staking contract for BRIA Protocol
 */
contract StakingPool is ReentrancyGuard, Ownable, Pausable {
    using SafeERC20 for IERC20;
    
    BRIAToken public briaToken;
    MachineNFT public machineNFT;
    IERC20 public paymentToken; // USDT/BUSD for machine purchases
    
    // Staking information for each machine NFT
    struct StakedInfo {
        uint256 stakedAmount;
        uint256 lastClaimTime;
        uint256 totalClaimed;
        bool isStaking;
    }
    
    // User statistics for omset tracking
    struct UserStats {
        uint256 machineTurnover;  // Omset from machine purchases (in USDT/BUSD)
        uint256 stakingTurnover;  // Omset from total tokens staked
    }
    
    // User bonus balances
    struct Balances {
        uint256 referralBonus;
        uint256 machineBonus;
        uint256 stakingRewards;
    }
    
    mapping(uint256 => StakedInfo) public stakedInfo;
    mapping(address => address) public uplines;
    mapping(address => Balances) public userBalances;
    mapping(address => UserStats) public userNetworkStats;
    mapping(address => address[]) public downlines;
    
    // Constants
    uint256 public constant CLAIM_INTERVAL = 12 hours;
    uint256 public constant BASIS_POINTS = 10000;
    uint256 public constant MAX_REFERRAL_LEVELS = 10;
    
    // Referral bonus percentages for machine sales (in basis points)
    uint256[10] public machineReferralBonuses = [500, 200, 100, 50, 25, 25, 25, 25, 25, 25]; // 5%, 2%, 1%, 0.5%, 0.25%...
    
    // Staking referral bonus percentages (in basis points)
    uint256[10] public stakingReferralBonuses = [300, 150, 100, 75, 50, 50, 50, 25, 25, 25]; // 3%, 1.5%, 1%, 0.75%...
    
    event MachineActivated(address indexed user, uint256 indexed tokenId, MachineNFT.MachineType machineType, uint256 price);
    event Staked(address indexed user, uint256 indexed tokenId, uint256 amount);
    event Unstaked(address indexed user, uint256 indexed tokenId, uint256 amount);
    event ProfitClaimed(address indexed user, uint256 indexed tokenId, uint256 amount);
    event BonusesClaimed(address indexed user, uint256 referralBonus, uint256 machineBonus, uint256 stakingRewards);
    event ReferralRegistered(address indexed user, address indexed upline);
    event ReferralBonusPaid(address indexed from, address indexed to, uint256 amount, uint8 level, string bonusType);
    
    constructor(
        address _briaToken,
        address _machineNFT,
        address _paymentToken
    ) {
        briaToken = BRIAToken(_briaToken);
        machineNFT = MachineNFT(_machineNFT);
        paymentToken = IERC20(_paymentToken);
    }
    
    /**
     * @dev Buy staking machine with referral system
     */
    function buyMachine(
        MachineNFT.MachineType machineType,
        address referral
    ) external nonReentrant whenNotPaused {
        (, , , uint256 price) = machineNFT.getMachineTypeConfig(machineType);
        
        require(price > 0, "StakingPool: invalid machine type");
        require(referral != msg.sender, "StakingPool: cannot refer yourself");
        
        // Register referral relationship if not exists and referral is valid
        if (uplines[msg.sender] == address(0) && referral != address(0)) {
            uplines[msg.sender] = referral;
            downlines[referral].push(msg.sender);
            emit ReferralRegistered(msg.sender, referral);
        }
        
        // Transfer payment from user
        paymentToken.safeTransferFrom(msg.sender, address(this), price);
        
        // Mint machine NFT
        uint256 tokenId = machineNFT.mintMachine(msg.sender, machineType, price);
        
        // Initialize staking info
        stakedInfo[tokenId] = StakedInfo({
            stakedAmount: 0,
            lastClaimTime: block.timestamp,
            totalClaimed: 0,
            isStaking: false
        });
        
        // Update machine turnover statistics up to 10 levels
        _updateMachineTurnover(msg.sender, price);
        
        // Pay machine sale bonus to direct upline (Level 1 only)
        if (uplines[msg.sender] != address(0)) {
            uint256 bonus = (price * machineReferralBonuses[0]) / BASIS_POINTS;
            userBalances[uplines[msg.sender]].machineBonus += bonus;
            
            // Mint BRIA tokens for the bonus
            briaToken.mint(address(this), bonus);
            
            emit ReferralBonusPaid(msg.sender, uplines[msg.sender], bonus, 1, "machine_sale");
        }
        
        emit MachineActivated(msg.sender, tokenId, machineType, price);
    }
    
    /**
     * @dev Stake BRIA tokens in a machine
     */
    function stake(uint256 nftId, uint256 amount) external nonReentrant whenNotPaused {
        require(machineNFT.ownerOf(nftId) == msg.sender, "StakingPool: not machine owner");
        require(amount > 0, "StakingPool: amount must be greater than 0");
        require(!machineNFT.isMachineExpired(nftId), "StakingPool: machine expired");
        
        MachineNFT.MachineData memory machine = machineNFT.getMachineInfo(nftId);
        require(machine.isActive, "StakingPool: machine not active");
        
        StakedInfo storage stakeInfo = stakedInfo[nftId];
        require(stakeInfo.stakedAmount + amount <= machine.capacity, "StakingPool: exceeds machine capacity");
        
        // Transfer BRIA tokens from user
        briaToken.safeTransferFrom(msg.sender, address(this), amount);
        
        // Update staking info
        stakeInfo.stakedAmount += amount;
        stakeInfo.isStaking = true;
        if (stakeInfo.lastClaimTime == 0) {
            stakeInfo.lastClaimTime = block.timestamp;
        }
        
        // Update staking turnover statistics up to 10 levels
        _updateStakingTurnover(msg.sender, amount, true);
        
        emit Staked(msg.sender, nftId, amount);
    }
    
    /**
     * @dev Unstake BRIA tokens from a machine
     */
    function unstake(uint256 nftId) external nonReentrant {
        require(machineNFT.ownerOf(nftId) == msg.sender, "StakingPool: not machine owner");
        
        StakedInfo storage stakeInfo = stakedInfo[nftId];
        require(stakeInfo.isStaking, "StakingPool: no tokens staked");
        
        uint256 stakedAmount = stakeInfo.stakedAmount;
        
        // Check if machine is expired
        bool isExpired = machineNFT.isMachineExpired(nftId);
        
        if (!isExpired) {
            // Early unstake - burn the machine NFT
            machineNFT.burnMachine(nftId);
        }
        
        // Return staked tokens
        briaToken.safeTransfer(msg.sender, stakedAmount);
        
        // Update staking turnover statistics (subtract)
        _updateStakingTurnover(msg.sender, stakedAmount, false);
        
        // Reset staking info
        stakeInfo.stakedAmount = 0;
        stakeInfo.isStaking = false;
        
        emit Unstaked(msg.sender, nftId, stakedAmount);
    }
    
    /**
     * @dev Claim profit from a machine
     */
    function claimProfit(uint256 nftId) external nonReentrant {
        require(machineNFT.ownerOf(nftId) == msg.sender, "StakingPool: not machine owner");
        require(!machineNFT.isMachineExpired(nftId), "StakingPool: machine expired");
        
        StakedInfo storage stakeInfo = stakedInfo[nftId];
        require(stakeInfo.isStaking, "StakingPool: no tokens staked");
        require(block.timestamp >= stakeInfo.lastClaimTime + CLAIM_INTERVAL, "StakingPool: claim interval not reached");
        
        MachineNFT.MachineData memory machine = machineNFT.getMachineInfo(nftId);
        
        // Calculate profit
        uint256 profit = (stakeInfo.stakedAmount * machine.profitRate) / BASIS_POINTS;
        
        // Update last claim time
        stakeInfo.lastClaimTime = block.timestamp;
        stakeInfo.totalClaimed += profit;
        
        // Add to user's staking rewards balance
        userBalances[msg.sender].stakingRewards += profit;
        
        // Mint tokens for the profit
        briaToken.mint(address(this), profit);
        
        // Distribute staking referral bonuses
        _distributeStakingBonuses(msg.sender, profit);
        
        emit ProfitClaimed(msg.sender, nftId, profit);
    }
    
    /**
     * @dev Claim all accumulated bonuses
     */
    function claimAllBonuses() external nonReentrant {
        Balances storage balance = userBalances[msg.sender];
        
        uint256 totalAmount = balance.referralBonus + balance.machineBonus + balance.stakingRewards;
        require(totalAmount > 0, "StakingPool: no bonuses to claim");
        
        uint256 referralBonus = balance.referralBonus;
        uint256 machineBonus = balance.machineBonus;
        uint256 stakingRewards = balance.stakingRewards;
        
        // Reset balances
        balance.referralBonus = 0;
        balance.machineBonus = 0;
        balance.stakingRewards = 0;
        
        // Transfer tokens
        briaToken.safeTransfer(msg.sender, totalAmount);
        
        emit BonusesClaimed(msg.sender, referralBonus, machineBonus, stakingRewards);
    }
    
    /**
     * @dev Update machine turnover statistics up to 10 levels
     */
    function _updateMachineTurnover(address user, uint256 amount) private {
        address currentUpline = uplines[user];
        
        for (uint8 level = 0; level < MAX_REFERRAL_LEVELS && currentUpline != address(0); level++) {
            userNetworkStats[currentUpline].machineTurnover += amount;
            currentUpline = uplines[currentUpline];
        }
    }
    
    /**
     * @dev Update staking turnover statistics up to 10 levels
     */
    function _updateStakingTurnover(address user, uint256 amount, bool isAdd) private {
        address currentUpline = uplines[user];
        
        for (uint8 level = 0; level < MAX_REFERRAL_LEVELS && currentUpline != address(0); level++) {
            if (isAdd) {
                userNetworkStats[currentUpline].stakingTurnover += amount;
            } else {
                if (userNetworkStats[currentUpline].stakingTurnover >= amount) {
                    userNetworkStats[currentUpline].stakingTurnover -= amount;
                }
            }
            currentUpline = uplines[currentUpline];
        }
    }
    
    /**
     * @dev Distribute staking referral bonuses
     */
    function _distributeStakingBonuses(address user, uint256 profit) private {
        address currentUpline = uplines[user];
        
        for (uint8 level = 0; level < MAX_REFERRAL_LEVELS && currentUpline != address(0); level++) {
            uint256 bonus = (profit * stakingReferralBonuses[level]) / BASIS_POINTS;
            
            if (bonus > 0) {
                userBalances[currentUpline].referralBonus += bonus;
                briaToken.mint(address(this), bonus);
                emit ReferralBonusPaid(user, currentUpline, bonus, level + 1, "staking");
            }
            
            currentUpline = uplines[currentUpline];
        }
    }
    
    /**
     * @dev Get user's downlines count by level
     */
    function getDownlinesCount(address user) external view returns (uint256[] memory) {
        uint256[] memory counts = new uint256[](MAX_REFERRAL_LEVELS);
        
        // Level 1 (direct downlines)
        counts[0] = downlines[user].length;
        
        // Levels 2-10 (indirect downlines)
        for (uint8 level = 1; level < MAX_REFERRAL_LEVELS; level++) {
            uint256 count = 0;
            _countDownlinesAtLevel(user, level, count);
            counts[level] = count;
        }
        
        return counts;
    }
    
    /**
     * @dev Recursively count downlines at specific level
     */
    function _countDownlinesAtLevel(address user, uint8 targetLevel, uint256 count) private view {
        if (targetLevel == 1) {
            count += downlines[user].length;
            return;
        }
        
        for (uint256 i = 0; i < downlines[user].length; i++) {
            _countDownlinesAtLevel(downlines[user][i], targetLevel - 1, count);
        }
    }
    
    /**
     * @dev Get machine info for user
     */
    function getMachineStakingInfo(uint256 nftId) external view returns (
        uint256 stakedAmount,
        uint256 lastClaimTime,
        uint256 totalClaimed,
        bool isStaking,
        uint256 nextClaimTime,
        uint256 availableProfit
    ) {
        StakedInfo memory stakeInfo = stakedInfo[nftId];
        MachineNFT.MachineData memory machine = machineNFT.getMachineInfo(nftId);
        
        nextClaimTime = stakeInfo.lastClaimTime + CLAIM_INTERVAL;
        
        if (block.timestamp >= nextClaimTime && stakeInfo.isStaking) {
            availableProfit = (stakeInfo.stakedAmount * machine.profitRate) / BASIS_POINTS;
        }
        
        return (
            stakeInfo.stakedAmount,
            stakeInfo.lastClaimTime,
            stakeInfo.totalClaimed,
            stakeInfo.isStaking,
            nextClaimTime,
            availableProfit
        );
    }
    
    /**
     * @dev Emergency functions
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Withdraw payment tokens (emergency)
     */
    function withdrawPaymentTokens(uint256 amount) external onlyOwner {
        paymentToken.safeTransfer(owner(), amount);
    }
    
    /**
     * @dev Update referral bonus percentages
     */
    function updateMachineReferralBonuses(uint256[10] memory newBonuses) external onlyOwner {
        machineReferralBonuses = newBonuses;
    }
    
    function updateStakingReferralBonuses(uint256[10] memory newBonuses) external onlyOwner {
        stakingReferralBonuses = newBonuses;
    }
}