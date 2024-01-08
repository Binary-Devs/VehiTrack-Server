'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ExpenseHeadValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    label: zod_1.z.string({ required_error: 'Expense Head is Required' }),
    isTripExpense: zod_1.z.boolean().optional(),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    label: zod_1.z.string().optional(),
    isTripExpense: zod_1.z.boolean().optional(),
  }),
});
exports.ExpenseHeadValidation = {
  create,
  update,
};
