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
const learningitem_service_1 = require("./learningitem.service");
const create_learningitem_dto_1 = require("./dto/create-learningitem.dto");
let LearningItemController = class LearningItemController {
    constructor(LearningItemService) {
        this.LearningItemService = LearningItemService;
    }
    getAllLearningItems(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const learningItem = yield this.LearningItemService.getAllLearningItems();
            return res.status(common_1.HttpStatus.OK).json(learningItem);
        });
    }
    getLearningItem(res, learningItemID) {
        return __awaiter(this, void 0, void 0, function* () {
            const learningItem = yield this.LearningItemService.getLearningItem(learningItemID);
            if (!learningItem)
                throw new common_1.NotFoundException('LearningItem does not exist!');
            return res.status(common_1.HttpStatus.OK).json(learningItem);
        });
    }
    addLearningItem(res, CreateLearningItemDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const learningItem = yield this.LearningItemService.addLearningItem(CreateLearningItemDTO);
            return res.status(common_1.HttpStatus.OK).json({
                message: "LearningItem has been created successfully",
                learningItem
            });
        });
    }
    updateLearningItem(res, learningItemID, CreateLearningItemDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const learningItem = yield this.LearningItemService.updateLearningItem(learningItemID, CreateLearningItemDTO);
            if (!learningItem)
                throw new common_1.NotFoundException('LearningItem does not exist!');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'LearningItem has been successfully updated',
                learningItem
            });
        });
    }
    deleteLearningItem(res, learningItemID) {
        return __awaiter(this, void 0, void 0, function* () {
            const learningItem = yield this.LearningItemService.deleteLearningItem(learningItemID);
            if (!learningItem)
                throw new common_1.NotFoundException('LearningItem does not exist');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'LearningItem has been deleted',
                learningItem
            });
        });
    }
};
__decorate([
    common_1.Get('learningitems'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LearningItemController.prototype, "getAllLearningItems", null);
__decorate([
    common_1.Get('learningitem/:learningItemID'),
    __param(0, common_1.Res()), __param(1, common_1.Param('learningItemID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LearningItemController.prototype, "getLearningItem", null);
__decorate([
    common_1.Post('/create'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_learningitem_dto_1.CreateLearningItemDTO]),
    __metadata("design:returntype", Promise)
], LearningItemController.prototype, "addLearningItem", null);
__decorate([
    common_1.Put('/update'),
    __param(0, common_1.Res()), __param(1, common_1.Query('learningItemID')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_learningitem_dto_1.CreateLearningItemDTO]),
    __metadata("design:returntype", Promise)
], LearningItemController.prototype, "updateLearningItem", null);
__decorate([
    common_1.Delete('/delete'),
    __param(0, common_1.Res()), __param(1, common_1.Query('learningItemID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LearningItemController.prototype, "deleteLearningItem", null);
LearningItemController = __decorate([
    common_1.Controller('learningitem'),
    __metadata("design:paramtypes", [learningitem_service_1.LearningItemService])
], LearningItemController);
exports.LearningItemController = LearningItemController;
//# sourceMappingURL=learningitem.controller.js.map