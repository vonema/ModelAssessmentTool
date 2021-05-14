import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorType } from './interfaces/errortype.interface';
import { CreateErrorTypeDTO } from './dto/create-errortype.dto';


@Injectable()
export class ErrorTypeService {
    constructor(@InjectModel('ErrorType') private readonly errorTypeModel: Model<ErrorType>) { }

    // fetch all errortypes
    async getAllErrorTypes(): Promise<ErrorType[]> {
        const errortypes = await this.errorTypeModel.find().exec();
        return errortypes;
    }

    // Get a single errortype
    async getErrorType(errorTypeID): Promise<ErrorType> {
        const errortype = await this.errorTypeModel.findById(errorTypeID).exec();
        return errortype;
    }

    // post a single errortype
    async addErrorType(createErrorTypeDTO: CreateErrorTypeDTO): Promise<ErrorType> {
        const newErrorType = await this.errorTypeModel(createErrorTypeDTO);
        return newErrorType.save();
    }

    // Edit errortype details
    async updateErrorType(errorTypeID, createErrorTypeDTO: CreateErrorTypeDTO): Promise<ErrorType> {
        const updatedErrorType = await this.errorTypeModel
            .findByIdAndUpdate(errorTypeID, createErrorTypeDTO, { new: true });
        return updatedErrorType;
    }

    // Delete an errortype
    async deleteErrorType(errorTypeID): Promise<any> {
        const deletedErrorType = await this.errorTypeModel.findByIdAndRemove(errorTypeID);
        return deletedErrorType;
    }

}
