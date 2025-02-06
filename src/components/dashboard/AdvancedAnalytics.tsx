import { useState } from 'react';
import { AnalyticsChart } from './AnalyticsChart';
import { SkillBreakdown } from './SkillBreakdown';
import { EarningsChart } from './EarningsChart';
import { TrendAnalysis } from './TrendAnalysis';

export function AdvancedAnalytics({ data }) {
  const [activeView, setActiveView] = useState('performance');

  const views = {
    performance: <AnalyticsChart data={data} />,
    skills: <SkillBreakdown data={data} />,
    earnings: <EarningsChart data={data} />,
    trends: <TrendAnalysis data={data} />
  };

  return (
    <div className="advanced-analytics">
      <div className="analytics-nav">
        <button 
          className={`nav-btn ${activeView === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveView('performance')}
        >
          Performance
        </button>
        <button 
          className={`nav-btn ${activeView === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveView('skills')}
        >
          Skills
        </button>
        <button 
          className={`nav-btn ${activeView === 'earnings' ? 'active' : ''}`}
          onClick={() => setActiveView('earnings')}
        >
          Earnings
        </button>
        <button 
          className={`nav-btn ${activeView === 'trends' ? 'active' : ''}`}
          onClick={() => setActiveView('trends')}
        >
          Trends
        </button>
      </div>
      <div className="analytics-content">
        {views[activeView]}
      </div>
    </div>
  );
} 