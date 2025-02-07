import { SearchIcon, CheckIcon } from '@heroicons/react/outline';

export function SearchAndSkills() {
  return (
    <div className="space-y-8 mb-12">
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="What do you want to do today?"
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 
                   focus:border-[#28a745] focus:ring-1 focus:ring-[#28a745]"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Validated Skills</h2>
        <div className="flex flex-wrap gap-3">
          <SkillBadge name="Gardening" count={12} />
          <SkillBadge name="Photography" count={8} />
          <SkillBadge name="Cooking" count={15} />
        </div>
      </div>

      <div className="flex gap-4">
        <button className="px-4 py-2 bg-[#28a745] text-white rounded-lg">
          Add $HH
        </button>
        <button className="px-4 py-2 border border-gray-200 rounded-lg">
          Use $HH
        </button>
        <button className="px-4 py-2 border border-gray-200 rounded-lg">
          Analytics
        </button>
      </div>
    </div>
  );
}

function SkillBadge({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full 
                    border border-[#28a745] text-[#28a745]">
      <CheckIcon className="w-4 h-4" />
      <span>{name}</span>
      <span className="text-sm opacity-75">({count})</span>
    </div>
  );
} 