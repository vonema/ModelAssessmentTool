"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ErrorTypeSchema = new mongoose.Schema({
    name: String,
    weight: String,
    description: String,
    learningOutcome: String,
    created_at: { type: Date, default: Date.now }
});
//# sourceMappingURL=errortype.schema.js.map