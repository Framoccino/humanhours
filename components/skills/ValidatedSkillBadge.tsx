import { Check } from 'lucide-react';

interface ValidatedSkillBadgeProps {
  name: string;
  count: number;
  isActive?: boolean;
}

export default function ValidatedSkillBadge({ name, count, isActive }: ValidatedSkillBadgeProps) {
  return (
    <div
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full border
        ${isActive 
          ? 'bg-[#64FFDA]/10 border-[#64FFDA] text-[#64FFDA]' 
          : 'bg-[#112240] border-[#1E2D4D] text-[#8892B0]'}
      `}
    >
      {isActive && <Check className="w-4 h-4 text-[#64FFDA]" />}
      <span>{name}</span>
      <span className="text-sm opacity-75">({count})</span>
    </div>
  );
} 