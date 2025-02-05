import { Task } from '../types';

interface TaskCardProps {
    task: Task;
    onLearnMore: (taskId: number) => void;
}

export default function TaskCard({ task, onLearnMore }: TaskCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4">{task.title}</h3>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
                <span>📍</span>
                <span>{task.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
                <span>⏱️</span>
                <span>{task.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
                <span>⭐</span>
                <span>{task.reputation}</span>
            </div>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <button 
                onClick={() => onLearnMore(task.id)}
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
                Learn More
            </button>
        </div>
    );
} 