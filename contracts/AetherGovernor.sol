// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AetherGovernor
 * @dev DAO Governance contract for BRIA Protocol
 */
contract AetherGovernor is 
    Governor, 
    GovernorSettings, 
    GovernorCountingSimple, 
    GovernorVotes, 
    GovernorVotesQuorumFraction,
    GovernorTimelockControl,
    Ownable
{
    
    // Proposal categories
    enum ProposalCategory {
        GENERAL,
        RWA_INVESTMENT,
        TOKENOMICS,
        TECHNICAL_UPGRADE,
        EMERGENCY
    }
    
    struct ProposalMetadata {
        ProposalCategory category;
        string title;
        string description;
        uint256 requestedFunding;
        address beneficiary;
    }
    
    mapping(uint256 => ProposalMetadata) public proposalMetadata;
    
    event ProposalCreatedWithMetadata(
        uint256 indexed proposalId,
        ProposalCategory category,
        string title,
        uint256 requestedFunding,
        address beneficiary
    );
    
    constructor(
        IVotes _token,
        TimelockController _timelock
    )
        Governor("AetherGovernor")
        GovernorSettings(
            7200, /* 1 day */
            50400, /* 1 week */
            1000e18 /* 1000 BRIA tokens required to propose */
        )
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4) /* 4% quorum */
        GovernorTimelockControl(_timelock)
    {}
    
    /**
     * @dev Create proposal with metadata
     */
    function proposeWithMetadata(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description,
        ProposalCategory category,
        string memory title,
        uint256 requestedFunding,
        address beneficiary
    ) public returns (uint256) {
        uint256 proposalId = propose(targets, values, calldatas, description);
        
        proposalMetadata[proposalId] = ProposalMetadata({
            category: category,
            title: title,
            description: description,
            requestedFunding: requestedFunding,
            beneficiary: beneficiary
        });
        
        emit ProposalCreatedWithMetadata(proposalId, category, title, requestedFunding, beneficiary);
        
        return proposalId;
    }
    
    /**
     * @dev Create RWA investment proposal
     */
    function proposeRWAInvestment(
        string memory title,
        string memory description,
        uint256 investmentAmount,
        address assetManager,
        bytes memory investmentData
    ) external returns (uint256) {
        require(investmentAmount > 0, "AetherGovernor: investment amount must be greater than 0");
        require(assetManager != address(0), "AetherGovernor: invalid asset manager");
        
        address[] memory targets = new address[](1);
        uint256[] memory values = new uint256[](1);
        bytes[] memory calldatas = new bytes[](1);
        
        targets[0] = assetManager;
        values[0] = investmentAmount;
        calldatas[0] = investmentData;
        
        return proposeWithMetadata(
            targets,
            values,
            calldatas,
            description,
            ProposalCategory.RWA_INVESTMENT,
            title,
            investmentAmount,
            assetManager
        );
    }
    
    /**
     * @dev Create emergency proposal (shorter voting period)
     */
    function proposeEmergency(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description,
        string memory title
    ) external onlyOwner returns (uint256) {
        uint256 proposalId = propose(targets, values, calldatas, description);
        
        proposalMetadata[proposalId] = ProposalMetadata({
            category: ProposalCategory.EMERGENCY,
            title: title,
            description: description,
            requestedFunding: 0,
            beneficiary: address(0)
        });
        
        emit ProposalCreatedWithMetadata(proposalId, ProposalCategory.EMERGENCY, title, 0, address(0));
        
        return proposalId;
    }
    
    /**
     * @dev Get proposal metadata
     */
    function getProposalMetadata(uint256 proposalId) external view returns (ProposalMetadata memory) {
        return proposalMetadata[proposalId];
    }
    
    /**
     * @dev Override voting delay for emergency proposals
     */
    function proposalDeadline(uint256 proposalId) public view override returns (uint256) {
        ProposalMetadata memory metadata = proposalMetadata[proposalId];
        
        if (metadata.category == ProposalCategory.EMERGENCY) {
            return proposalSnapshot(proposalId) + 17280; // 3 days for emergency
        }
        
        return super.proposalDeadline(proposalId);
    }
    
    // The following functions are overrides required by Solidity.
    
    function votingDelay() public view override(IGovernor, GovernorSettings) returns (uint256) {
        return super.votingDelay();
    }
    
    function votingPeriod() public view override(IGovernor, GovernorSettings) returns (uint256) {
        return super.votingPeriod();
    }
    
    function quorum(uint256 blockNumber) public view override(IGovernor, GovernorVotesQuorumFraction) returns (uint256) {
        return super.quorum(blockNumber);
    }
    
    function state(uint256 proposalId) public view override(Governor, GovernorTimelockControl) returns (ProposalState) {
        return super.state(proposalId);
    }
    
    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public override(Governor, IGovernor) returns (uint256) {
        return super.propose(targets, values, calldatas, description);
    }
    
    function proposalThreshold() public view override(Governor, GovernorSettings) returns (uint256) {
        return super.proposalThreshold();
    }
    
    function _execute(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }
    
    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }
    
    function _executor() internal view override(Governor, GovernorTimelockControl) returns (address) {
        return super._executor();
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(Governor, GovernorTimelockControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}