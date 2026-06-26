import express from 'express';
import mongoose from 'mongoose';
import routes from './routes.js';
import { getApiBaseUrl } from './config.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());
app.use(routes);

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker API is running',
    endpoints: ['/api/health', '/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'],
    apiBaseUrl: getApiBaseUrl()
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl: getApiBaseUrl() });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${getApiBaseUrl()}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  });
