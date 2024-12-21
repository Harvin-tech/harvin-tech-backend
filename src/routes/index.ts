import { FastifyInstance } from 'fastify';
import { mongoDbConnection } from '../config/db.config';

/**
 * Registers routes related to the health of the application.
 *
 * @param app The Fastify instance to register the routes on.
 * @param opts An object with options for the plugin.
 */
export default async function healthRoutes(app: FastifyInstance, opts: any) {
  /**
   * GET /health
   *
   * Verifies the health of the application by checking the health of the MongoDB connection.
   *
   * @returns An object with a "status" property indicating the health of the connection and a "message" property with a detailed message.
   */
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

/**
 * Verifies the health of the MongoDB connection.
 *
 * @returns An object with a "status" property indicating the health of the connection and a "message" property with a detailed message.
 */
export async function checkMongoDBHealth(): Promise<{
  /**
   * Indicates the health of the connection.
   */
  status: boolean;
  /**
   * A detailed message about the health of the connection.
   */
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
