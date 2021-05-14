import * as mongoose from 'mongoose';

export const ContentSectionSchema = new mongoose.Schema({
    name: String,
    DomainConcepts: [String],
    created_at: { type: Date, default: Date.now }
})