import { useWeb3 } from '@/context/Web3Context';
import { TaskList } from '@/components/tasks/TaskList';

export default function TasksPage() {
  const { account } = useWeb3();

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Available Tasks</h1>
          <TaskList />
        </div>
      </main>
    </div>
  );
} 