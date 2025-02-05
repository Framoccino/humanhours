import '../styles/globals.css';
import { useState } from 'react';
import { ethers } from 'ethers';

function MyApp({ Component, pageProps }) {
    const [wallet, setWallet] = useState(null);

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setWallet({ address, signer });
            } catch (error) {
                console.error('Error connecting wallet:', error);
            }
        } else {
            alert('Please install MetaMask to use this application');
        }
    };

    return <Component {...pageProps} wallet={wallet} connectWallet={connectWallet} />;
}

export default MyApp; 