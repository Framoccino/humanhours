import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home({ wallet, connectWallet }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [tasks, setTasks] = useState([]);
    
    const validatedSkills = [
        { name: 'Gardening', count: 12 },
        { name: 'Photography', count: 8 },
        { name: 'Cooking', count: 15 }
    ];

    useEffect(() => {
        // Fetch tasks from API
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Human Hours - P2P Economy Powered by Time</title>
                <meta name="description" content="A Decentralized P2P Economy Powered by Time" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-green-600">HUMAN HOURS</h1>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={connectWallet}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            {wallet ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : 'Connect Wallet'}
                        </button>
                        <button className="p-2">🔔</button>
                        <button className="p-2">👤</button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
                    <p className="text-gray-600">A Decentralized P2P Economy Powered by Time</p>
                </div>
                
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="What do you want to do today?"
                        className="w-full p-4 border rounded-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Validated Skills</h3>
                    <div className="flex gap-4">
                        {validatedSkills.map((skill) => (
                            <div key={skill.name} className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>{skill.name}</span>
                                <span className="text-gray-500">({skill.count})</span>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="flex gap-4 mb-8">
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg">Add $HH</button>
                    <button className="px-6 py-2 border rounded-lg">Use $HH</button>
                    <button className="px-6 py-2 border rounded-lg">Analytics</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <div key={task.title} className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-4">{task.title}</h3>
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <span>📍</span>
                                <span>{task.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                                <span>⏱️</span>
                                <span>{task.duration}</span>
                            </div>
                            <p className="text-gray-600 mb-4">{task.description}</p>
                            <button className="w-full py-2 bg-green-600 text-white rounded-lg">
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
} 