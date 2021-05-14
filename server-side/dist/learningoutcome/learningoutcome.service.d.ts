import { Model } from 'mongoose';
import { LearningOutcome } from './interfaces/learningoutcome.interface';
import { CreateLearningOutcomeDTO } from './dto/create-learningoutcome.dto';
export declare class LearningOutcomeService {
    private readonly learningOutcomeModel;
    constructor(learningOutcomeModel: Model<LearningOutcome>);
    getAllLearningOutcomes(): Promise<LearningOutcome[]>;
    getLearningOutcome(learningOutcomeID: any): Promise<LearningOutcome>;
    addLearningOutcome(createLearningOutcomeDTO: CreateLearningOutcomeDTO): Promise<LearningOutcome>;
    updateLearningOutcome(learningOutcomeID: any, createLearningOutcomeDTO: CreateLearningOutcomeDTO): Promise<LearningOutcome>;
    deleteLearningOutcome(learningOutcomeID: any): Promise<any>;
}
