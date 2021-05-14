import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { DomainConceptService } from './domainconcept.service';
import { CreateDomainConceptDTO } from './dto/create-domainconcept.dto';

@Controller('domainconcept')
export class DomainConceptController {
    constructor(private DomainConceptService: DomainConceptService) { }

    // Retrieve DomainConcept list
    @Get('domainconcepts')
    async getAllDomainConcepts(@Res() res) {
        const domainConcept = await this.DomainConceptService.getAllDomainConcepts();
        return res.status(HttpStatus.OK).json(domainConcept);
    }

    // Fetch a particular DomainConcept using ID
    @Get('domainconcept/:domainConceptID')
    async getDomainConcept(@Res() res, @Param('domainConceptID') domainConceptID) {
        const domainConcept = await this.DomainConceptService.getDomainConcept(domainConceptID);
        if (!domainConcept) throw new NotFoundException('DomainConcept does not exist!');
        return res.status(HttpStatus.OK).json(domainConcept);

    }

    // add a DomainConcept
    @Post('/create')
    async addDomainConcept(@Res() res, @Body() CreateDomainConceptDTO: CreateDomainConceptDTO) {
        const domainConcept = await this.DomainConceptService.addDomainConcept(CreateDomainConceptDTO);
        return res.status(HttpStatus.OK).json({
            message: "DomainConcept has been created successfully",
            domainConcept
        })
    }

    // Update a DomainConcept's details
    @Put('/update')
    async updateDomainConcept(@Res() res, @Query('domainConceptID') domainConceptID, @Body() CreateDomainConceptDTO: CreateDomainConceptDTO) {
        const domainConcept = await this.DomainConceptService.updateDomainConcept(domainConceptID, CreateDomainConceptDTO);
        if (!domainConcept) throw new NotFoundException('DomainConcept does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'DomainConcept has been successfully updated',
            domainConcept
        });
    }

    // Delete a DomainConcept
    @Delete('/delete')
    async deleteDomainConcept(@Res() res, @Query('domainConceptID') domainConceptID) {
        const domainConcept = await this.DomainConceptService.deleteDomainConcept(domainConceptID);
        if (!domainConcept) throw new NotFoundException('DomainConcept does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'DomainConcept has been deleted',
            domainConcept
        })
    }
}
