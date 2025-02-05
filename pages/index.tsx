import { useState } from 'react';
import { Search } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import ValidatedSkillBadge from '../components/skills/ValidatedSkillBadge';
import TaskCard from '../components/tasks/TaskCard';

const mockSkills = [
  { name: 'Gardening', count: 12 },
  { name: 'Photography', count: 8 },
  { name: 'Cooking', count: 15 }
];

const mockTasks = [
  {
    id: 1,
    title: 'Help with Garden Maintenance',
    location: 'Brooklyn, NY',
    duration: '3 hours',
    description: 'Need help with pruning trees and planting new flowers in my backyard garden.'
  },
  {
    id: 2,
    title: 'Teach Basic Photography',
    location: 'Online',
    duration: '2 hours',
    description: 'Looking for someone to teach me the basics of DSLR photography and photo editing.'
  },
  {
    id: 3,
    title: 'Cook Healthy Meals',
    location: 'Manhattan, NY',
    duration: '4 hours',
    description: "Need assistance preparing a week's worth of healthy meal prep for my family."
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome Back</h1>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="What do you want to do today?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border focus:ring-2 
                     focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Validated Skills</h2>
          <div className="flex flex-wrap gap-3">
            {mockSkills.map((skill) => (
              <ValidatedSkillBadge
                key={skill.name}
                name={skill.name}
                count={skill.count}
              />
            ))}
          </div>
        </section>

        <div className="flex gap-4 mb-8">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Add $HH
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            Use $HH
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            Analytics
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTasks.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
              onLearnMore={() => console.log('Learn more about', task.id)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 