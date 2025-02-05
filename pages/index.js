import { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';
import { Search, Clock, MapPin, Star, Users, BarChart2 } from 'lucide-react';
import ValidatedSkillBadge from '../components/skills/ValidatedSkillBadge';
import TaskCard from '../components/tasks/TaskCard';

// Mock data
const mockSkills = [
    { name: 'Gardening', count: 12, isActive: true },
    { name: 'Photography', count: 8 },
    { name: 'Cooking', count: 15 },
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
    // ... more tasks
];

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [wallet, setWallet] = useState(null);
    const [tasks, setTasks] = useState(mockTasks);

    // Connect wallet
    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                setWallet({ address: accounts[0] });
            } catch (error) {
                console.error('Error connecting wallet:', error);
            }
        }
    };

    return (
        <MainLayout>
            <Head>
                <title>Human Hours - P2P Economy Powered by Time</title>
                <meta name="description" content="A decentralized P2P economy powered by time" />
            </Head>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Human Hours</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Trade your time and skills in a decentralized economy
                    </p>
                    {!wallet ? (
                        <button
                            onClick={connectWallet}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Connect Wallet to Get Started
                        </button>
                    ) : (
                        <div className="relative">
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
                    )}
                </div>

                {/* Main Content */}
                {wallet && (
                    <>
                        {/* Validated Skills Section */}
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Validated Skills</h2>
                            <div className="flex flex-wrap gap-3">
                                {mockSkills.map((skill) => (
                                    <ValidatedSkillBadge
                                        key={skill.name}
                                        name={skill.name}
                                        count={skill.count}
                                        isActive={skill.isActive}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Tasks Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    {...task}
                                    onLearnMore={() => console.log('Learn more about', task.id)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </MainLayout>
    );
} 