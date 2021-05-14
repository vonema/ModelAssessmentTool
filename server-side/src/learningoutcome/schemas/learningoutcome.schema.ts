import * as mongoose from 'mongoose';

export const LearningOutcomeSchema = new mongoose.Schema({
    name: String,
    BloomLevelCognitive: String,
    BloomLevelKnowledge: String,
    ContentSections: [String],
    LearningItems: [String],
    DomainConcepts: [String],
    created_at: { type: Date, default: Date.now }
})