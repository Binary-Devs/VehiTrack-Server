'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UomValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    label: zod_1.z.string({ required_error: 'Uom is Required' }),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    label: zod_1.z.string({ required_error: 'Uom is Required' }),
  }),
});
exports.UomValidation = {
  create,
  update,
};
