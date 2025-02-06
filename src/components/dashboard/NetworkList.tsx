import { useState } from 'react';
import { supabase } from '@/utils/supabase';

export function NetworkList({ network }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedContact, setSelectedContact] = useState(null);

  const filteredNetwork = network.filter(contact => {
    if (filter === 'clients') return contact.relationship_type === 'client';
    if (filter === 'providers') return contact.relationship_type === 'provider';
    if (filter === 'frequent') return contact.interaction_count > 3;
    return true;
  });

  const sortedNetwork = [...filteredNetwork].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.last_interaction) - new Date(a.last_interaction);
    }
    if (sortBy === 'hh') {
      return b.total_hh_exchanged - a.total_hh_exchanged;
    }
    return b.interaction_count - a.interaction_count;
  });

  const handleContactClick = async (contact) => {
    try {
      const { data: history } = await supabase
        .from('completed_tasks')
        .select(`
          *,
          review:reviews(*)
        `)
        .or(`provider_id.eq.${contact.id},client_id.eq.${contact.id}`)
        .order('completed_at', { ascending: false });

      setSelectedContact({ ...contact, history });
    } catch (error) {
      console.error('Error loading contact history:', error);
    }
  };

  return (
    <div className="network-list">
      <div className="network-header">
        <h3>Your Network</h3>
        <div className="network-controls">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="network-filter"
          >
            <option value="all">All Contacts</option>
            <option value="clients">Clients</option>
            <option value="providers">Providers</option>
            <option value="frequent">Frequent</option>
          </select>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="network-sort"
          >
            <option value="recent">Most Recent</option>
            <option value="hh">Most HH</option>
            <option value="interactions">Most Active</option>
          </select>
        </div>
      </div>

      <div className="network-grid">
        {sortedNetwork.map(contact => (
          <div 
            key={contact.id} 
            className="network-card"
            onClick={() => handleContactClick(contact)}
          >
            <div className="contact-info">
              <img 
                src={contact.profile.avatar_url || '/default-avatar.png'} 
                alt={contact.profile.full_name}
                className="contact-avatar"
              />
              <div className="contact-details">
                <h4>{contact.profile.full_name}</h4>
                <p className="relationship-type">
                  {contact.relationship_type}
                  {contact.interaction_count > 3 && 
                    <span className="frequent-badge">Frequent</span>
                  }
                </p>
              </div>
            </div>
            <div className="interaction-stats">
              <div className="stat">
                <span className="stat-label">Interactions</span>
                <span className="stat-value">{contact.interaction_count}</span>
              </div>
              <div className="stat">
                <span className="stat-label">HH Exchanged</span>
                <span className="stat-value">{contact.total_hh_exchanged}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Last Active</span>
                <span className="stat-value">
                  {new Date(contact.last_interaction).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedContact && (
        <div className="contact-modal">
          <div className="modal-content">
            <h2>{selectedContact.profile.full_name}</h2>
            <div className="history-timeline">
              {selectedContact.history.map(task => (
                <div key={task.id} className="timeline-item">
                  <div className="timeline-date">
                    {new Date(task.completed_at).toLocaleDateString()}
                  </div>
                  <div className="timeline-content">
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <div className="timeline-stats">
                      <span>{task.hours_earned} HH</span>
                      {task.review?.[0] && (
                        <span>★ {task.review[0].rating}/5</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="close-modal"
              onClick={() => setSelectedContact(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 