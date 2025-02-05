import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react';
import { CommunityHub } from '../components/community/CommunityHub';

export default function CommunityPage() {
  const [posts] = useState([
    {
      id: '1',
      author: {
        name: 'John Doe',
        avatar: 'https://avatars.dicebear.com/api/avataaars/john.svg'
      },
      content: 'Just completed my first task on Human Hours! Great experience helping someone with their garden.',
      likes: 24,
      comments: 5,
      timestamp: '2024-02-20T10:00:00Z'
    },
    // More posts...
  ]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Community</h1>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Create Post
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Feed */}
          <div className="col-span-8">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <textarea
                placeholder="Share your thoughts with the community..."
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
                <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{post.author.name}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(post.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{post.content}</p>
                  <div className="flex gap-6 text-gray-500">
                    <button className="flex items-center gap-2 hover:text-gray-700">
                      <ThumbsUp className="w-4 h-4" />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-2 hover:text-gray-700">
                      <MessageSquare className="w-4 h-4" />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-2 hover:text-gray-700">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Your Community</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Reputation Score</span>
                  <span className="font-medium">4.8/5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Network Size</span>
                  <span className="font-medium">156</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Trending Topics</h2>
              <div className="space-y-2">
                {['Gardening Tips', 'Web Development', 'Language Exchange'].map((topic) => (
                  <div
                    key={topic}
                    className="px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    #{topic}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 