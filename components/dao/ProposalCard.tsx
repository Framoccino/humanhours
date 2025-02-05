import { useState } from 'react';
import { ethers } from 'ethers';
import { useDAO } from '../../hooks/useDAO';

interface ProposalCardProps {
  id: string;
  title: string;
  description: string;
  proposer: string;
  status: 'active' | 'succeeded' | 'defeated' | 'pending';
  votesFor: number;
  votesAgainst: number;
  deadline: number;
}

export default function ProposalCard({
  id,
  title,
  description,
  proposer,
  status,
  votesFor,
  votesAgainst,
  deadline
}: ProposalCardProps) {
  const { vote } = useDAO();
  const [loading, setLoading] = useState(false);

  const handleVote = async (support: boolean) => {
    try {
      setLoading(true);
      await vote(id, support);
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className={`
          px-3 py-1 rounded-full text-sm
          ${status === 'active' ? 'bg-green-100 text-green-800' : 
            status === 'succeeded' ? 'bg-blue-100 text-blue-800' :
            status === 'defeated' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'}
        `}>
          {status}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Proposer</span>
          <span className="font-mono">{proposer.slice(0, 6)}...{proposer.slice(-4)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Deadline</span>
          <span>{new Date(deadline * 1000).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span>For: {votesFor}</span>
          <span>Against: {votesAgainst}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full"
            style={{ width: `${(votesFor / (votesFor + votesAgainst)) * 100}%` }}
          />
        </div>
      </div>

      {status === 'active' && (
        <div className="flex gap-4">
          <button
            onClick={() => handleVote(true)}
            disabled={loading}
            className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                     transition-colors disabled:opacity-50"
          >
            Vote For
          </button>
          <button
            onClick={() => handleVote(false)}
            disabled={loading}
            className="flex-1 py-2 border border-red-600 text-red-600 rounded-lg 
                     hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            Vote Against
          </button>
        </div>
      )}
    </div>
  );
} 