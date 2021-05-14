import { ErrorTypeService } from './errortype.service';
import { CreateErrorTypeDTO } from './dto/create-errortype.dto';
export declare class ErrorTypeController {
    private errorTypeService;
    constructor(errorTypeService: ErrorTypeService);
    getAllErrorTypes(res: any): Promise<any>;
    getErrorType(res: any, errorTypeID: any): Promise<any>;
    addErrorType(res: any, createErrorTypeDTO: CreateErrorTypeDTO): Promise<any>;
    updateErrorType(res: any, errorTypeID: any, createErrorTypeDTO: CreateErrorTypeDTO): Promise<any>;
    deleteErrorType(res: any, errorTypeID: any): Promise<any>;
}
