import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { MessageSquare, Send } from 'lucide-react';

const mockMessages = [
  {
    id: 1,
    sender: 'Sarah M.',
    message: 'Hi! I saw your gardening task. Is it still available?',
    timestamp: '2024-03-15T10:30:00Z'
  },
  // Add more mock messages...
];

export default function Messages() {
  const [messages, setMessages] = useState(mockMessages);
  
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-[#E6F1FF]">Messages</h1>
        
        <div className="bg-[#112240] rounded-lg shadow-lg border border-[#1E2D4D]">
          <div className="p-4 border-b border-[#1E2D4D]">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-[#64FFDA]" />
              <span className="text-[#E6F1FF]">Recent Conversations</span>
            </div>
          </div>
          
          <div className="divide-y divide-[#1E2D4D]">
            {messages.map((msg) => (
              <div key={msg.id} className="p-4 hover:bg-[#1E2D4D] cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-[#E6F1FF]">{msg.sender}</span>
                  <span className="text-sm text-[#8892B0]">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-[#8892B0] line-clamp-1">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 