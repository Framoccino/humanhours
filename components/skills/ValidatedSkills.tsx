import { Check } from 'lucide-react';

interface Skill {
  name: string;
  count: number;
}

interface ValidatedSkillsProps {
  skills: Skill[];
}

export default function ValidatedSkills({ skills }: ValidatedSkillsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Validated Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div 
            key={skill.name}
            className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border"
          >
            <Check className="w-4 h-4 text-green-600" />
            <span className="font-medium">{skill.name}</span>
            <span className="text-sm text-gray-500">({skill.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
} 