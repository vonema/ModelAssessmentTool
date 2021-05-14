"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.DomainConceptSchema = new mongoose.Schema({
    name: String,
    created_at: { type: Date, default: Date.now }
});
//# sourceMappingURL=domainconcept.schema.js.map