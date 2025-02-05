const reputationSystem = {
    // Trust score calculation
    calculateTrustScore: async function(address) {
        try {
            const completedTasks = await contract.methods.getCompletedTaskCount(address).call();
            const disputes = await contract.methods.getDisputeCount(address).call();
            const ratings = await contract.methods.getUserRatings(address).call();
            
            // Calculate weighted score
            const score = (completedTasks * 10 + ratings.average * 20 - disputes * 15) / 10;
            return Math.max(0, Math.min(100, score)); // Score between 0-100
        } catch (error) {
            console.error('Error calculating trust score:', error);
            return 0;
        }
    },

    // Update user rating
    updateRating: async function(address, rating, comment) {
        try {
            await contract.methods.rateUser(address, rating, comment).send({
                from: web3Handler.web3.eth.defaultAccount
            });
            return true;
        } catch (error) {
            console.error('Error updating rating:', error);
            return false;
        }
    }
}; 