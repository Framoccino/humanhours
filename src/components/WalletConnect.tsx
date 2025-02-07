import { useWeb3 } from '@/context/Web3Context';

export function WalletConnect() {
  const { account, connectWallet, isConnecting } = useWeb3();

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-[#28a745] text-white rounded-lg hover:bg-[#218838] transition-colors"
    >
      {account ? 
        `${account.slice(0, 6)}...${account.slice(-4)}` : 
        (isConnecting ? 'Connecting...' : 'Connect Wallet')}
    </button>
  );
} 