"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.LearningOutcomeSchema = new mongoose.Schema({
    name: String,
    BloomLevelCognitive: String,
    BloomLevelKnowledge: String,
    ContentSections: [String],
    LearningItems: [String],
    DomainConcepts: [String],
    created_at: { type: Date, default: Date.now }
});
//# sourceMappingURL=learningoutcome.schema.js.map