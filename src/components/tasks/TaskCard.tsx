import { MapPin, Clock } from 'lucide-react';

interface TaskCardProps {
  id: number;
  title: string;
  location: string;
  duration: string;
  description: string;
}

export function TaskCard({ title, location, duration, description }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      
      <div className="flex items-center gap-4 mb-3 text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{duration}</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <button className="w-full px-4 py-2 bg-[#28a745] text-white rounded-lg hover:bg-[#218838] transition-colors">
        Learn More
      </button>
    </div>
  );
} 