import { MapPin, Clock } from 'lucide-react';

interface TaskCardProps {
  title: string;
  location: string;
  duration: string;
  description: string;
  onLearnMore: () => void;
}

export default function TaskCard({
  title,
  location,
  duration,
  description,
  onLearnMore
}: TaskCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow transition-shadow">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{duration}</span>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

      <button
        onClick={onLearnMore}
        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 
                 transition-colors"
      >
        Learn More
      </button>
    </div>
  );
} 