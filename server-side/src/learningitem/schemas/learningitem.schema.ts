import * as mongoose from 'mongoose';

export const LearningItemSchema = new mongoose.Schema({
    name: String,
    url: String,
    ContentSections: [String],
    DomainConcepts: [String],
    isExerciseItem: Boolean,
    difficulty: String,
    created_at: { type: Date, default: Date.now }
})