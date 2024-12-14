import app from './app';
import { mongoDbConnection } from './config/db.config';

const PORT = Number(process.env.PORT) || 8082;
const Package = require('../package.json');

let client = {
  database: {
    mongo: false,
  },
};

const startDatabase = async () => {
  // Connect to MongoDB
  await mongoDbConnection
    .then(() => {
      client.database.mongo = true;
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
};

// Start listening.
app.listen(
  {
    port: PORT,
    host: '0.0.0.0',
  },
  async (err: Error | null) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    await startDatabase();

    console.info('Server Started', {
      environment: process.env.NODE_ENV || 'development',
      version: Package.version,
      port: PORT,
      host: '0.0.0.0',
      server: 'http://localhost:' + PORT,
      docs: 'http://localhost:' + PORT + '/api-docs',
      database: client.database,
    });
  }
);
