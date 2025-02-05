import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Search, MapPin, Sliders, Filter } from 'lucide-react';
import TaskCard from '../../components/tasks/TaskCard';

export default function MatchingPage() {
  const [filters, setFilters] = useState({
    distance: 10,
    skillMatch: true,
    hourlyRate: [10, 50],
    availability: 'anytime'
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Find Perfect Matches</h1>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Sliders className="w-4 h-4" />
            Advanced Filters
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <div className="col-span-3 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="font-semibold mb-4">Filters</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={filters.distance}
                  onChange={(e) => setFilters({ ...filters, distance: +e.target.value })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0 km</span>
                  <span>{filters.distance} km</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.skillMatch}
                    onChange={(e) => setFilters({ ...filters, skillMatch: e.target.checked })}
                    className="rounded text-green-600"
                  />
                  <span className="text-sm">Match my skills</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={filters.availability}
                  onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="anytime">Anytime</option>
                  <option value="today">Today</option>
                  <option value="this-week">This Week</option>
                  <option value="next-week">Next Week</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tasks or skills..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* AI Recommended Tasks */}
              <div className="col-span-2">
                <h2 className="text-lg font-semibold mb-4">Recommended for You</h2>
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((id) => (
                    <TaskCard
                      key={id}
                      title="Web Development Help"
                      location="Remote"
                      duration="2 hours"
                      description="Need help with React components and styling"
                      onLearnMore={() => {}}
                    />
                  ))}
                </div>
              </div>

              {/* Near You */}
              <div className="col-span-2">
                <h2 className="text-lg font-semibold mb-4">Near You</h2>
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((id) => (
                    <TaskCard
                      key={id}
                      title="Garden Maintenance"
                      location="2.5 km away"
                      duration="3 hours"
                      description="Need help with seasonal garden maintenance"
                      onLearnMore={() => {}}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 