import { useWeb3 } from '@/context/Web3Context';

export function WalletTest() {
  const { account, connectWallet, isConnecting, error } = useWeb3();

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Wallet Status</h2>
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      {account ? (
        <div>
          <p className="text-green-500">Connected: {account}</p>
          <button 
            onClick={() => window.ethereum.request({
              method: 'eth_requestAccounts'
            })}
            className="mt-2 px-4 py-2 bg-gray-100 rounded"
          >
            Switch Account
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="px-4 py-2 bg-[#28a745] text-white rounded disabled:opacity-50"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
} 