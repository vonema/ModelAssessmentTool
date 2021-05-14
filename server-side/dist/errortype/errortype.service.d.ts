import { Model } from 'mongoose';
import { ErrorType } from './interfaces/errortype.interface';
import { CreateErrorTypeDTO } from './dto/create-errortype.dto';
export declare class ErrorTypeService {
    private readonly errorTypeModel;
    constructor(errorTypeModel: Model<ErrorType>);
    getAllErrorTypes(): Promise<ErrorType[]>;
    getErrorType(errorTypeID: any): Promise<ErrorType>;
    addErrorType(createErrorTypeDTO: CreateErrorTypeDTO): Promise<ErrorType>;
    updateErrorType(errorTypeID: any, createErrorTypeDTO: CreateErrorTypeDTO): Promise<ErrorType>;
    deleteErrorType(errorTypeID: any): Promise<any>;
}
