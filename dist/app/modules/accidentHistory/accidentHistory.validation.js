'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AccidentHistoryValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    date: zod_1.z.string({ required_error: 'Date is Required' }),
    vehicleId: zod_1.z.string({ required_error: 'Vehicle ID is Required' }),
    driverId: zod_1.z.string({ required_error: 'Driver ID is required' }),
    details: zod_1.z.string({ required_error: 'Accident Details is required' }),
    location: zod_1.z.string({
      required_error: 'Location Details is required',
    }),
    odoMeter: zod_1.z.number().optional(),
    paymentStatus: zod_1.z.enum(['Paid', 'Received', 'Nothing'], {
      required_error: 'Payment Status is Required',
    }),
    amount: zod_1.z.number({ required_error: 'Amount is Required' }),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    date: zod_1.z.string().optional(),
    vehicleId: zod_1.z.string().optional(),
    driverId: zod_1.z.string().optional(),
    details: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    odoMeter: zod_1.z.number().optional(),
    paymentStatus: zod_1.z.enum(['Paid', 'Received', 'Nothing']).optional(),
    amount: zod_1.z.number().optional(),
  }),
});
exports.AccidentHistoryValidation = {
  create,
  update,
};
