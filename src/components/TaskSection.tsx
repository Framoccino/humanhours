import { TaskList } from './tasks/TaskList';

export function TaskSection() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Available Tasks</h2>
          <button className="px-4 py-2 bg-[#28a745] text-white rounded-lg hover:bg-[#218838] transition-colors">
            Post a Task
          </button>
        </div>
        <TaskList />
      </div>
    </div>
  );
} 