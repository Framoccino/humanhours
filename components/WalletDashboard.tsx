import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContract } from '../utils/contracts';

export default function WalletDashboard() {
  const [balance, setBalance] = useState('0');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadWalletData = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = getContract(signer);
        
        const address = await signer.getAddress();
        const balance = await contract.balanceOf(address);
        setBalance(ethers.utils.formatUnits(balance, 2));
      }
    };

    loadWalletData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Your Wallet</h2>
      <div className="mb-4">
        <p className="text-gray-600">Balance</p>
        <p className="text-2xl font-bold">{balance} HH</p>
      </div>
    </div>
  );
} 