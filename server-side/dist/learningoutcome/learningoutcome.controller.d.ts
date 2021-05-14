import { LearningOutcomeService } from './learningoutcome.service';
import { CreateLearningOutcomeDTO } from './dto/create-learningoutcome.dto';
export declare class LearningOutcomeController {
    private LearningOutcomeService;
    constructor(LearningOutcomeService: LearningOutcomeService);
    getAllLearningOutcomes(res: any): Promise<any>;
    getLearningOutcome(res: any, learningOutcomeID: any): Promise<any>;
    addLearningOutcome(res: any, CreateLearningOutcomeDTO: CreateLearningOutcomeDTO): Promise<any>;
    updateLearningOutcome(res: any, learningOutcomeID: any, CreateLearningOutcomeDTO: CreateLearningOutcomeDTO): Promise<any>;
    deleteLearningOutcome(res: any, learningOutcomeID: any): Promise<any>;
}
