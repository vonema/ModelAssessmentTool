import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { ErrorTypeService } from './errortype.service';
import { CreateErrorTypeDTO } from './dto/create-errortype.dto';

@Controller('errortype')
export class ErrorTypeController {
    constructor(private errorTypeService: ErrorTypeService) { }

    // Retrieve ErrorTypes list
    @Get('errortypes')
    async getAllErrorTypes(@Res() res) {
        const errorTypes = await this.errorTypeService.getAllErrorTypes();
        return res.status(HttpStatus.OK).json(errorTypes);
    }

    // Fetch a particular ErrorType using ID
    @Get('errortype/:errorTypeID')
    async getErrorType(@Res() res, @Param('errorTypeID') errorTypeID) {
        const errorType = await this.errorTypeService.getErrorType(errorTypeID);
        if (!errorType) throw new NotFoundException('ErrorType does not exist!');
        return res.status(HttpStatus.OK).json(errorType);

    }

    // add an ErrorType
    @Post('/create')
    async addErrorType(@Res() res, @Body() createErrorTypeDTO: CreateErrorTypeDTO) {
        const errorType = await this.errorTypeService.addErrorType(createErrorTypeDTO);
        return res.status(HttpStatus.OK).json({
            message: "ErrorType has been created successfully",
            errorType
        })
    }

    // Update an ErrorType's details
    @Put('/update')
    async updateErrorType(@Res() res, @Query('errorTypeID') errorTypeID, @Body() createErrorTypeDTO: CreateErrorTypeDTO) {
        const errorType = await this.errorTypeService.updateErrorType(errorTypeID, createErrorTypeDTO);
        if (!errorType) throw new NotFoundException('ErrorType does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'ErrorType has been successfully updated',
            errorType
        });
    }

    // Delete an ErrorType
    @Delete('/delete')
    async deleteErrorType(@Res() res, @Query('errorTypeID') errorTypeID) {
        const errorType = await this.errorTypeService.deleteErrorType(errorTypeID);
        if (!errorType) throw new NotFoundException('ErrorType does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'ErrorType has been deleted',
            errorType
        })
    }
}
