import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { LearningOutcomeService } from './learningoutcome.service';
import { CreateLearningOutcomeDTO } from './dto/create-learningoutcome.dto';

@Controller('learningoutcome')
export class LearningOutcomeController {
    constructor(private LearningOutcomeService: LearningOutcomeService) { }

    // Retrieve LearningOutcome list
    @Get('learningoutcomes')
    async getAllLearningOutcomes(@Res() res) {
        const learningOutcomes = await this.LearningOutcomeService.getAllLearningOutcomes();
        return res.status(HttpStatus.OK).json(learningOutcomes);
    }

    // Fetch a particular LearningOutcome using ID
    @Get('learningoutcome/:learningOutcomeID')
    async getLearningOutcome(@Res() res, @Param('learningOutcomeID') learningOutcomeID) {
        const learningOutcome = await this.LearningOutcomeService.getLearningOutcome(learningOutcomeID);
        if (!learningOutcome) throw new NotFoundException('LearningOutcome does not exist!');
        return res.status(HttpStatus.OK).json(learningOutcome);

    }

    // add a LearningOutcome
    @Post('/create')
    async addLearningOutcome(@Res() res, @Body() CreateLearningOutcomeDTO: CreateLearningOutcomeDTO) {
        const learningOutcome = await this.LearningOutcomeService.addLearningOutcome(CreateLearningOutcomeDTO);
        return res.status(HttpStatus.OK).json({
            message: "LearningOutcome has been created successfully",
            learningOutcome
        })
    }

    // Update a LearningOutcome's details
    @Put('/update')
    async updateLearningOutcome(@Res() res, @Query('learningOutcomeID') learningOutcomeID, @Body() CreateLearningOutcomeDTO: CreateLearningOutcomeDTO) {
        const learningOutcome = await this.LearningOutcomeService.updateLearningOutcome(learningOutcomeID, CreateLearningOutcomeDTO);
        if (!learningOutcome) throw new NotFoundException('LearningOutcome does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'LearningOutcome has been successfully updated',
            learningOutcome
        });
    }

    // Delete a LearningOutcome
    @Delete('/delete')
    async deleteLearningOutcome(@Res() res, @Query('learningOutcomeID') learningOutcomeID) {
        const learningOutcome = await this.LearningOutcomeService.deleteLearningOutcome(learningOutcomeID);
        if (!learningOutcome) throw new NotFoundException('LearningOutcome does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'LearningOutcome has been deleted',
            learningOutcome
        })
    }
}
