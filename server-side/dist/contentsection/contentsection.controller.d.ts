import { ContentSectionService } from './contentsection.service';
import { CreateContentSectionDTO } from './dto/create-contentsection.dto';
export declare class ContentSectionController {
    private contentSectionService;
    constructor(contentSectionService: ContentSectionService);
    getAllContentSections(res: any): Promise<any>;
    getContentSection(res: any, contentSectionID: any): Promise<any>;
    addContentSection(res: any, createContentSectionDTO: CreateContentSectionDTO): Promise<any>;
    updateContentSection(res: any, contentSectionID: any, createContentSectionDTO: CreateContentSectionDTO): Promise<any>;
    deleteContentSection(res: any, contentSectionID: any): Promise<any>;
}
