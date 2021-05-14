import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { ContentSectionService } from './contentsection.service';
import { CreateContentSectionDTO } from './dto/create-contentsection.dto';

@Controller('contentsection')
export class ContentSectionController {
    constructor(private contentSectionService: ContentSectionService) { }

    // Retrieve ContentSections list
    @Get('contentsections')
    async getAllContentSections(@Res() res) {
        const contentSections = await this.contentSectionService.getAllContentSections();
        return res.status(HttpStatus.OK).json(contentSections);
    }

    // Fetch a particular ContentSection using ID
    @Get('contentsection/:contentSectionID')
    async getContentSection(@Res() res, @Param('contentSectionID') contentSectionID) {
        const contentSection = await this.contentSectionService.getContentSection(contentSectionID);
        if (!contentSection) throw new NotFoundException('ContentSection does not exist!');
        return res.status(HttpStatus.OK).json(contentSection);

    }

    // add an ContentSection
    @Post('/create')
    async addContentSection(@Res() res, @Body() createContentSectionDTO: CreateContentSectionDTO) {
        const contentSection = await this.contentSectionService.addContentSection(createContentSectionDTO);
        return res.status(HttpStatus.OK).json({
            message: "ContentSection has been created successfully",
            contentSection
        })
    }

    // Update an ContentSection's details
    @Put('/update')
    async updateContentSection(@Res() res, @Query('contentSectionID') contentSectionID, @Body() createContentSectionDTO: CreateContentSectionDTO) {
        const contentSection = await this.contentSectionService.updateContentSection(contentSectionID, createContentSectionDTO);
        if (!contentSection) throw new NotFoundException('ContentSection does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'ContentSection has been successfully updated',
            contentSection
        });
    }

    // Delete an ContentSection
    @Delete('/delete')
    async deleteContentSection(@Res() res, @Query('contentSectionID') contentSectionID) {
        const contentSection = await this.contentSectionService.deleteContentSection(contentSectionID);
        if (!contentSection) throw new NotFoundException('ContentSection does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'ContentSection has been deleted',
            contentSection
        })
    }
}
