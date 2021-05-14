import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DomainConcept } from './interfaces/domainconcept.interface';
import { CreateDomainConceptDTO } from './dto/create-domainconcept.dto';


@Injectable()
export class DomainConceptService {
    constructor(@InjectModel('DomainConcept') private readonly domainConceptModel: Model<DomainConcept>) { }

    // fetch all domainconcepts
    async getAllDomainConcepts(): Promise<DomainConcept[]> {
        const domainconcepts = await this.domainConceptModel.find().exec();
        return domainconcepts;
    }

    // Get a single domainconcept
    async getDomainConcept(domainConceptID): Promise<DomainConcept> {
        const domainconcept = await this.domainConceptModel.findById(domainConceptID).exec();
        return domainconcept;
    }

    // post a single domainconcept
    async addDomainConcept(createDomainConceptDTO: CreateDomainConceptDTO): Promise<DomainConcept> {
        const newDomainConcept = await this.domainConceptModel(createDomainConceptDTO);
        return newDomainConcept.save();
    }

    // Edit domainconcept details
    async updateDomainConcept(domainConceptID, createDomainConceptDTO: CreateDomainConceptDTO): Promise<DomainConcept> {
        const updatedDomainConcept = await this.domainConceptModel
            .findByIdAndUpdate(domainConceptID, createDomainConceptDTO, { new: true });
        return updatedDomainConcept;
    }

    // Delete a domainconcept
    async deleteDomainConcept(domainConceptID): Promise<any> {
        const deletedDomainConcept = await this.domainConceptModel.findByIdAndRemove(domainConceptID);
        return deletedDomainConcept;
    }

}
