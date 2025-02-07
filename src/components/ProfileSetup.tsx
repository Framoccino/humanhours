import { useState } from 'react';
import { useWeb3 } from '@/context/Web3Context';

export function ProfileSetup() {
  const { account } = useWeb3();
  const [profile, setProfile] = useState({
    fullName: '',
    skills: [] as string[],
    bio: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add profile to database logic here
    console.log('Profile submitted:', profile);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills (comma separated)
            </label>
            <input
              type="text"
              onChange={(e) => setProfile({ 
                ...profile, 
                skills: e.target.value.split(',').map(s => s.trim()) 
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="e.g. Gardening, Photography, Cooking"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#28a745] text-white rounded-lg px-4 py-2 hover:bg-[#218838] transition-colors"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
} 