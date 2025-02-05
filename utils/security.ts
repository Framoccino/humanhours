import { ethers } from 'ethers';
import { rateLimit } from 'express-rate-limit';

export const securityConfig = {
  // Rate limiting
  apiLimiter: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }),

  // Input validation
  validateTaskInput: (task: any) => {
    const errors = [];
    if (!task.title || task.title.length < 5) {
      errors.push('Title must be at least 5 characters');
    }
    if (!task.description || task.description.length < 20) {
      errors.push('Description must be at least 20 characters');
    }
    if (typeof task.hourlyRate !== 'number' || task.hourlyRate <= 0) {
      errors.push('Hourly rate must be a positive number');
    }
    return errors;
  },

  // Transaction signing verification
  verifySignature: async (message: string, signature: string, address: string) => {
    try {
      const signerAddr = ethers.utils.verifyMessage(message, signature);
      return signerAddr.toLowerCase() === address.toLowerCase();
    } catch (error) {
      return false;
    }
  }
}; 