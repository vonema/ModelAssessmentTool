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
const domainconcept_service_1 = require("./domainconcept.service");
const create_domainconcept_dto_1 = require("./dto/create-domainconcept.dto");
let DomainConceptController = class DomainConceptController {
    constructor(DomainConceptService) {
        this.DomainConceptService = DomainConceptService;
    }
    getAllDomainConcepts(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const domainConcept = yield this.DomainConceptService.getAllDomainConcepts();
            return res.status(common_1.HttpStatus.OK).json(domainConcept);
        });
    }
    getDomainConcept(res, domainConceptID) {
        return __awaiter(this, void 0, void 0, function* () {
            const domainConcept = yield this.DomainConceptService.getDomainConcept(domainConceptID);
            if (!domainConcept)
                throw new common_1.NotFoundException('DomainConcept does not exist!');
            return res.status(common_1.HttpStatus.OK).json(domainConcept);
        });
    }
    addDomainConcept(res, CreateDomainConceptDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const domainConcept = yield this.DomainConceptService.addDomainConcept(CreateDomainConceptDTO);
            return res.status(common_1.HttpStatus.OK).json({
                message: "DomainConcept has been created successfully",
                domainConcept
            });
        });
    }
    updateDomainConcept(res, domainConceptID, CreateDomainConceptDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const domainConcept = yield this.DomainConceptService.updateDomainConcept(domainConceptID, CreateDomainConceptDTO);
            if (!domainConcept)
                throw new common_1.NotFoundException('DomainConcept does not exist!');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'DomainConcept has been successfully updated',
                domainConcept
            });
        });
    }
    deleteDomainConcept(res, domainConceptID) {
        return __awaiter(this, void 0, void 0, function* () {
            const domainConcept = yield this.DomainConceptService.deleteDomainConcept(domainConceptID);
            if (!domainConcept)
                throw new common_1.NotFoundException('DomainConcept does not exist');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'DomainConcept has been deleted',
                domainConcept
            });
        });
    }
};
__decorate([
    common_1.Get('domainconcepts'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DomainConceptController.prototype, "getAllDomainConcepts", null);
__decorate([
    common_1.Get('domainconcept/:domainConceptID'),
    __param(0, common_1.Res()), __param(1, common_1.Param('domainConceptID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DomainConceptController.prototype, "getDomainConcept", null);
__decorate([
    common_1.Post('/create'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_domainconcept_dto_1.CreateDomainConceptDTO]),
    __metadata("design:returntype", Promise)
], DomainConceptController.prototype, "addDomainConcept", null);
__decorate([
    common_1.Put('/update'),
    __param(0, common_1.Res()), __param(1, common_1.Query('domainConceptID')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_domainconcept_dto_1.CreateDomainConceptDTO]),
    __metadata("design:returntype", Promise)
], DomainConceptController.prototype, "updateDomainConcept", null);
__decorate([
    common_1.Delete('/delete'),
    __param(0, common_1.Res()), __param(1, common_1.Query('domainConceptID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DomainConceptController.prototype, "deleteDomainConcept", null);
DomainConceptController = __decorate([
    common_1.Controller('domainconcept'),
    __metadata("design:paramtypes", [domainconcept_service_1.DomainConceptService])
], DomainConceptController);
exports.DomainConceptController = DomainConceptController;
//# sourceMappingURL=domainconcept.controller.js.map