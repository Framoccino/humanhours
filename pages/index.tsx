import { useWeb3 } from '@/context/Web3Context';
import { SearchAndSkills } from '@/components/SearchAndSkills';
import { TaskSection } from '@/components/TaskSection';

export default function Home() {
  const { account, profile, showProfileSetup } = useWeb3();

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16">
        {!account ? (
          <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to Human Hours</h1>
            <p className="text-gray-600 mb-8">Connect your wallet to get started</p>
          </div>
        ) : !profile && showProfileSetup ? (
          // Profile setup will be shown via the Web3Context
          <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <h2 className="text-xl text-gray-600">Setting up your profile...</h2>
          </div>
        ) : (
          <>
            <div className="max-w-7xl mx-auto px-4">
              <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
              <SearchAndSkills />
            </div>
            <TaskSection />
          </>
        )}
      </main>
    </div>
  );
} 