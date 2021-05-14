"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const errortype_module_1 = require("./errortype/errortype.module");
const learningoutcome_module_1 = require("./learningoutcome/learningoutcome.module");
const domainconcept_module_1 = require("./domainconcept/domainconcept.module");
const contentsection_module_1 = require("./contentsection/contentsection.module");
const learningitem_module_1 = require("./learningitem/learningitem.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://kuleuvengrader:bloomberg@cluster0-jkave.gcp.mongodb.net/local_library?retryWrites=true&w=majority', { useNewUrlParser: true }),
            errortype_module_1.ErrorTypeModule,
            learningoutcome_module_1.LearningOutcomeModule,
            domainconcept_module_1.DomainConceptModule,
            contentsection_module_1.ContentSectionModule,
            learningitem_module_1.LearningItemModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map