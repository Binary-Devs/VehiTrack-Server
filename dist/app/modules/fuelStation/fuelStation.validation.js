'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FuelStationValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    label: zod_1.z.string({ required_error: 'Fuel Station is Required' }),
    address: zod_1.z.string().optional(),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    label: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
  }),
});
exports.FuelStationValidation = {
  create,
  update,
};
