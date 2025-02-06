import { createContext, useContext, useState, useEffect } from 'react';
import { web3Service } from '@/utils/web3';

interface Web3ContextType {
  isConnected: boolean;
  account: string | null;
  balance: string;
  connectWallet: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType>({
  isConnected: false,
  account: null,
  balance: '0',
  connectWallet: async () => {},
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState('0');

  const connectWallet = async () => {
    try {
      const account = await web3Service.connectWallet();
      setAccount(account);
      setIsConnected(true);
      
      const balance = await web3Service.getBalance();
      setBalance(balance);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  useEffect(() => {
    // Check if previously connected
    const checkConnection = async () => {
      const initialized = await web3Service.initialize();
      if (initialized) {
        const account = web3Service.getConnectedAccount();
        if (account) {
          setAccount(account);
          setIsConnected(true);
          const balance = await web3Service.getBalance();
          setBalance(balance);
        }
      }
    };

    checkConnection();
  }, []);

  return (
    <Web3Context.Provider value={{ isConnected, account, balance, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context); 