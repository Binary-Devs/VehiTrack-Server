"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        brandId: zod_1.z.string({ required_error: 'Brand ID is Required' }),
        label: zod_1.z.string({ required_error: 'Model is Required' }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        brandId: zod_1.z.string().optional(),
        label: zod_1.z.string().optional(),
    }),
});
exports.ModelValidation = {
    create,
    update,
};
