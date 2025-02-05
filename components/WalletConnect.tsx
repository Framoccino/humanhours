import { useState, useCallback } from 'react';
import { ethers } from 'ethers';

interface WalletState {
    address: string | null;
    balance: string | null;
}

export default function WalletConnect() {
    const [wallet, setWallet] = useState<WalletState>({ address: null, balance: null });

    const connectWallet = useCallback(async () => {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask to use Human Hours');
            return;
        }

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const balance = ethers.utils.formatEther(await provider.getBalance(address));
            
            setWallet({ address, balance });
        } catch (error) {
            console.error('Wallet connection error:', error);
            alert('Failed to connect wallet. Please try again.');
        }
    }, []);

    return (
        <button 
            onClick={connectWallet}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
        >
            {wallet.address 
                ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)} (${Number(wallet.balance).toFixed(2)} HH)`
                : 'Connect Wallet'
            }
        </button>
    );
} 