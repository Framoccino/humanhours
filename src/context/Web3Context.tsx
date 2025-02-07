import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ProfileSetup } from '@/components/ProfileSetup';

type Profile = {
  fullName: string;
  skills: string[];
  bio: string;
} | null;

type Web3ContextType = {
  account: string | null;
  profile: Profile;
  connectWallet: () => Promise<void>;
  isConnecting: boolean;
  showProfileSetup: boolean;
};

const Web3Context = createContext<Web3ContextType>({
  account: null,
  profile: null,
  connectWallet: async () => {},
  isConnecting: false,
  showProfileSetup: false,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask');
      return;
    }

    try {
      setIsConnecting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      // Check if profile exists, if not show setup
      checkProfile(accounts[0]);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const checkProfile = async (address: string) => {
    // Add logic to check if profile exists in database
    // For now, always show profile setup
    setShowProfileSetup(true);
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
        if (accounts[0]) {
          checkProfile(accounts[0]);
        }
      });
    }
  }, []);

  return (
    <Web3Context.Provider 
      value={{ 
        account, 
        profile, 
        connectWallet, 
        isConnecting,
        showProfileSetup 
      }}
    >
      {children}
      {showProfileSetup && account && !profile && <ProfileSetup />}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context); 