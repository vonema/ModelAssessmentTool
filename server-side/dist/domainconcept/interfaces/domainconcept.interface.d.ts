import { Document } from 'mongoose';
export interface DomainConcept extends Document {
    readonly name: string;
    readonly created_at: Date;
}
