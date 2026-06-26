"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const user_js_1 = require("../models/user.js");
const team_js_1 = require("../models/team.js");
const activity_js_1 = require("../models/activity.js");
const leaderboard_js_1 = require("../models/leaderboard.js");
const workout_js_1 = require("../models/workout.js");
const database_js_1 = require("../config/database.js");
// Seed the octofit_db database with test data
const seedDatabase = async () => {
    await (0, database_js_1.connectToDatabase)();
    console.log('Seed the octofit_db database with test data');
    await Promise.all([
        user_js_1.User.deleteMany({}),
        team_js_1.Team.deleteMany({}),
        activity_js_1.Activity.deleteMany({}),
        leaderboard_js_1.Leaderboard.deleteMany({}),
        workout_js_1.Workout.deleteMany({})
    ]);
    const users = await user_js_1.User.insertMany([
        { name: 'Ava Chen', email: 'ava@example.com', fitnessGoal: 'Build endurance', level: 'Intermediate' },
        { name: 'Mateo Ruiz', email: 'mateo@example.com', fitnessGoal: 'Lose weight', level: 'Beginner' },
        { name: 'Jules Okafor', email: 'jules@example.com', fitnessGoal: 'Gain strength', level: 'Advanced' }
    ]);
    const teams = await team_js_1.Team.insertMany([
        { name: 'Trail Blazers', sport: 'Running', members: [users[0].id, users[1].id] },
        { name: 'Power Squad', sport: 'CrossFit', members: [users[2].id] }
    ]);
    const activities = await activity_js_1.Activity.insertMany([
        { userId: users[0].id, type: 'Run', durationMinutes: 35, calories: 320, date: new Date('2026-06-20') },
        { userId: users[1].id, type: 'Cycling', durationMinutes: 45, calories: 280, date: new Date('2026-06-21') },
        { userId: users[2].id, type: 'Strength', durationMinutes: 60, calories: 450, date: new Date('2026-06-22') }
    ]);
    await leaderboard_js_1.Leaderboard.insertMany([
        { userId: users[0].id, score: 980, rank: 1 },
        { userId: users[2].id, score: 945, rank: 2 },
        { userId: users[1].id, score: 900, rank: 3 }
    ]);
    await workout_js_1.Workout.insertMany([
        { title: 'HIIT Intervals', focus: 'Cardio', durationMinutes: 25, difficulty: 'Intermediate' },
        { title: 'Core Burn', focus: 'Abs', durationMinutes: 20, difficulty: 'Beginner' },
        { title: 'Upper Body Strength', focus: 'Strength', durationMinutes: 40, difficulty: 'Advanced' }
    ]);
    console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, leaderboard entries, and workouts.`);
    await (0, database_js_1.disconnectFromDatabase)();
};
exports.seedDatabase = seedDatabase;
(0, exports.seedDatabase)().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
