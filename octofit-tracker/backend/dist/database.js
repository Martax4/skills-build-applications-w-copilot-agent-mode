"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromDatabase = exports.connectToDatabase = void 0;
var database_js_1 = require("./config/database.js");
Object.defineProperty(exports, "connectToDatabase", { enumerable: true, get: function () { return database_js_1.connectToDatabase; } });
Object.defineProperty(exports, "disconnectFromDatabase", { enumerable: true, get: function () { return database_js_1.disconnectFromDatabase; } });
