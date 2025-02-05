import { useState, useEffect } from 'react';
import { Search, Filter, Sliders } from 'lucide-react';
import TaskCard from '../tasks/TaskCard';

interface MatchingInterfaceProps {
  userSkills: string[];
  userLocation: string;
}

export default function MatchingInterface({ userSkills, userLocation }: MatchingInterfaceProps) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    distance: 50,
    minRating: 4,
    skillMatch: true
  });

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        // API call to AI matching system would go here
        const response = await fetch('/api/matches', {
          method: 'POST',
          body: JSON.stringify({
            skills: userSkills,
            location: userLocation,
            filters
          })
        });
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [userSkills, userLocation, filters]);

  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="p-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <label className="flex items-center gap-2">
            <span>Distance</span>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.distance}
              onChange={(e) => setFilters({ ...filters, distance: +e.target.value })}
              className="w-24"
            />
            <span>{filters.distance}km</span>
          </label>

          <label className="flex items-center gap-2">
            <span>Min Rating</span>
            <select
              value={filters.minRating}
              onChange={(e) => setFilters({ ...filters, minRating: +e.target.value })}
              className="border rounded px-2 py-1"
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>{rating}+ ⭐</option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.skillMatch}
              onChange={(e) => setFilters({ ...filters, skillMatch: e.target.checked })}
            />
            <span>Match my skills</span>
          </label>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading matches...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <TaskCard key={match.id} {...match} />
          ))}
        </div>
      )}
    </div>
  );
} 