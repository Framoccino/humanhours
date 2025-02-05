import { ethers } from 'ethers';
import { keccak256, toUtf8Bytes } from 'ethers/lib/utils';

export const daoSecurity = {
  // Timelock for proposal execution
  TIMELOCK_DELAY: 2 * 24 * 60 * 60, // 2 days

  // Minimum tokens required for proposal
  PROPOSAL_THRESHOLD: ethers.utils.parseEther('100'),

  // Quorum requirements
  QUORUM_PERCENTAGE: 4, // 4% of total supply

  // Vote validation
  validateVote: async (proposalId: string, voter: string, signature: string) => {
    const message = ethers.utils.solidityKeccak256(
      ['string', 'address', 'uint256'],
      ['VOTE', voter, proposalId]
    );
    const recoveredSigner = ethers.utils.verifyMessage(message, signature);
    return recoveredSigner.toLowerCase() === voter.toLowerCase();
  },

  // Proposal content validation
  validateProposal: (proposal: any) => {
    const errors = [];
    
    if (!proposal.title || proposal.title.length < 10) {
      errors.push('Title must be at least 10 characters');
    }
    
    if (!proposal.description || proposal.description.length < 100) {
      errors.push('Description must be at least 100 characters');
    }
    
    if (!proposal.actions || proposal.actions.length === 0) {
      errors.push('Proposal must include at least one action');
    }

    return errors;
  },

  // Anti-spam protection
  isSpam: async (proposer: string, recentProposals: any[]) => {
    const proposalCount = recentProposals.filter(
      p => p.proposer === proposer && 
      p.timestamp > Date.now() - 7 * 24 * 60 * 60 * 1000 // 1 week
    ).length;
    
    return proposalCount >= 3; // Max 3 proposals per week
  }
}; 