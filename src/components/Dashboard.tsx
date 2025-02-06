import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { AnalyticsChart } from './dashboard/AnalyticsChart';
import { NetworkList } from './dashboard/NetworkList';
import { SkillProgress } from './dashboard/SkillProgress';
import { CommunityContributions } from './dashboard/CommunityContributions';

export function Dashboard({ userAddress }) {
  const [userData, setUserData] = useState({
    totalHH: 0,
    completedTasks: [],
    network: [],
    skills: {},
    unlockedFeatures: [],
    communityContributions: []
  });

  useEffect(() => {
    loadUserData();
  }, [userAddress]);

  async function loadUserData() {
    try {
      // Get user's completed tasks
      const { data: tasks } = await supabase
        .from('completed_tasks')
        .select(`
          *,
          client:profiles!client_id(*),
          review:reviews(*)
        `)
        .eq('provider_id', userAddress)
        .order('completed_at', { ascending: false });

      // Calculate analytics
      const analytics = calculateAnalytics(tasks);
      
      // Get network connections
      const { data: network } = await supabase
        .from('user_network')
        .select('*')
        .eq('user_id', userAddress);

      // Get community contributions
      const { data: contributions } = await supabase
        .from('community_contributions')
        .select('*')
        .eq('contributor_id', userAddress);

      setUserData({
        totalHH: analytics.totalHH,
        completedTasks: tasks,
        network,
        skills: analytics.skillStats,
        unlockedFeatures: determineUnlockedFeatures(analytics.totalHH),
        communityContributions: contributions
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Your Dashboard</h2>
        <div className="hh-balance">
          <span className="balance-amount">{userData.totalHH}</span>
          <span className="balance-label">HH</span>
        </div>
      </header>

      <div className="dashboard-grid">
        <AnalyticsChart data={userData.completedTasks} />
        <SkillProgress skills={userData.skills} />
        <NetworkList network={userData.network} />
        <CommunityContributions contributions={userData.communityContributions} />
      </div>
    </div>
  );
} 