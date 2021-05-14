import { Document } from 'mongoose';
export interface LearningOutcome extends Document {
    readonly name: string;
    readonly BloomLevelCognitive: string;
    readonly BloomLevelKnowledge: string;
    readonly ContentSections: [string];
    readonly LearningItems: [string];
    readonly DomainConcepts: [string];
    readonly created_at: Date;
}
