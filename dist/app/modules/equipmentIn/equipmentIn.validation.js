'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.EquipmentInValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    date: zod_1.z.string({ required_error: 'Date is Required' }),
    equipmentId: zod_1.z.string({ required_error: 'Equipment ID is Required' }),
    quantity: zod_1.z.number({ required_error: 'Quantity is Required' }),
    unitPrice: zod_1.z.number({ required_error: 'Unit Price is Required' }),
    totalPrice: zod_1.z.number({ required_error: 'Total Price is Required' }),
    remarks: zod_1.z.string().optional(),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    date: zod_1.z.string().optional(),
    equipmentId: zod_1.z.string().optional(),
    quantity: zod_1.z.number().optional(),
    unitPrice: zod_1.z.number().optional(),
    totalPrice: zod_1.z.number().optional(),
    remarks: zod_1.z.string().optional(),
  }),
});
exports.EquipmentInValidation = {
  create,
  update,
};
