"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({ required_error: 'Date is Required' }),
        vehicleId: zod_1.z.string().optional(),
        expenseHeadId: zod_1.z.string({ required_error: 'Expense Head is required' }),
        amount: zod_1.z.number({ required_error: 'Amount is Required' }),
        remarks: zod_1.z.string().optional(),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().optional(),
        vehicleId: zod_1.z.string().optional(),
        expenseHeadId: zod_1.z.string().optional(),
        amount: zod_1.z.number().optional(),
        remarks: zod_1.z.string().optional(),
    }),
});
exports.ExpenseValidation = {
    create,
    update,
};
