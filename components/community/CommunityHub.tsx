import { useState } from 'react';
import { MessageSquare, Users, Award, Bookmark } from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'feed'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Community Feed
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'groups'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Groups
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'achievements'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Achievements
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <textarea
              placeholder="Share something with the community..."
              className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-green-500"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Post
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{post.author.name}</div>
                    <div className="text-sm text-gray-500">{post.timestamp}</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <MessageSquare className="w-4 h-4" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Award className="w-4 h-4" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Bookmark className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 