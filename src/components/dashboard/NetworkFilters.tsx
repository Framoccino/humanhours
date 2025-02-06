import { useState, useEffect } from 'react';

export function NetworkFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    type: 'all',
    activity: 'all',
    rating: 'all',
    skills: [],
    dateRange: '30'
  });

  const [availableSkills, setAvailableSkills] = useState([]);

  useEffect(() => {
    // Load available skills from completed tasks
    loadAvailableSkills();
  }, []);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="network-filters">
      <div className="filter-group">
        <label>Contact Type</label>
        <select 
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="all">All Contacts</option>
          <option value="clients">Clients</option>
          <option value="providers">Providers</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Activity Level</label>
        <select 
          value={filters.activity}
          onChange={(e) => handleFilterChange('activity', e.target.value)}
        >
          <option value="all">All Activity</option>
          <option value="very-active">Very Active (>5 tasks)</option>
          <option value="active">Active (2-5 tasks)</option>
          <option value="inactive">Inactive (<2 tasks)</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Rating</label>
        <select 
          value={filters.rating}
          onChange={(e) => handleFilterChange('rating', e.target.value)}
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Skills</label>
        <div className="skills-select">
          {availableSkills.map(skill => (
            <label key={skill} className="skill-checkbox">
              <input
                type="checkbox"
                checked={filters.skills.includes(skill)}
                onChange={(e) => {
                  const newSkills = e.target.checked
                    ? [...filters.skills, skill]
                    : filters.skills.filter(s => s !== skill);
                  handleFilterChange('skills', newSkills);
                }}
              />
              {skill}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Date Range</label>
        <select 
          value={filters.dateRange}
          onChange={(e) => handleFilterChange('dateRange', e.target.value)}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
          <option value="all">All time</option>
        </select>
      </div>
    </div>
  );
} 