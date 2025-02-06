import { useState } from 'react';
import Link from 'next/link';
import { web3Service } from '@/utils/web3';

export function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');

  const connectWallet = async () => {
    try {
      const account = await web3Service.connectWallet();
      setAccount(account);
      setIsConnected(true);
      
      // Get and set balance
      const balance = await web3Service.getBalance();
      setBalance(balance);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <header className="header">
      <div className="logo interactive-button">
        <span className="logo-text">HUMAN HOURS</span>
        <div className="logo-glow"></div>
      </div>
      
      {/* Add Navigation */}
      <nav className="main-nav">
        <Link href="/dao" className="nav-link interactive-button">
          <i className="ph ph-buildings"></i>
          DAO
          <span className="nav-link-highlight"></span>
        </Link>
        <Link href="/messages" className="nav-link interactive-button">
          <i className="ph ph-chat-circle"></i>
          Messages
          <span className="nav-link-highlight"></span>
        </Link>
        <Link href="/community" className="nav-link interactive-button">
          <i className="ph ph-users"></i>
          Community
          <span className="nav-link-highlight"></span>
        </Link>
      </nav>

      <button 
        onClick={connectWallet}
        className={`connect-wallet interactive-button ${isConnected ? 'connected' : ''}`}
      >
        <i className="ph ph-wallet"></i>
        {isConnected ? (
          <>
            <span className="wallet-address">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
            <span className="balance">
              ({balance} HH)
            </span>
            <div className="connection-indicator"></div>
          </>
        ) : (
          'CONNECT WALLET'
        )}
      </button>
    </header>
  );
} 