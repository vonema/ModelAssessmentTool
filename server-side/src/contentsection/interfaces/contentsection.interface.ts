import { Document } from 'mongoose';

export interface ContentSection extends Document {
    readonly name: string;
    readonly DomainConcepts: [string];
    readonly created_at: Date;
}