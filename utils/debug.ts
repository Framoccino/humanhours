const DEBUG = process.env.NODE_ENV !== 'production';

export const debug = {
  log: (...args: any[]) => {
    if (DEBUG) {
      console.log('[DEBUG]', ...args);
    }
  },
  
  error: (error: Error, context?: any) => {
    if (DEBUG) {
      console.error('[ERROR]', error, context);
    }
  },
  
  warn: (...args: any[]) => {
    if (DEBUG) {
      console.warn('[WARN]', ...args);
    }
  },
  
  trace: (message: string) => {
    if (DEBUG) {
      console.log('[TRACE]', message, new Error().stack);
    }
  },

  performance: {
    start: (label: string) => {
      if (DEBUG) {
        console.time(`[PERF] ${label}`);
      }
    },
    end: (label: string) => {
      if (DEBUG) {
        console.timeEnd(`[PERF] ${label}`);
      }
    }
  }
}; 