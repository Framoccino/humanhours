import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export function AnalyticsChart({ data }) {
  const [timeframe, setTimeframe] = useState('month');
  const [chartType, setChartType] = useState('radar');
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const processData = (rawData, timeframe) => {
    const now = new Date();
    const filtered = rawData.filter(task => {
      const taskDate = new Date(task.completed_at);
      if (timeframe === 'month') {
        return taskDate >= new Date(now.setMonth(now.getMonth() - 1));
      }
      if (timeframe === 'quarter') {
        return taskDate >= new Date(now.setMonth(now.getMonth() - 3));
      }
      return true; // year
    });

    return filtered.reduce((acc, task) => {
      task.skills_used.forEach(skill => {
        if (!acc[skill]) {
          acc[skill] = {
            totalHH: 0,
            count: 0,
            avgRating: 0,
            ratings: [],
            revenue: 0,
            repeatClients: new Set(),
            topEarning: 0
          };
        }
        acc[skill].totalHH += task.hours_earned;
        acc[skill].count += 1;
        acc[skill].revenue += task.hours_earned * task.hourly_rate;
        acc[skill].repeatClients.add(task.client_id);
        acc[skill].topEarning = Math.max(acc[skill].topEarning, task.hours_earned * task.hourly_rate);
        if (task.review?.[0]?.rating) {
          acc[skill].ratings.push(task.review[0].rating);
        }
      });
      return acc;
    }, {});
  };

  useEffect(() => {
    if (!data || !chartRef.current) return;

    const skillStats = processData(data, timeframe);
    
    // Calculate metrics
    Object.keys(skillStats).forEach(skill => {
      const stats = skillStats[skill];
      stats.avgRating = stats.ratings.length 
        ? stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length 
        : 0;
      stats.clientRetention = (stats.repeatClients.size / stats.count) * 100;
      stats.avgHourlyRate = stats.revenue / stats.totalHH;
    });

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels: Object.keys(skillStats),
        datasets: [
          {
            label: 'Hours Earned',
            data: Object.values(skillStats).map(s => s.totalHH),
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1
          },
          {
            label: 'Client Retention %',
            data: Object.values(skillStats).map(s => s.clientRetention),
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 1
          },
          {
            label: 'Average Rating',
            data: Object.values(skillStats).map(s => s.avgRating * 20), // Scale to 100
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            borderColor: 'rgba(139, 92, 246, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const skill = Object.keys(skillStats)[context.dataIndex];
                const stats = skillStats[skill];
                return [
                  `Hours: ${stats.totalHH.toFixed(1)}`,
                  `Revenue: ${stats.revenue.toFixed(2)} HH`,
                  `Avg Rate: ${stats.avgHourlyRate.toFixed(2)} HH/hr`,
                  `Rating: ${stats.avgRating.toFixed(1)}/5`,
                  `Clients: ${stats.repeatClients.size}`
                ];
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, timeframe, chartType]);

  return (
    <div className="analytics-chart">
      <div className="chart-header">
        <h3>Skill Performance</h3>
        <div className="chart-controls">
          <select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
            className="timeframe-select"
          >
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <select 
            value={chartType} 
            onChange={(e) => setChartType(e.target.value)}
            className="chart-type-select"
          >
            <option value="radar">Radar</option>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
          </select>
        </div>
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
} 