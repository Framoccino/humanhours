import { Header } from '@/components/Header';
import { MessageList } from '@/components/messages/MessageList';

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 mt-[76px]">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        <MessageList />
      </main>
    </div>
  );
} 