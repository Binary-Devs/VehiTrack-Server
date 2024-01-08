'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AccountHeadValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    accountTypeId: zod_1.z.string({
      required_error: 'Account Type ID is Required',
    }),
    label: zod_1.z.string({ required_error: 'Account Head is Required' }),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    accountTypeId: zod_1.z.string().optional(),
    label: zod_1.z.string().optional(),
  }),
});
exports.AccountHeadValidation = {
  create,
  update,
};
