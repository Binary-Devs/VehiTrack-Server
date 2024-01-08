"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        uomId: zod_1.z.string({ required_error: 'UOM ID is Required' }),
        label: zod_1.z.string({ required_error: 'Equipment is Required' }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        uomId: zod_1.z.string().optional(),
        label: zod_1.z.string().optional(),
    }),
});
exports.EquipmentValidation = {
    create,
    update,
};
