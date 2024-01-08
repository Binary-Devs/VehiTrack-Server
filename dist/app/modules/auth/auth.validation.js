'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthValidation = void 0;
const zod_1 = require('zod');
const login = zod_1.z.object({
  body: zod_1.z.object({
    userName: zod_1.z.string({ required_error: 'User Name is Required' }),
    password: zod_1.z.string({ required_error: 'Password is Required' }),
  }),
});
const refreshTokenZodSchema = zod_1.z.object({
  cookies: zod_1.z.object({
    refreshToken: zod_1.z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});
exports.AuthValidation = {
  login,
  refreshTokenZodSchema,
};
