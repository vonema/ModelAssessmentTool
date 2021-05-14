"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ContentSectionSchema = new mongoose.Schema({
    name: String,
    DomainConcepts: [String],
    created_at: { type: Date, default: Date.now }
});
//# sourceMappingURL=contentsection.schema.js.map