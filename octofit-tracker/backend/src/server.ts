import express from 'express';
import routes from './routes.js';
import { connectToDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

const getApiBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

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

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${getApiBaseUrl()}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  });
