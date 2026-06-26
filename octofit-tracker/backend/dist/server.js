"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_js_1 = __importDefault(require("./routes.js"));
const database_js_1 = require("./config/database.js");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return 'http://localhost:8000';
};
app.use(express_1.default.json());
app.use(routes_js_1.default);
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
(0, database_js_1.connectToDatabase)()
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
