import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { ChevronRight, Users, BarChart2 } from 'lucide-react';

export default function DAOPage() {
  const [activeProposals] = useState([
    {
      id: '1',
      title: 'Increase Task Validation Threshold',
      description: 'Proposal to increase the minimum number of validators required for task completion.',
      votes: { for: 1500, against: 500 },
      endDate: '2024-03-01T00:00:00Z'
    },
    // More proposals...
  ]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">DAO Governance</h1>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Create Proposal
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Active Proposals</h2>
              <div className="space-y-4">
                {activeProposals.map((proposal) => (
                  <div key={proposal.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{proposal.title}</h3>
                      <span className="text-sm text-gray-500">
                        Ends {new Date(proposal.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{proposal.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <span className="text-green-600">
                          For: {proposal.votes.for}
                        </span>
                        <span className="text-red-600">
                          Against: {proposal.votes.against}
                        </span>
                      </div>
                      <button className="text-green-600 hover:text-green-700">
                        Vote Now →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Your Voting Power</h2>
              <div className="text-3xl font-bold mb-2">1,500 HH</div>
              <p className="text-sm text-gray-500">
                Based on your HH token balance and delegation
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Proposals</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Your Participation</span>
                  <span className="font-medium">89%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Community Size</span>
                  <span className="font-medium">12.5k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 