import { Task } from '../types';

export const findMatchingTasks = (query: string, tasks: Task[], userSkills: string[]) => {
    // Simple matching algorithm - would be replaced with actual ML in production
    return tasks.filter(task => {
        const matchesQuery = task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.description.toLowerCase().includes(query.toLowerCase());
        
        const matchesSkills = userSkills.some(skill => 
            task.title.toLowerCase().includes(skill.toLowerCase())
        );

        return matchesQuery || matchesSkills;
    });
}; 