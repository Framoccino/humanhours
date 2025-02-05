document.addEventListener('DOMContentLoaded', async () => {
    // Initialize Web3
    if (await web3Handler.init()) {
        // Connect wallet button
        const connectWalletBtn = document.querySelector('.connect-wallet');
        connectWalletBtn.addEventListener('click', async () => {
            try {
                const address = await web3Handler.connectWallet();
                await web3Handler.updateUserInterface(address);
                
                // Start listening for reputation changes
                contract.events.UserRated({ filter: { user: address } })
                    .on('data', async () => {
                        await web3Handler.updateUserInterface(address);
                    });
                
                contract.events.TaskCompleted({ filter: { worker: address } })
                    .on('data', async () => {
                        await web3Handler.updateUserInterface(address);
                    });
            } catch (error) {
                console.error('Failed to connect wallet:', error);
                alert('Failed to connect wallet. Please try again.');
            }
        });
    }
}); 