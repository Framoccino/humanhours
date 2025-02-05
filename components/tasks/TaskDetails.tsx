import { useState } from 'react';
import { MapPin, Clock, Star, User, Calendar } from 'lucide-react';

interface TaskDetailsProps {
  task: {
    id: string;
    title: string;
    description: string;
    location: string;
    duration: string;
    hourlyRate: number;
    provider: {
      name: string;
      rating: number;
      completedTasks: number;
    };
    startDate: string;
    skills: string[];
  };
  onAccept: () => void;
}

export default function TaskDetails({ task, onAccept }: TaskDetailsProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold">{task.title}</h2>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
          {task.hourlyRate} HH/hr
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span>{task.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <span>{task.duration}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span>{task.startDate}</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <User className="w-5 h-5 text-gray-400" />
            <span className="font-medium">{task.provider.name}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>{task.provider.rating.toFixed(1)}</span>
          </div>
          <div className="text-sm text-gray-600">
            {task.provider.completedTasks} tasks completed
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Description</h3>
        <p className="text-gray-600 whitespace-pre-wrap">{task.description}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
        <div className="flex flex-wrap gap-2">
          {task.skills.map((skill) => (
            <span 
              key={skill}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={onAccept}
        disabled={loading}
        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 
                 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? 'Processing...' : 'Accept Task'}
      </button>
    </div>
  );
} 