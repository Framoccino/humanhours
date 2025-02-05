import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import TaskCard from '../../components/tasks/TaskCard';
import { Search, Filter } from 'lucide-react';

const mockTasks = [
  {
    id: 1,
    title: 'Help with Garden Maintenance',
    location: 'Brooklyn, NY',
    duration: '3 hours',
    description: 'Need help with pruning trees and planting new flowers in my backyard garden.',
    hourlyRate: 2,
    provider: {
      name: 'Sarah M.',
      rating: 4.8,
      completedTasks: 23
    }
  },
  // Add more mock tasks...
];

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState(mockTasks);
  
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Available Tasks</h1>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
            Post New Task
          </button>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 