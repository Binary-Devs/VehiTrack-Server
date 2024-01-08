'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PartyValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    fullName: zod_1.z.string({ required_error: 'Full Name is Required' }),
    mobile: zod_1.z.string({ required_error: 'Mobile is required' }),
    address: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional().default(true),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    fullName: zod_1.z.string().optional(),
    mobile: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
  }),
});
exports.PartyValidation = {
  create,
  update,
};
