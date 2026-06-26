import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Workout } from '../models/workout.js';
import { connectToDatabase, disconnectFromDatabase } from '../config/database.js';

// Seed the octofit_db database with test data
export const seedDatabase = async (): Promise<void> => {
  await connectToDatabase();
  console.log('Seed the octofit_db database with test data');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.insertMany([
    { name: 'Ava Chen', email: 'ava@example.com', fitnessGoal: 'Build endurance', level: 'Intermediate' },
    { name: 'Mateo Ruiz', email: 'mateo@example.com', fitnessGoal: 'Lose weight', level: 'Beginner' },
    { name: 'Jules Okafor', email: 'jules@example.com', fitnessGoal: 'Gain strength', level: 'Advanced' }
  ]);

  const teams = await Team.insertMany([
    { name: 'Trail Blazers', sport: 'Running', members: [users[0].id, users[1].id] },
    { name: 'Power Squad', sport: 'CrossFit', members: [users[2].id] }
  ]);

  const activities = await Activity.insertMany([
    { userId: users[0].id, type: 'Run', durationMinutes: 35, calories: 320, date: new Date('2026-06-20') },
    { userId: users[1].id, type: 'Cycling', durationMinutes: 45, calories: 280, date: new Date('2026-06-21') },
    { userId: users[2].id, type: 'Strength', durationMinutes: 60, calories: 450, date: new Date('2026-06-22') }
  ]);

  await Leaderboard.insertMany([
    { userId: users[0].id, score: 980, rank: 1 },
    { userId: users[2].id, score: 945, rank: 2 },
    { userId: users[1].id, score: 900, rank: 3 }
  ]);

  await Workout.insertMany([
    { title: 'HIIT Intervals', focus: 'Cardio', durationMinutes: 25, difficulty: 'Intermediate' },
    { title: 'Core Burn', focus: 'Abs', durationMinutes: 20, difficulty: 'Beginner' },
    { title: 'Upper Body Strength', focus: 'Strength', durationMinutes: 40, difficulty: 'Advanced' }
  ]);

  console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, leaderboard entries, and workouts.`);
  await disconnectFromDatabase();
};

seedDatabase().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
