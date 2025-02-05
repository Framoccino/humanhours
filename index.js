// Human Hours ($HH) - Core Application Entry Point

console.log("Our human nature");

// Initialize core application
const HumanHours = {
    version: '0.1.0',
    name: 'Human Hours',
    symbol: 'HH',
    description: 'A Decentralized P2P Economy Powered by Time'
};

module.exports = HumanHours;

// Get the message element
const messageElement = document.getElementById('message');

// Add click event listener to the body
document.body.addEventListener('click', () => {
    messageElement.textContent = "Our human nature";
});

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(registration => {
            console.log('ServiceWorker registration successful');
        })
        .catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
}
