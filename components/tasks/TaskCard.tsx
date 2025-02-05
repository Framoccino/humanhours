import { Clock, MapPin } from 'lucide-react';

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
    <div className="bg-[#112240] rounded-lg shadow-lg p-6 border border-[#1E2D4D] hover:border-[#64FFDA] transition-colors">
      <h3 className="text-lg font-semibold mb-2 text-[#E6F1FF]">{title}</h3>
      
      <div className="flex items-center gap-2 text-sm text-[#8892B0] mb-2">
        <MapPin className="w-4 h-4" />
        <span>{location}</span>
        <Clock className="w-4 h-4 ml-2" />
        <span>{duration}</span>
      </div>
      
      <p className="text-[#8892B0] mb-4">{description}</p>
      
      <button
        onClick={onLearnMore}
        className="w-full px-4 py-2 border border-[#64FFDA] text-[#64FFDA] rounded-lg 
                 hover:bg-[#64FFDA]/10 transition-colors"
      >
        Learn More
      </button>
    </div>
  );
} 