import { Task } from '../types';
import * as tf from '@tensorflow/tfjs';

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

export interface UserProfile {
  skills: string[];
  location: string;
  ratings: number[];
  completedTasks: number;
}

export class AIMatchingSystem {
  private model: tf.Sequential;

  constructor() {
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [10], units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'sigmoid' })
      ]
    });
  }

  async trainModel(users: UserProfile[], matches: boolean[]) {
    const userData = this.preprocessUserData(users);
    const matchData = tf.tensor2d(matches.map(m => [m ? 1 : 0]));

    await this.model.compile({
      optimizer: 'adam',
      loss: 'binaryCrossentropy',
      metrics: ['accuracy']
    });

    await this.model.fit(userData, matchData, {
      epochs: 10,
      batchSize: 32
    });
  }

  async findMatches(user: UserProfile, potentialMatches: UserProfile[]): Promise<number[]> {
    const userData = this.preprocessUserData([user]);
    const matchesData = this.preprocessUserData(potentialMatches);
    
    const predictions = this.model.predict(matchesData) as tf.Tensor;
    return Array.from(await predictions.data());
  }

  private preprocessUserData(users: UserProfile[]): tf.Tensor2d {
    // Convert user data to numerical features
    const features = users.map(user => [
      user.skills.length,
      user.completedTasks,
      ...this.processRatings(user.ratings)
    ]);
    
    return tf.tensor2d(features);
  }

  private processRatings(ratings: number[]): number[] {
    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    const std = Math.sqrt(ratings.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / ratings.length);
    return [avg, std];
  }
} 