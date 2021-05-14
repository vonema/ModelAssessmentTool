import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LearningItem } from './interfaces/learningitem.interface';
import { CreateLearningItemDTO } from './dto/create-learningitem.dto';


@Injectable()
export class LearningItemService {
    constructor(@InjectModel('LearningItem') private readonly learningItemModel: Model<LearningItem>) { }

    // fetch all learningitems
    async getAllLearningItems(): Promise<LearningItem[]> {
        const learningitems = await this.learningItemModel.find().exec();
        return learningitems;
    }

    // Get a single learningitem
    async getLearningItem(learningItemID): Promise<LearningItem> {
        const learningitem = await this.learningItemModel.findById(learningItemID).exec();
        return learningitem;
    }

    // post a single learningitem
    async addLearningItem(createLearningItemDTO: CreateLearningItemDTO): Promise<LearningItem> {
        const newLearningItem = await this.learningItemModel(createLearningItemDTO);
        return newLearningItem.save();
    }

    // Edit learningitem details
    async updateLearningItem(learningItemID, createLearningItemDTO: CreateLearningItemDTO): Promise<LearningItem> {
        const updatedLearningItem = await this.learningItemModel
            .findByIdAndUpdate(learningItemID, createLearningItemDTO, { new: true });
        return updatedLearningItem;
    }

    // Delete a learningitem
    async deleteLearningItem(learningItemID): Promise<any> {
        const deletedLearningItem = await this.learningItemModel.findByIdAndRemove(learningItemID);
        return deletedLearningItem;
    }

}
