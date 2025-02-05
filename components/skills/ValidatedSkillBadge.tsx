import { Check } from 'lucide-react';

interface ValidatedSkillBadgeProps {
  name: string;
  count: number;
  isActive?: boolean;
}

export default function ValidatedSkillBadge({ name, count, isActive = false }: ValidatedSkillBadgeProps) {
  return (
    <div 
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full border transition-colors
        ${isActive ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-gray-50'}
      `}
    >
      <Check className={`w-4 h-4 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
      <span className="font-medium">{name}</span>
      <span className="text-sm text-gray-500">({count})</span>
    </div>
  );
} 