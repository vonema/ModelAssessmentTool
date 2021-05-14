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
const learningoutcome_service_1 = require("./learningoutcome.service");
const create_learningoutcome_dto_1 = require("./dto/create-learningoutcome.dto");
let LearningOutcomeController = class LearningOutcomeController {
    constructor(LearningOutcomeService) {
        this.LearningOutcomeService = LearningOutcomeService;
    }
    getAllLearningOutcomes(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const learningOutcomes = yield this.LearningOutcomeService.getAllLearningOutcomes();
            return res.status(common_1.HttpStatus.OK).json(learningOutcomes);
        });
    }
    getLearningOutcome(res, learningOutcomeID) {
        return __awaiter(this, void 0, void 0, function* () {
            const learningOutcome = yield this.LearningOutcomeService.getLearningOutcome(learningOutcomeID);
            if (!learningOutcome)
                throw new common_1.NotFoundException('LearningOutcome does not exist!');
            return res.status(common_1.HttpStatus.OK).json(learningOutcome);
        });
    }
    addLearningOutcome(res, CreateLearningOutcomeDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const learningOutcome = yield this.LearningOutcomeService.addLearningOutcome(CreateLearningOutcomeDTO);
            return res.status(common_1.HttpStatus.OK).json({
                message: "LearningOutcome has been created successfully",
                learningOutcome
            });
        });
    }
    updateLearningOutcome(res, learningOutcomeID, CreateLearningOutcomeDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const learningOutcome = yield this.LearningOutcomeService.updateLearningOutcome(learningOutcomeID, CreateLearningOutcomeDTO);
            if (!learningOutcome)
                throw new common_1.NotFoundException('LearningOutcome does not exist!');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'LearningOutcome has been successfully updated',
                learningOutcome
            });
        });
    }
    deleteLearningOutcome(res, learningOutcomeID) {
        return __awaiter(this, void 0, void 0, function* () {
            const learningOutcome = yield this.LearningOutcomeService.deleteLearningOutcome(learningOutcomeID);
            if (!learningOutcome)
                throw new common_1.NotFoundException('LearningOutcome does not exist');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'LearningOutcome has been deleted',
                learningOutcome
            });
        });
    }
};
__decorate([
    common_1.Get('learningoutcomes'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LearningOutcomeController.prototype, "getAllLearningOutcomes", null);
__decorate([
    common_1.Get('learningoutcome/:learningOutcomeID'),
    __param(0, common_1.Res()), __param(1, common_1.Param('learningOutcomeID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LearningOutcomeController.prototype, "getLearningOutcome", null);
__decorate([
    common_1.Post('/create'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_learningoutcome_dto_1.CreateLearningOutcomeDTO]),
    __metadata("design:returntype", Promise)
], LearningOutcomeController.prototype, "addLearningOutcome", null);
__decorate([
    common_1.Put('/update'),
    __param(0, common_1.Res()), __param(1, common_1.Query('learningOutcomeID')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_learningoutcome_dto_1.CreateLearningOutcomeDTO]),
    __metadata("design:returntype", Promise)
], LearningOutcomeController.prototype, "updateLearningOutcome", null);
__decorate([
    common_1.Delete('/delete'),
    __param(0, common_1.Res()), __param(1, common_1.Query('learningOutcomeID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LearningOutcomeController.prototype, "deleteLearningOutcome", null);
LearningOutcomeController = __decorate([
    common_1.Controller('learningoutcome'),
    __metadata("design:paramtypes", [learningoutcome_service_1.LearningOutcomeService])
], LearningOutcomeController);
exports.LearningOutcomeController = LearningOutcomeController;
//# sourceMappingURL=learningoutcome.controller.js.map