"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const learningitem_controller_1 = require("./learningitem.controller");
const learningitem_service_1 = require("./learningitem.service");
const mongoose_1 = require("@nestjs/mongoose");
const learningitem_schema_1 = require("./schemas/learningitem.schema");
let LearningItemModule = class LearningItemModule {
};
LearningItemModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'LearningItem', schema: learningitem_schema_1.LearningItemSchema }])
        ],
        controllers: [learningitem_controller_1.LearningItemController],
        providers: [learningitem_service_1.LearningItemService]
    })
], LearningItemModule);
exports.LearningItemModule = LearningItemModule;
//# sourceMappingURL=learningitem.module.js.map