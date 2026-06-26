"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromDatabase = exports.connectToDatabase = exports.mongoUri = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const connectToDatabase = async () => {
    if (mongoose_1.default.connection.readyState === 1) {
        return mongoose_1.default;
    }
    await mongoose_1.default.connect(exports.mongoUri);
    console.log(`Connected to MongoDB: ${exports.mongoUri}`);
    return mongoose_1.default;
};
exports.connectToDatabase = connectToDatabase;
const disconnectFromDatabase = async () => {
    if (mongoose_1.default.connection.readyState !== 0) {
        await mongoose_1.default.disconnect();
    }
};
exports.disconnectFromDatabase = disconnectFromDatabase;
