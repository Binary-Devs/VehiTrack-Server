"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMessageZodSchema = exports.createMessageZodSchema = void 0;
const zod_1 = require("zod");
exports.createMessageZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        message: zod_1.z.string({
            required_error: 'message is required',
        }),
        senderId: zod_1.z.string({
            required_error: 'senderId is required',
        }),
        receiverId: zod_1.z.string({
            required_error: 'receiverId is required',
        }),
        conversationId: zod_1.z.string({
            required_error: 'conversationId is required',
        }),
    }),
});
exports.updateMessageZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        message: zod_1.z.string().optional(),
        senderId: zod_1.z.string().optional(),
        receiverId: zod_1.z.string().optional(),
        conversationId: zod_1.z.string().optional(),
    }),
});
