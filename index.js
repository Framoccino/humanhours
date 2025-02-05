// Human Hours ($HH) - Core Application Entry Point
console.log("Initializing Human Hours Platform...");

// Initialize core application
const HumanHours = {
    version: '0.1.0',
    name: 'Human Hours',
    symbol: 'HH',
    description: 'A Decentralized P2P Economy Powered by Time'
};

// Web3 Integration
async function initializeWeb3() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected account:', accounts[0]);
            return accounts[0];
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        console.log('Please install MetaMask!');
    }
}

// AI Matching System
const AIMatchingSystem = {
    findMatches: function(userSkills, location) {
        // Implement AI matching logic here
        return [
            { skill: 'Gardening', match: 95 },
            { skill: 'Web Development', match: 88 },
            { skill: 'Teaching', match: 82 }
        ];
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Get the message element
    const messageElement = document.getElementById('message');
    if (messageElement) {
        messageElement.textContent = 'Welcome to Human Hours';
    }

    // Initialize Web3
    initializeWeb3().then(account => {
        if (account) {
            console.log('Web3 initialized with account:', account);
        }
    });
});

module.exports = HumanHours;

// Get the message element
const messageElement = document.getElementById('message');

// Add click event listener to the body
document.body.addEventListener('click', () => {
    messageElement.textContent = "Our human nature";
});

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(registration => {
            console.log('ServiceWorker registration successful');
        })
        .catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
}

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home({ wallet, connectWallet }) {
    // ... existing code ...

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Human Hours - P2P Economy Powered by Time</title>
                <meta name="description" content="A Decentralized P2P Economy Powered by Time" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">HUMAN HOURS</h1>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={connectWallet}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {wallet ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : 'Connect Wallet'}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <section className="hero-section text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Welcome to Human Hours</h2>
                    <p className="text-xl text-gray-600 mb-8">Trade your time, skills, and services in a decentralized P2P economy</p>
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Get Started
                    </button>
                </section>

                <section className="wallet-status bg-blue-50 p-6 rounded-lg mb-12">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-semibold">Your Balance</h3>
                            <p className="text-2xl font-bold text-blue-600">0 $HH</p>
                        </div>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Earn Hours
                        </button>
                    </div>
                </section>

                <section className="services">
                    <h2 className="text-2xl font-bold mb-6">Available Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Guitar Lessons', price: '2', provider: 'John D.' },
                            { title: 'Web Development', price: '1', provider: 'Sarah M.' },
                            { title: 'Yoga Classes', price: '1.5', provider: 'Mike R.' },
                        ].map((service) => (
                            <div key={service.title} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                <p className="text-gray-600 mb-1">{service.price} $HH per hour</p>
                                <p className="text-gray-600 mb-4">By: {service.provider}</p>
                                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
