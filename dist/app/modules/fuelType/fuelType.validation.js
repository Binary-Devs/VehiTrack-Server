'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FuelTypeValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    label: zod_1.z.string({ required_error: 'Fuel Type is Required' }),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    label: zod_1.z.string({ required_error: 'Fuel Type is Required' }),
  }),
});
exports.FuelTypeValidation = {
  create,
  update,
};
