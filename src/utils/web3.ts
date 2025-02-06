import Web3 from 'web3';

export class Web3Service {
  private web3: Web3 | null = null;
  private account: string | null = null;

  async initialize() {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.web3 = new Web3(window.ethereum);
        return true;
      } catch (error) {
        console.error('User denied account access');
        return false;
      }
    } else {
      console.log('Please install MetaMask!');
      return false;
    }
  }

  async connectWallet() {
    if (!this.web3) {
      await this.initialize();
    }

    try {
      const accounts = await this.web3!.eth.getAccounts();
      this.account = accounts[0];
      return this.account;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  async getBalance() {
    if (!this.web3 || !this.account) return '0';
    
    try {
      const balance = await this.web3.eth.getBalance(this.account);
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  }

  getConnectedAccount() {
    return this.account;
  }
}

export const web3Service = new Web3Service(); 