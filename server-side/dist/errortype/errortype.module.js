"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const errortype_controller_1 = require("./errortype.controller");
const errortype_service_1 = require("./errortype.service");
const mongoose_1 = require("@nestjs/mongoose");
const errortype_schema_1 = require("./schemas/errortype.schema");
let ErrorTypeModule = class ErrorTypeModule {
};
ErrorTypeModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'ErrorType', schema: errortype_schema_1.ErrorTypeSchema }])
        ],
        controllers: [errortype_controller_1.ErrorTypeController],
        providers: [errortype_service_1.ErrorTypeService]
    })
], ErrorTypeModule);
exports.ErrorTypeModule = ErrorTypeModule;
//# sourceMappingURL=errortype.module.js.map