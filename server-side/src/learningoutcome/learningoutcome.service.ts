import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LearningOutcome } from './interfaces/learningoutcome.interface';
import { CreateLearningOutcomeDTO } from './dto/create-learningoutcome.dto';


@Injectable()
export class LearningOutcomeService {
    constructor(@InjectModel('LearningOutcome') private readonly learningOutcomeModel: Model<LearningOutcome>) { }

    // fetch all learningoutcomes
    async getAllLearningOutcomes(): Promise<LearningOutcome[]> {
        const learningoutcomes = await this.learningOutcomeModel.find().exec();
        return learningoutcomes;
    }

    // Get a single learningoutcome
    async getLearningOutcome(learningOutcomeID): Promise<LearningOutcome> {
        const learningoutcome = await this.learningOutcomeModel.findById(learningOutcomeID).exec();
        return learningoutcome;
    }

    // post a single learningoutcome
    async addLearningOutcome(createLearningOutcomeDTO: CreateLearningOutcomeDTO): Promise<LearningOutcome> {
        const newLearningOutcome = await this.learningOutcomeModel(createLearningOutcomeDTO);
        return newLearningOutcome.save();
    }

    // Edit learningoutcome details
    async updateLearningOutcome(learningOutcomeID, createLearningOutcomeDTO: CreateLearningOutcomeDTO): Promise<LearningOutcome> {
        const updatedLearningOutcome = await this.learningOutcomeModel
            .findByIdAndUpdate(learningOutcomeID, createLearningOutcomeDTO, { new: true });
        return updatedLearningOutcome;
    }

    // Delete a learningoutcome
    async deleteLearningOutcome(learningOutcomeID): Promise<any> {
        const deletedLearningOutcome = await this.learningOutcomeModel.findByIdAndRemove(learningOutcomeID);
        return deletedLearningOutcome;
    }

}
