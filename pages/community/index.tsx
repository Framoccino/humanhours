import { CommunityHub } from '@/components/community/CommunityHub';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Community Hub</h1>
          <CommunityHub />
        </div>
      </main>
    </div>
  );
} 