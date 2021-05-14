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
const contentsection_service_1 = require("./contentsection.service");
const create_contentsection_dto_1 = require("./dto/create-contentsection.dto");
let ContentSectionController = class ContentSectionController {
    constructor(contentSectionService) {
        this.contentSectionService = contentSectionService;
    }
    getAllContentSections(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentSections = yield this.contentSectionService.getAllContentSections();
            return res.status(common_1.HttpStatus.OK).json(contentSections);
        });
    }
    getContentSection(res, contentSectionID) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentSection = yield this.contentSectionService.getContentSection(contentSectionID);
            if (!contentSection)
                throw new common_1.NotFoundException('ContentSection does not exist!');
            return res.status(common_1.HttpStatus.OK).json(contentSection);
        });
    }
    addContentSection(res, createContentSectionDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentSection = yield this.contentSectionService.addContentSection(createContentSectionDTO);
            return res.status(common_1.HttpStatus.OK).json({
                message: "ContentSection has been created successfully",
                contentSection
            });
        });
    }
    updateContentSection(res, contentSectionID, createContentSectionDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentSection = yield this.contentSectionService.updateContentSection(contentSectionID, createContentSectionDTO);
            if (!contentSection)
                throw new common_1.NotFoundException('ContentSection does not exist!');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'ContentSection has been successfully updated',
                contentSection
            });
        });
    }
    deleteContentSection(res, contentSectionID) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentSection = yield this.contentSectionService.deleteContentSection(contentSectionID);
            if (!contentSection)
                throw new common_1.NotFoundException('ContentSection does not exist');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'ContentSection has been deleted',
                contentSection
            });
        });
    }
};
__decorate([
    common_1.Get('contentsections'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentSectionController.prototype, "getAllContentSections", null);
__decorate([
    common_1.Get('contentsection/:contentSectionID'),
    __param(0, common_1.Res()), __param(1, common_1.Param('contentSectionID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContentSectionController.prototype, "getContentSection", null);
__decorate([
    common_1.Post('/create'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_contentsection_dto_1.CreateContentSectionDTO]),
    __metadata("design:returntype", Promise)
], ContentSectionController.prototype, "addContentSection", null);
__decorate([
    common_1.Put('/update'),
    __param(0, common_1.Res()), __param(1, common_1.Query('contentSectionID')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_contentsection_dto_1.CreateContentSectionDTO]),
    __metadata("design:returntype", Promise)
], ContentSectionController.prototype, "updateContentSection", null);
__decorate([
    common_1.Delete('/delete'),
    __param(0, common_1.Res()), __param(1, common_1.Query('contentSectionID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContentSectionController.prototype, "deleteContentSection", null);
ContentSectionController = __decorate([
    common_1.Controller('contentsection'),
    __metadata("design:paramtypes", [contentsection_service_1.ContentSectionService])
], ContentSectionController);
exports.ContentSectionController = ContentSectionController;
//# sourceMappingURL=contentsection.controller.js.map