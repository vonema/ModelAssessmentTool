"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const errortype_service_1 = require("./errortype.service");
const create_errortype_dto_1 = require("./dto/create-errortype.dto");
let ErrorTypeController = class ErrorTypeController {
    constructor(errorTypeService) {
        this.errorTypeService = errorTypeService;
    }
    getAllErrorTypes(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorTypes = yield this.errorTypeService.getAllErrorTypes();
            return res.status(common_1.HttpStatus.OK).json(errorTypes);
        });
    }
    getErrorType(res, errorTypeID) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorType = yield this.errorTypeService.getErrorType(errorTypeID);
            if (!errorType)
                throw new common_1.NotFoundException('ErrorType does not exist!');
            return res.status(common_1.HttpStatus.OK).json(errorType);
        });
    }
    addErrorType(res, createErrorTypeDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorType = yield this.errorTypeService.addErrorType(createErrorTypeDTO);
            return res.status(common_1.HttpStatus.OK).json({
                message: "ErrorType has been created successfully",
                errorType
            });
        });
    }
    updateErrorType(res, errorTypeID, createErrorTypeDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorType = yield this.errorTypeService.updateErrorType(errorTypeID, createErrorTypeDTO);
            if (!errorType)
                throw new common_1.NotFoundException('ErrorType does not exist!');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'ErrorType has been successfully updated',
                errorType
            });
        });
    }
    deleteErrorType(res, errorTypeID) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorType = yield this.errorTypeService.deleteErrorType(errorTypeID);
            if (!errorType)
                throw new common_1.NotFoundException('ErrorType does not exist');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'ErrorType has been deleted',
                errorType
            });
        });
    }
};
__decorate([
    common_1.Get('errortypes'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ErrorTypeController.prototype, "getAllErrorTypes", null);
__decorate([
    common_1.Get('errortype/:errorTypeID'),
    __param(0, common_1.Res()), __param(1, common_1.Param('errorTypeID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ErrorTypeController.prototype, "getErrorType", null);
__decorate([
    common_1.Post('/create'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_errortype_dto_1.CreateErrorTypeDTO]),
    __metadata("design:returntype", Promise)
], ErrorTypeController.prototype, "addErrorType", null);
__decorate([
    common_1.Put('/update'),
    __param(0, common_1.Res()), __param(1, common_1.Query('errorTypeID')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_errortype_dto_1.CreateErrorTypeDTO]),
    __metadata("design:returntype", Promise)
], ErrorTypeController.prototype, "updateErrorType", null);
__decorate([
    common_1.Delete('/delete'),
    __param(0, common_1.Res()), __param(1, common_1.Query('errorTypeID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ErrorTypeController.prototype, "deleteErrorType", null);
ErrorTypeController = __decorate([
    common_1.Controller('errortype'),
    __metadata("design:paramtypes", [errortype_service_1.ErrorTypeService])
], ErrorTypeController);
exports.ErrorTypeController = ErrorTypeController;
//# sourceMappingURL=errortype.controller.js.map