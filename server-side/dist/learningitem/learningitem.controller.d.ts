import { LearningItemService } from './learningitem.service';
import { CreateLearningItemDTO } from './dto/create-learningitem.dto';
export declare class LearningItemController {
    private LearningItemService;
    constructor(LearningItemService: LearningItemService);
    getAllLearningItems(res: any): Promise<any>;
    getLearningItem(res: any, learningItemID: any): Promise<any>;
    addLearningItem(res: any, CreateLearningItemDTO: CreateLearningItemDTO): Promise<any>;
    updateLearningItem(res: any, learningItemID: any, CreateLearningItemDTO: CreateLearningItemDTO): Promise<any>;
    deleteLearningItem(res: any, learningItemID: any): Promise<any>;
}
