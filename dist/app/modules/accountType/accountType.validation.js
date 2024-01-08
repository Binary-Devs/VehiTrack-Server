'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AccountTypeValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    label: zod_1.z.string({ required_error: 'Account Type is Required' }),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    label: zod_1.z.string({ required_error: 'Account Type is Required' }),
  }),
});
exports.AccountTypeValidation = {
  create,
  update,
};
