const web3Handler = {
    init: async function() {
        if (typeof window.ethereum !== 'undefined') {
            this.web3 = new Web3(window.ethereum);
            return true;
        }
        return false;
    },

    connectWallet: async function() {
        try {
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            return accounts[0];
        } catch (error) {
            console.error('Error connecting wallet:', error);
            throw error;
        }
    },

    getBalance: async function(address) {
        try {
            const balance = await this.web3.eth.getBalance(address);
            return this.web3.utils.fromWei(balance, 'ether');
        } catch (error) {
            console.error('Error getting balance:', error);
            throw error;
        }
    },

    async getUserReputation(address) {
        try {
            const trustScore = await reputationSystem.calculateTrustScore(address);
            const completedTasks = await contract.methods.getCompletedTaskCount(address).call();
            const ratings = await contract.methods.getUserRatings(address).call();
            
            return {
                trustScore,
                completedTasks,
                averageRating: ratings.average,
                totalRatings: ratings.count
            };
        } catch (error) {
            console.error('Error getting user reputation:', error);
            return null;
        }
    },

    async updateUserInterface(address) {
        const reputation = await this.getUserReputation(address);
        if (reputation) {
            // Update trust score display
            document.getElementById('trustScoreValue').textContent = 
                `${Math.round(reputation.trustScore)}%`;
            document.getElementById('trustScoreFill').style.width = 
                `${reputation.trustScore}%`;
            
            // Update stats
            document.querySelector('[data-stat="completed-tasks"]')
                .textContent = reputation.completedTasks;
            document.querySelector('[data-stat="average-rating"]')
                .textContent = reputation.averageRating.toFixed(1);
        }
    }
}; 