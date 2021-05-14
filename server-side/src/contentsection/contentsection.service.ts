import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ContentSection } from './interfaces/contentsection.interface';
import { CreateContentSectionDTO } from './dto/create-contentsection.dto';


@Injectable()
export class ContentSectionService {
    constructor(@InjectModel('ContentSection') private readonly contentSectionModel: Model<ContentSection>) { }

    // fetch all contentsections
    async getAllContentSections(): Promise<ContentSection[]> {
        const contentsections = await this.contentSectionModel.find().exec();
        return contentsections;
    }

    // Get a single contentsection
    async getContentSection(contentSectionID): Promise<ContentSection> {
        const contentsection = await this.contentSectionModel.findById(contentSectionID).exec();
        return contentsection;
    }

    // post a single contentsection
    async addContentSection(createContentSectionDTO: CreateContentSectionDTO): Promise<ContentSection> {
        const newContentSection = await this.contentSectionModel(createContentSectionDTO);
        return newContentSection.save();
    }

    // Edit contentsection details
    async updateContentSection(contentSectionID, createContentSectionDTO: CreateContentSectionDTO): Promise<ContentSection> {
        const updatedContentSection = await this.contentSectionModel
            .findByIdAndUpdate(contentSectionID, createContentSectionDTO, { new: true });
        return updatedContentSection;
    }

    // Delete an contentsection
    async deleteContentSection(contentSectionID): Promise<any> {
        const deletedContentSection = await this.contentSectionModel.findByIdAndRemove(contentSectionID);
        return deletedContentSection;
    }

}
