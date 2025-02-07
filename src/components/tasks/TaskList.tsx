import { TaskCard } from './TaskCard';

export function TaskList() {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map(task => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
} 