"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperValidation = void 0;
const zod_1 = require("zod");
const bloodGroup_1 = require("../../../constants/bloodGroup");
const update = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().optional(),
        mobile: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.enum(bloodGroup_1.bloodGroup).optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
exports.HelperValidation = {
    update,
};
