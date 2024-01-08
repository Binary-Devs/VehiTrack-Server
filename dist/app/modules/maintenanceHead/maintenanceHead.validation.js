"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceHeadValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        label: zod_1.z.string({ required_error: 'Maintenance Head is Required' }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        label: zod_1.z.string().optional(),
    }),
});
exports.MaintenanceHeadValidation = {
    create,
    update,
};
