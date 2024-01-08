'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateConversationZodSchema = exports.createConversationZodSchema =
  void 0;
const zod_1 = require('zod');
exports.createConversationZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    participants: zod_1.z.string({
      required_error: 'participants is required',
    }),
    message: zod_1.z.string({
      required_error: 'message is required',
    }),
    senderId: zod_1.z.string({
      required_error: 'senderId is required',
    }),
    receiverId: zod_1.z.string({
      required_error: 'receiverId is required',
    }),
  }),
});
exports.updateConversationZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    participants: zod_1.z.string().optional(),
    message: zod_1.z.string().optional(),
    senderId: zod_1.z.string().optional(),
    receiverId: zod_1.z.string().optional(),
  }),
});
