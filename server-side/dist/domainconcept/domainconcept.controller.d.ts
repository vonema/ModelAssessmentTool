import { DomainConceptService } from './domainconcept.service';
import { CreateDomainConceptDTO } from './dto/create-domainconcept.dto';
export declare class DomainConceptController {
    private DomainConceptService;
    constructor(DomainConceptService: DomainConceptService);
    getAllDomainConcepts(res: any): Promise<any>;
    getDomainConcept(res: any, domainConceptID: any): Promise<any>;
    addDomainConcept(res: any, CreateDomainConceptDTO: CreateDomainConceptDTO): Promise<any>;
    updateDomainConcept(res: any, domainConceptID: any, CreateDomainConceptDTO: CreateDomainConceptDTO): Promise<any>;
    deleteDomainConcept(res: any, domainConceptID: any): Promise<any>;
}
