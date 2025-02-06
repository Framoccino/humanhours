import { MapPin, Clock } from 'lucide-react';

interface TaskCardProps {
  title: string;
  location: string;
  duration: string;
  description: string;
}

export function TaskCard({ title, location, duration, description }: TaskCardProps) {
  return (
    <div className="card p-6 hover:scale-[1.02] transition-transform duration-200">
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      
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
      
      <button className="button-primary w-full">Learn More</button>
    </div>
  );
} 