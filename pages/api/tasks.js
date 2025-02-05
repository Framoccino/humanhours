export default function handler(req, res) {
    const tasks = [
        {
            id: 1,
            title: 'Help with Garden Maintenance',
            location: 'Brooklyn, NY',
            duration: '3 hours',
            description: 'Need help with pruning trees and planting new flowers in my backyard garden.'
        },
        {
            id: 2,
            title: 'Teach Basic Photography',
            location: 'Online',
            duration: '2 hours',
            description: 'Looking for someone to teach me the basics of DSLR photography and photo editing.'
        },
        {
            id: 3,
            title: 'Cook Healthy Meals',
            location: 'Manhattan, NY',
            duration: '4 hours',
            description: "Need assistance preparing a week's worth of healthy meal prep for my family."
        }
    ];

    res.status(200).json(tasks);
} 