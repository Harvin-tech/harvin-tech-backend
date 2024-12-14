import { FastifyInstance } from 'fastify';
import { mongoDbConnection } from '../config/db.config';

export async function checkMongoDBHealth(): Promise<{
  status: boolean;
  message: string;
}> {
  try {
    // Ping the database or verify connection status
    await mongoDbConnection;

    return { status: true, message: 'MongoDB is connected' };
  } catch (error: any) {
    return {
      status: false,
      message: `MongoDB connection failed: ${error}`,
    };
  }
}

export default async function healthRoutes(app: FastifyInstance, opts: any) {
  app.get('/health', async (request, reply) => {
    // Check MongoDB health
    const mongoHealth = await checkMongoDBHealth();

    // Consolidate checks
    const checks = {
      database: {
        mongo: mongoHealth,
      },
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };

    // Determine overall health
    const overallStatus = mongoHealth.status ? 200 : 503;

    return reply.status(overallStatus).send({
      status: overallStatus,
      message:
        overallStatus === 200
          ? '✅ Everything is awesome! 🥳'
          : '❌  Oops! Something went wrong... 🤕 ',
    });
  });
}
