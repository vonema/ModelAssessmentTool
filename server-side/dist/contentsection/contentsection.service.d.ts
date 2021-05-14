import { Model } from 'mongoose';
import { ContentSection } from './interfaces/contentsection.interface';
import { CreateContentSectionDTO } from './dto/create-contentsection.dto';
export declare class ContentSectionService {
    private readonly contentSectionModel;
    constructor(contentSectionModel: Model<ContentSection>);
    getAllContentSections(): Promise<ContentSection[]>;
    getContentSection(contentSectionID: any): Promise<ContentSection>;
    addContentSection(createContentSectionDTO: CreateContentSectionDTO): Promise<ContentSection>;
    updateContentSection(contentSectionID: any, createContentSectionDTO: CreateContentSectionDTO): Promise<ContentSection>;
    deleteContentSection(contentSectionID: any): Promise<any>;
}
