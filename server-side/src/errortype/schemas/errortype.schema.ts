import * as mongoose from 'mongoose';

export const ErrorTypeSchema = new mongoose.Schema({
    name: String,
    weight: String,
    description: String,
    learningOutcome: String,
    created_at: { type: Date, default: Date.now }
})