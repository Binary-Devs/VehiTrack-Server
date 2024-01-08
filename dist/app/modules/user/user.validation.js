'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
const zod_1 = require('zod');
const bloodGroup_1 = require('../../../constants/bloodGroup');
const createSuperAdmin = zod_1.z.object({
  body: zod_1.z.object({
    userName: zod_1.z.string({ required_error: 'User Name is Required' }),
    password: zod_1.z.string({ required_error: 'Password is Required' }),
    superAdmin: zod_1.z.object({
      fullName: zod_1.z.string({ required_error: 'Full Name is Required' }),
      mobile: zod_1.z.string({ required_error: 'Mobile No is Required' }),
      address: zod_1.z.string().optional(),
      profileImg: zod_1.z.string().optional(),
    }),
  }),
});
const createAdmin = zod_1.z.object({
  body: zod_1.z.object({
    userName: zod_1.z.string({ required_error: 'User Name is Required' }),
    password: zod_1.z.string({ required_error: 'Password is Required' }),
    admin: zod_1.z.object({
      fullName: zod_1.z.string({ required_error: 'Full Name is Required' }),
      mobile: zod_1.z.string({ required_error: 'Mobile No is Required' }),
      address: zod_1.z.string().optional(),
      profileImg: zod_1.z.string().optional(),
    }),
  }),
});
const createDriver = zod_1.z.object({
  body: zod_1.z.object({
    userName: zod_1.z.string({ required_error: 'User Name is Required' }),
    password: zod_1.z.string({ required_error: 'Password is Required' }),
    driver: zod_1.z.object({
      fullName: zod_1.z.string({ required_error: 'Full Name is Required' }),
      mobile: zod_1.z.string({ required_error: 'Mobile No is Required' }),
      address: zod_1.z.string().optional(),
      licenseNo: zod_1.z.string().optional(),
      bloodGroup: zod_1.z.enum(bloodGroup_1.bloodGroup).optional(),
      profileImg: zod_1.z.string().optional(),
    }),
  }),
});
const createHelper = zod_1.z.object({
  body: zod_1.z.object({
    userName: zod_1.z.string({ required_error: 'User Name is Required' }),
    password: zod_1.z.string({ required_error: 'Password is Required' }),
    helper: zod_1.z.object({
      fullName: zod_1.z.string({ required_error: 'Full Name is Required' }),
      mobile: zod_1.z.string({ required_error: 'Mobile No is Required' }),
      address: zod_1.z.string().optional(),
      bloodGroup: zod_1.z.enum(bloodGroup_1.bloodGroup).optional(),
      profileImg: zod_1.z.string().optional(),
    }),
  }),
});
exports.UserValidation = {
  createSuperAdmin,
  createAdmin,
  createDriver,
  createHelper,
};
