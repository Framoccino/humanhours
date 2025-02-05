import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Search, Users, BarChart2, Clock, Star } from 'lucide-react';
import ValidatedSkillBadge from '../components/skills/ValidatedSkillBadge';
import TaskCard from '../components/tasks/TaskCard';
import { useWeb3 } from '../context/Web3Context';

const mockSkills = [
  { name: 'Gardening', count: 12, isActive: true },
  { name: 'Photography', count: 8, isActive: true },
  { name: 'Cooking', count: 15, isActive: true },
  { name: 'Web Development', count: 5 },
  { name: 'Language Teaching', count: 3 }
];

const mockTasks = [
  {
    id: 1,
    title: 'Help with Garden Maintenance',
    location: 'Brooklyn, NY',
    duration: '3 hours',
    description: 'Need help with pruning trees and planting new flowers in my backyard garden.',
    hourlyRate: 2,
    provider: {
      name: 'Sarah M.',
      rating: 4.8,
      completedTasks: 23
    }
  },
  {
    id: 2,
    title: 'Teach Basic Photography',
    location: 'Online',
    duration: '2 hours',
    description: 'Looking for someone to teach me the basics of DSLR photography and photo editing.',
    hourlyRate: 1.5,
    provider: {
      name: 'John D.',
      rating: 4.9,
      completedTasks: 15
    }
  },
  {
    id: 3,
    title: 'Cook Healthy Meals',
    location: 'Manhattan, NY',
    duration: '4 hours',
    description: "Need assistance preparing a week's worth of healthy meal prep for my family.",
    hourlyRate: 2,
    provider: {
      name: 'Mike R.',
      rating: 4.7,
      completedTasks: 31
    }
  }
];

const mockStats = {
  balance: 100,
  earned: 250,
  completed: 12,
  rating: 4.8
};

export default function Home() {
  const { account } = useWeb3();

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#0A192F]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-16 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#E6F1FF] leading-tight">
              Welcome to Human Hours
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#64FFDA] leading-relaxed">
              The Economy of Time
            </h2>
            <p className="text-lg md:text-xl text-[#8892B0] leading-relaxed">
              A decentralized P2P platform where time is currency. Trade skills, earn Human Hours ($HH), 
              and exchange them for services—no middlemen, no inflation, no fees. Every transaction is 
              peer-validated and secured on blockchain, ensuring fairness, trust, and financial freedom.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 