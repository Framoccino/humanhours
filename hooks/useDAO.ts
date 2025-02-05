import { createContext, useContext, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { HumanHoursDAO__factory } from '../typechain';

interface DAOContextType {
  createProposal: (title: string, description: string, actions: any[]) => Promise<void>;
  vote: (proposalId: string, support: boolean) => Promise<void>;
  getProposal: (proposalId: string) => Promise<any>;
  listProposals: () => Promise<any[]>;
}

const DAOContext = createContext<DAOContextType | null>(null);

export function DAOProvider({ children }: { children: React.ReactNode }) {
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const createProposal = useCallback(async (title: string, description: string, actions: any[]) => {
    if (!contract) throw new Error('DAO contract not initialized');
    
    try {
      const tx = await contract.propose(
        actions.map(a => a.target),
        actions.map(a => a.value),
        actions.map(a => a.data),
        description
      );
      await tx.wait();
    } catch (error) {
      console.error('Error creating proposal:', error);
      throw error;
    }
  }, [contract]);

  const vote = useCallback(async (proposalId: string, support: boolean) => {
    if (!contract) throw new Error('DAO contract not initialized');
    
    try {
      const tx = await contract.castVote(proposalId, support);
      await tx.wait();
    } catch (error) {
      console.error('Error voting:', error);
      throw error;
    }
  }, [contract]);

  // ... other DAO functions

  return (
    <DAOContext.Provider value={{
      createProposal,
      vote,
      getProposal: async () => {},
      listProposals: async () => []
    }}>
      {children}
    </DAOContext.Provider>
  );
}

export function useDAO() {
  const context = useContext(DAOContext);
  if (!context) throw new Error('useDAO must be used within a DAOProvider');
  return context;
} 