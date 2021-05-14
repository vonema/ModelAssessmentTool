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
var _a;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let ContentSectionService = class ContentSectionService {
    constructor(contentSectionModel) {
        this.contentSectionModel = contentSectionModel;
    }
    getAllContentSections() {
        return __awaiter(this, void 0, void 0, function* () {
            const contentsections = yield this.contentSectionModel.find().exec();
            return contentsections;
        });
    }
    getContentSection(contentSectionID) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentsection = yield this.contentSectionModel.findById(contentSectionID).exec();
            return contentsection;
        });
    }
    addContentSection(createContentSectionDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newContentSection = yield this.contentSectionModel(createContentSectionDTO);
            return newContentSection.save();
        });
    }
    updateContentSection(contentSectionID, createContentSectionDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedContentSection = yield this.contentSectionModel
                .findByIdAndUpdate(contentSectionID, createContentSectionDTO, { new: true });
            return updatedContentSection;
        });
    }
    deleteContentSection(contentSectionID) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedContentSection = yield this.contentSectionModel.findByIdAndRemove(contentSectionID);
            return deletedContentSection;
        });
    }
};
ContentSectionService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('ContentSection')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], ContentSectionService);
exports.ContentSectionService = ContentSectionService;
//# sourceMappingURL=contentsection.service.js.map