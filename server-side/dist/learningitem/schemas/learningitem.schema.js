"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.LearningItemSchema = new mongoose.Schema({
    name: String,
    url: String,
    ContentSections: [String],
    DomainConcepts: [String],
    isExerciseItem: Boolean,
    difficulty: String,
    created_at: { type: Date, default: Date.now }
});
//# sourceMappingURL=learningitem.schema.js.map