import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const Web3Context = createContext({
  account: null,
  connectWallet: async () => {},
  isConnecting: false,
  error: null
});

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAccount(accounts[0]);
      } else {
        throw new Error('Please install MetaMask');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null);
      });
    }
  }, []);

  return (
    <Web3Context.Provider value={{ account, connectWallet, isConnecting, error }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context); 