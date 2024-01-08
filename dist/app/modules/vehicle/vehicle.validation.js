'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.VehicleValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    regNo: zod_1.z.string({ required_error: 'Registration No is Required' }),
    brandId: zod_1.z.string({ required_error: 'Brand ID is required' }),
    modelId: zod_1.z.string({ required_error: 'Model ID is required' }),
    vehicleValue: zod_1.z.number({
      required_error: 'Vehicle Value is required',
    }),
    driverId: zod_1.z.string({ required_error: 'Driver ID is required' }),
    helperId: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional().default(true),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    regNo: zod_1.z.string().optional(),
    brandId: zod_1.z.string().optional(),
    modelId: zod_1.z.string().optional(),
    vehicleValue: zod_1.z.number().optional(),
    driverId: zod_1.z.string().optional(),
    helperId: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
  }),
});
exports.VehicleValidation = {
  create,
  update,
};
