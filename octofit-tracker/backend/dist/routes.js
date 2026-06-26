"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_js_1 = require("./config.js");
const user_js_1 = require("./models/user.js");
const team_js_1 = require("./models/team.js");
const activity_js_1 = require("./models/activity.js");
const leaderboard_js_1 = require("./models/leaderboard.js");
const workout_js_1 = require("./models/workout.js");
const router = (0, express_1.Router)();
const createCollectionRoute = (resource, model) => {
    router.get(`/api/${resource}/`, async (_req, res) => {
        try {
            const documents = await model.find({});
            res.json({
                resource,
                count: documents.length,
                data: documents,
                apiBaseUrl: (0, config_js_1.getApiBaseUrl)()
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    });
};
createCollectionRoute('users', user_js_1.User);
createCollectionRoute('teams', team_js_1.Team);
createCollectionRoute('activities', activity_js_1.Activity);
createCollectionRoute('leaderboard', leaderboard_js_1.Leaderboard);
createCollectionRoute('workouts', workout_js_1.Workout);
exports.default = router;
