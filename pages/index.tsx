import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import WalletConnect from '../components/WalletConnect';
import TaskCard from '../components/TaskCard';
import { findMatchingTasks } from '../utils/aiMatching';
import { earnHours, transferHours } from '../utils/contracts';
import { Task, Skill } from '../types';
import { ethers } from 'ethers';

export default function Home() {
    return (
        <>
            <Head>
                <title>Human Hours</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="min-h-screen bg-gray-50">
                <header className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-green-600">HUMAN HOURS</h1>
                        <div className="flex items-center gap-4">
                            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                                Connect Wallet
                            </button>
                            <button className="p-2">🔔</button>
                            <button className="p-2">👤</button>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 py-8">
                    <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>
                    
                    <div className="mb-8">
                        <input
                            type="text"
                            placeholder="What do you want to do today?"
                            className="w-full p-4 border rounded-lg"
                        />
                    </div>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Validated Skills</h3>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Gardening</span>
                                <span className="text-gray-500">(12)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Photography</span>
                                <span className="text-gray-500">(8)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Cooking</span>
                                <span className="text-gray-500">(15)</span>
                            </div>
                        </div>
                    </section>

                    <div className="flex gap-4 mb-8">
                        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            Add $HH
                        </button>
                        <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                            Use $HH
                        </button>
                        <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                            Analytics
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Help with Garden Maintenance',
                                location: 'Brooklyn, NY',
                                duration: '3 hours',
                                description: 'Need help with pruning trees and planting new flowers in my backyard garden.'
                            },
                            {
                                title: 'Teach Basic Photography',
                                location: 'Online',
                                duration: '2 hours',
                                description: 'Looking for someone to teach me the basics of DSLR photography and photo editing.'
                            },
                            {
                                title: 'Cook Healthy Meals',
                                location: 'Manhattan, NY',
                                duration: '4 hours',
                                description: "Need assistance preparing a week's worth of healthy meal prep for my family."
                            }
                        ].map((task, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow">
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
                                <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                    Learn More
                                </button>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
} 