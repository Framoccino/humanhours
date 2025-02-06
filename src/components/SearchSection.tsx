import { SearchIcon } from '@heroicons/react/outline';

export function SearchSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Welcome Back</h1>
      <p className="text-lg text-gray-600 mb-8">Trade skills, earn hours, build trust.</p>
      
      <div className="relative mb-12">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="What do you want to do today?"
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 
                   focus:border-[#28a745] focus:ring-1 focus:ring-[#28a745] 
                   transition-colors text-lg"
        />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Validated Skills</h2>
        <div className="flex flex-wrap gap-3">
          <SkillBadge name="Gardening" count={12} />
          <SkillBadge name="Photography" count={8} />
          <SkillBadge name="Cooking" count={15} />
        </div>
      </div>
    </div>
  );
}

function SkillBadge({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full 
                    border border-[#28a745] text-[#28a745] hover:bg-[#28a745] 
                    hover:text-white transition-colors cursor-pointer">
      <span className="text-sm font-medium">{name}</span>
      <span className="text-sm opacity-75">({count})</span>
    </div>
  );
} 