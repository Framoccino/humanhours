const taskManager = {
    createTask: async function(taskData) {
        // Add to blockchain
        const transaction = await web3Handler.web3.eth.sendTransaction({
            from: taskData.creator,
            to: contractAddress,
            data: encodedData,
            value: 0
        });
        return transaction;
    },

    getTasks: async function() {
        // Get tasks from blockchain
        const tasks = await contract.methods.getTasks().call();
        return tasks;
    },

    acceptTask: async function(taskId) {
        // Accept task on blockchain
        const transaction = await contract.methods.acceptTask(taskId).send({
            from: userAddress
        });
        return transaction;
    }
}; 