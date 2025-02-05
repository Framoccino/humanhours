import MainLayout from '../../components/layout/MainLayout';
import { Users, Vote } from 'lucide-react';

export default function DAO() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">DAO Governance</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Active Proposals</h2>
            {/* Proposals will go here */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 