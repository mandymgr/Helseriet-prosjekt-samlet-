import dotenv from 'dotenv';
import path from 'path';
// Load environment variables from unified root .env file
const envPath = path.resolve(__dirname, '../../../.env');
console.log('Loading .env from:', envPath);
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error('Error loading .env:', result.error);
} else {
  console.log('Successfully loaded .env file');
  console.log('DATABASE_URL is set:', !!process.env.DATABASE_URL);
}

// Initialize monitoring before importing anything else
// import { initializeMonitoring } from '@/config/monitoring.simple';
// initializeMonitoring(); // Temporarily disabled

import app from './app';
import { connectDatabase } from '@/config/database';
import { logger } from '@/utils/logger.simple';

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

async function startServer() {
  try {
    // Connect to database
    await connectDatabase();
    logger.info('Database connected successfully');

    // Start server
    const server = app.listen(PORT, () => {
      logger.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
      logger.info(`Health check available at: http://localhost:${PORT}/health`);
    });

    // Keep the process alive
    server.on('listening', () => {
      logger.info('Server is listening for connections');
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully');
      server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT received, shutting down gracefully');
      server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Keep the process running
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection:', { promise, reason });
  process.exit(1);
});

startServer();