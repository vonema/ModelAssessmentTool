import { Document } from 'mongoose';
export interface LearningItem extends Document {
    readonly name: String;
    readonly url: String;
    readonly ContentSections: [String];
    readonly DomainConcepts: [String];
    readonly isExerciseItem: Boolean;
    readonly difficulty: String;
    readonly created_at: Date;
}
