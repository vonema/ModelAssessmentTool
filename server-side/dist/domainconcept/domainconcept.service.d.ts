import { Model } from 'mongoose';
import { DomainConcept } from './interfaces/domainconcept.interface';
import { CreateDomainConceptDTO } from './dto/create-domainconcept.dto';
export declare class DomainConceptService {
    private readonly domainConceptModel;
    constructor(domainConceptModel: Model<DomainConcept>);
    getAllDomainConcepts(): Promise<DomainConcept[]>;
    getDomainConcept(domainConceptID: any): Promise<DomainConcept>;
    addDomainConcept(createDomainConceptDTO: CreateDomainConceptDTO): Promise<DomainConcept>;
    updateDomainConcept(domainConceptID: any, createDomainConceptDTO: CreateDomainConceptDTO): Promise<DomainConcept>;
    deleteDomainConcept(domainConceptID: any): Promise<any>;
}
