import * as mongoose from 'mongoose';

export const DomainConceptSchema = new mongoose.Schema({
    name: String,
    created_at: { type: Date, default: Date.now }
})