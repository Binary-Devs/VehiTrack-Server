'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PaperWorkValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    date: zod_1.z.string({ required_error: 'Date is Required' }),
    vehicleId: zod_1.z.string({ required_error: 'Vehicle ID is Required' }),
    certificateNo: zod_1.z.string({
      required_error: 'Certificate No is Required',
    }),
    effectiveDate: zod_1.z.string({
      required_error: 'Effective Date is Required',
    }),
    expiryDate: zod_1.z.string().optional().nullable(),
    daysToRemind: zod_1.z.number().optional().nullable(),
    odoMeter: zod_1.z.number().optional(),
    paperType: zod_1.z.enum(['Registration', 'Tax', 'Fitness', 'Route'], {
      required_error: 'Document Type is Required',
    }),
    fee: zod_1.z.number({ required_error: 'Fee is required' }),
    otherAmount: zod_1.z.number().optional(),
    totalAmount: zod_1.z.number({ required_error: 'Total Amount is Required' }),
    remarks: zod_1.z.string().optional(),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    date: zod_1.z.string().optional(),
    vehicleId: zod_1.z.string().optional(),
    certificateNo: zod_1.z.string().optional(),
    effectiveDate: zod_1.z.string().optional(),
    expiryDate: zod_1.z.string().optional().nullable(),
    daysToRemind: zod_1.z.number().optional().nullable(),
    odoMeter: zod_1.z.number().optional(),
    paperType: zod_1.z
      .enum(['Registration', 'Tax', 'Fitness', 'Route'])
      .optional(),
    fee: zod_1.z.number().optional(),
    otherAmount: zod_1.z.number().optional(),
    totalAmount: zod_1.z.number().optional(),
    remarks: zod_1.z.string().optional(),
  }),
});
exports.PaperWorkValidation = {
  create,
  update,
};
