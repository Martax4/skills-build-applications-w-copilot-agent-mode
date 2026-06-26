import { Router } from 'express';
import { getApiBaseUrl } from './config.js';
import { User } from './models/user.js';
import { Team } from './models/team.js';
import { Activity } from './models/activity.js';
import { Leaderboard } from './models/leaderboard.js';
import { Workout } from './models/workout.js';

const router = Router();

const createCollectionRoute = (resource: string, model: any) => {
  router.get(`/api/${resource}/`, async (_req, res) => {
    try {
      const documents = await model.find({});
      res.json({
        resource,
        count: documents.length,
        data: documents,
        apiBaseUrl: getApiBaseUrl()
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });
};

createCollectionRoute('users', User);
createCollectionRoute('teams', Team);
createCollectionRoute('activities', Activity);
createCollectionRoute('leaderboard', Leaderboard);
createCollectionRoute('workouts', Workout);

export default router;
