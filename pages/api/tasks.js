import { check, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import winston from 'winston';

// Set up rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Set up logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

export default function handler(req, res) {
  // Apply rate limiter
  limiter(req, res, () => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('Validation error:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    // Mock data
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
  });
} 