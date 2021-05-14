import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { LearningItemService } from './learningitem.service';
import { CreateLearningItemDTO } from './dto/create-learningitem.dto';

@Controller('learningitem')
export class LearningItemController {
    constructor(private LearningItemService: LearningItemService) { }

    // Retrieve LearningItem list
    @Get('learningitems')
    async getAllLearningItems(@Res() res) {
        const learningItem = await this.LearningItemService.getAllLearningItems();
        return res.status(HttpStatus.OK).json(learningItem);
    }

    // Fetch a particular LearningItem using ID
    @Get('learningitem/:learningItemID')
    async getLearningItem(@Res() res, @Param('learningItemID') learningItemID) {
        const learningItem = await this.LearningItemService.getLearningItem(learningItemID);
        if (!learningItem) throw new NotFoundException('LearningItem does not exist!');
        return res.status(HttpStatus.OK).json(learningItem);

    }

    // add a LearningItem
    @Post('/create')
    async addLearningItem(@Res() res, @Body() CreateLearningItemDTO: CreateLearningItemDTO) {
        const learningItem = await this.LearningItemService.addLearningItem(CreateLearningItemDTO);
        return res.status(HttpStatus.OK).json({
            message: "LearningItem has been created successfully",
            learningItem
        })
    }

    // Update a LearningItem's details
    @Put('/update')
    async updateLearningItem(@Res() res, @Query('learningItemID') learningItemID, @Body() CreateLearningItemDTO: CreateLearningItemDTO) {
        const learningItem = await this.LearningItemService.updateLearningItem(learningItemID, CreateLearningItemDTO);
        if (!learningItem) throw new NotFoundException('LearningItem does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'LearningItem has been successfully updated',
            learningItem
        });
    }

    // Delete a LearningItem
    @Delete('/delete')
    async deleteLearningItem(@Res() res, @Query('learningItemID') learningItemID) {
        const learningItem = await this.LearningItemService.deleteLearningItem(learningItemID);
        if (!learningItem) throw new NotFoundException('LearningItem does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'LearningItem has been deleted',
            learningItem
        })
    }
}
