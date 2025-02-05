import { useState } from 'react';
import { Task } from '../types';

interface TaskCardProps {
    task: Task;
    onLearnMore: (taskId: number) => void;
}

export default function TaskCard({ task, onLearnMore }: TaskCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`
                bg-white p-6 rounded-lg transition-all duration-300
                ${isHovered ? 'shadow-lg transform -translate-y-1' : 'shadow'}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    {task.hourlyRate} HH/hr
                </span>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                    <span className="w-5">📍</span>
                    <span>{task.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <span className="w-5">⏱️</span>
                    <span>{task.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <span className="w-5">⭐</span>
                    <span>{task.reputation.toFixed(1)}</span>
                </div>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-3">{task.description}</p>

            <button 
                onClick={() => onLearnMore(task.id)}
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                           transition-colors duration-200 flex items-center justify-center gap-2"
            >
                Learn More
                <span className="text-xl">→</span>
            </button>
        </div>
    );
} 