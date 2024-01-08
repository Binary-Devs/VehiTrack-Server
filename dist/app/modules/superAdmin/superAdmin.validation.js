'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SuperAdminValidation = void 0;
const zod_1 = require('zod');
const update = zod_1.z.object({
  body: zod_1.z.object({
    fullName: zod_1.z.string().optional(),
    mobile: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
  }),
});
exports.SuperAdminValidation = {
  update,
};
