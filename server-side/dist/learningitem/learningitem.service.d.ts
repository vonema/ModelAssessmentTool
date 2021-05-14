import { Model } from 'mongoose';
import { LearningItem } from './interfaces/learningitem.interface';
import { CreateLearningItemDTO } from './dto/create-learningitem.dto';
export declare class LearningItemService {
    private readonly learningItemModel;
    constructor(learningItemModel: Model<LearningItem>);
    getAllLearningItems(): Promise<LearningItem[]>;
    getLearningItem(learningItemID: any): Promise<LearningItem>;
    addLearningItem(createLearningItemDTO: CreateLearningItemDTO): Promise<LearningItem>;
    updateLearningItem(learningItemID: any, createLearningItemDTO: CreateLearningItemDTO): Promise<LearningItem>;
    deleteLearningItem(learningItemID: any): Promise<any>;
}
